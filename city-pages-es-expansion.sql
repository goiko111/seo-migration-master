-- =============================================================
-- City Pages España - Expansión masiva
-- Total: 20 nuevas ciudades
-- Existentes: Madrid, Barcelona, Valencia (no incluidas)
-- Fecha: 2026-04-19
-- INSTRUCCIONES: Pegar en Supabase SQL Editor y ejecutar
-- =============================================================

BEGIN;

-- Sevilla
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-sevilla',
  'city',
  'es',
  'Software de Carta de Vinos en Sevilla | Winerim',
  'Digitaliza la carta de vinos de tu restaurante en Sevilla. Gestión inteligente de referencias, maridajes con cocina andaluza y analítica de ventas en tiempo real.',
  'Sevilla, España',
  'Software de carta de vinos para restaurantes en Sevilla',
  'Optimiza la carta de vinos de tu restaurante sevillano con tecnología que entiende la riqueza de la gastronomía andaluza y el enoturismo del Marco de Jerez.',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Sevilla es el corazón gastronómico de Andalucía, con una escena de tapas de fama mundial y una creciente cultura del vino que va más allá del fino y la manzanilla. Los restaurantes sevillanos están modernizando sus cartas para reflejar la explosión de calidad de los vinos del sur: Jerez, Montilla-Moriles, Condado de Huelva y una nueva generación de tintos del Aljarafe. Con un turismo internacional masivo y una clientela local exigente, la gestión profesional de la carta de vinos marca la diferencia entre un negocio rentable y uno que deja dinero sobre la mesa.", "stats": [{"label": "Incremento en ventas de vino", "value": "+20%"}, {"label": "Mejora del ticket medio", "value": "+18%"}, {"label": "Reducción de stock muerto", "value": "-35%"}], "country": "España", "features": [{"title": "Integración con vinos del Marco de Jerez", "desc": "Base de datos especializada con finos, manzanillas, amontillados, olorosos y palos cortados. Sugerencias de maridaje con la gastronomía sevillana."}, {"title": "Carta multilingüe para turismo", "desc": "Traducciones automáticas en inglés, francés, alemán y japonés para la masiva afluencia turística de Sevilla."}, {"title": "Analítica de temporada", "desc": "Datos de consumo segmentados por Feria, Semana Santa, verano y temporada baja. Optimiza tu inventario según la estacionalidad sevillana."}, {"title": "Gestión de vinos por copa", "desc": "Maximiza la rotación de vinos al corte con alertas de caducidad y sugerencias de precio óptimo por copa."}], "problems": ["Cartas de vinos centradas solo en Riojas y Riberas, sin explotar el potencial de los vinos andaluces locales", "Personal de sala sin formación en el complejo sistema de clasificación de Jerez", "Turistas internacionales que no entienden la carta y optan por cerveza o sangría", "Stock de vinos generosos que se oxida por mala rotación", "Dificultad para actualizar precios en temporada alta (Feria, Semana Santa)"], "city_name": "Sevilla", "ticket_medio": "35-55€"}'::jsonb,
  '[{"q": "¿Funciona Winerim con vinos de Jerez y generosos?", "a": "Sí. Winerim tiene una base de datos especializada que incluye todas las categorías del Marco de Jerez (fino, manzanilla, amontillado, oloroso, palo cortado, cream) con notas de cata y maridajes específicos para la cocina sevillana."}, {"q": "¿Puedo gestionar la carta de vinos durante la Feria de Abril?", "a": "Por supuesto. Winerim permite crear cartas estacionales, ajustar precios por temporada y gestionar el inventario de alto volumen típico de eventos como la Feria o Semana Santa."}, {"q": "¿Es útil para tabernas y bares de tapas?", "a": "Absolutamente. Winerim se adapta tanto a restaurantes gastronómicos como a tabernas con carta reducida, optimizando la selección de vinos por copa y mejorando la recomendación al cliente."}]'::jsonb,
  '["software-carta-de-vinos-madrid", "software-carta-de-vinos-malaga", "software-carta-de-vinos-cadiz", "software-vino-restaurante-italiano"]'::jsonb,
  'Article',
  true
);

-- Málaga
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-malaga',
  'city',
  'es',
  'Software de Carta de Vinos en Málaga | Winerim',
  'Gestión inteligente de cartas de vinos para restaurantes en Málaga. Optimiza referencias, maridajes con cocina mediterránea y analítica de ventas.',
  'Málaga, España',
  'Software de carta de vinos para restaurantes en Málaga',
  'Lleva la carta de vinos de tu restaurante malagueño al siguiente nivel con herramientas pensadas para la Costa del Sol y su turismo gastronómico.',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Málaga ha pasado de ser un destino de sol y playa a convertirse en una de las capitales gastronómicas del Mediterráneo. La revolución vinícola de la provincia — con DOs como Sierras de Málaga y la recuperación de vinos dulces históricos — coincide con una explosión de restaurantes de autor y chiringuitos premium. El turismo internacional de alto nivel (cruceros, residentes europeos, nómadas digitales) demanda cartas de vinos profesionales y multilingües. Los restauradores malagueños que digitalizan su gestión de vinos capturan un mercado que crece cada temporada.", "stats": [{"label": "Incremento en ventas de vino", "value": "+22%"}, {"label": "Mejora del ticket medio", "value": "+19%"}, {"label": "Clientes que repiten vino", "value": "+40%"}], "country": "España", "features": [{"title": "Vinos de Málaga y Sierras de Málaga", "desc": "Base de datos actualizada con moscateles, PX, tintos de Ronda y blancos de la Axarquía. Información de bodegas locales integrada."}, {"title": "Carta adaptada a chiringuitos y terrazas", "desc": "Formato visual optimizado para lectura en exterior, con QR y acceso móvil pensado para el entorno de playa y terraza."}, {"title": "Multilingüe para la Costa del Sol", "desc": "Inglés, alemán, francés, sueco y holandés. Pensado para la diversidad de visitantes internacionales de Málaga."}, {"title": "Precios dinámicos por temporada", "desc": "Ajusta automáticamente los márgenes entre temporada alta (junio-septiembre) y baja, maximizando la rentabilidad todo el año."}], "problems": ["Cartas de vino genéricas que no aprovechan el tirón de los vinos locales de Málaga y Ronda", "Turistas de crucero con poco tiempo que necesitan recomendaciones rápidas y claras", "Chiringuitos y terrazas sin carta de vinos digital adaptada al móvil", "Falta de datos sobre qué vinos funcionan mejor en cada época del año", "Personal de temporada sin conocimiento de vinos que cambia cada verano"], "city_name": "Málaga", "ticket_medio": "35-60€"}'::jsonb,
  '[{"q": "¿Incluye vinos de la DO Sierras de Málaga?", "a": "Sí. Nuestra base de datos cubre todas las bodegas y referencias de Sierras de Málaga, incluyendo los tintos de Ronda y los blancos de la Axarquía, con fichas de cata y maridajes."}, {"q": "¿Funciona bien en chiringuitos con lectura al sol?", "a": "La carta digital de Winerim está diseñada con alto contraste y modo claro optimizado para lectura en exteriores, ideal para chiringuitos y terrazas de la Costa del Sol."}, {"q": "¿Puedo formar al personal de temporada con Winerim?", "a": "Sí. Winerim incluye fichas de producto con notas de cata y sugerencias de maridaje que el personal puede consultar desde cualquier dispositivo, reduciendo el tiempo de formación."}]'::jsonb,
  '["software-carta-de-vinos-sevilla", "software-carta-de-vinos-marbella", "software-carta-de-vinos-granada", "software-vino-restaurante-italiano"]'::jsonb,
  'Article',
  true
);

-- Bilbao
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-bilbao',
  'city',
  'es',
  'Software de Carta de Vinos en Bilbao | Winerim',
  'Software de gestión de cartas de vinos para restaurantes en Bilbao. Txakolí, Rioja Alavesa y cocina vasca: optimiza tu carta con tecnología.',
  'Bilbao, España',
  'Software de carta de vinos para restaurantes en Bilbao',
  'Gestiona la carta de vinos de tu restaurante bilbaíno con tecnología diseñada para la exigencia de la gastronomía vasca.',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Bilbao es una ciudad donde comer y beber bien no es un lujo, sino una forma de vida. La cultura gastronómica vasca — con sus sociedades gastronómicas, pintxos de autor y restaurantes con estrella Michelin — exige un nivel de conocimiento vinícola que pocos mercados igualan. Entre el txakolí de Bizkaia, los tintos de Rioja Alavesa a apenas 100 km y una clientela que distingue entre añadas, los restauradores bilbaínos necesitan herramientas que estén a la altura de su cocina. El Guggenheim transformó Bilbao en destino turístico internacional, y la carta de vinos es la primera impresión para ese visitante exigente.", "stats": [{"label": "Incremento en ventas de vino", "value": "+17%"}, {"label": "Mejora del ticket medio", "value": "+25%"}, {"label": "Rotación de referencias", "value": "x2.3"}], "country": "España", "features": [{"title": "Txakolí y Rioja Alavesa integrados", "desc": "Base de datos con cobertura exhaustiva de txakolís (Bizkaia, Getaria, Álava) y bodegas de Rioja Alavesa, con fichas técnicas y maridajes para pintxos y cocina vasca."}, {"title": "Gestión de bodega profunda", "desc": "Control de añadas, lotes y evolución de precios. Ideal para restaurantes con bodega extensa y rotación cuidada."}, {"title": "Recomendador para menús degustación", "desc": "Sugerencias de maridaje paso a paso para menús degustación, el formato estrella de la alta cocina bilbaína."}, {"title": "Analítica por proveedor", "desc": "Datos de rendimiento por bodega y distribuidor, optimizando las compras y negociaciones con proveedores locales."}], "problems": ["Bodegas extensas con cientos de referencias difíciles de mantener actualizadas en carta", "Clientes con alto conocimiento enológico que detectan errores en la carta al instante", "Pintxo-bars que quieren ofrecer vinos de calidad pero no tienen sommelier", "Competencia feroz entre restaurantes por ofrecer la mejor experiencia vinícola", "Distribuidores que cambian precios y disponibilidad frecuentemente"], "city_name": "Bilbao", "ticket_medio": "50-80€"}'::jsonb,
  '[{"q": "¿Winerim cubre txakolís y vinos del País Vasco?", "a": "Sí. Nuestra base de datos incluye txakolís de las tres DOs (Bizkaia, Getaria y Álava), así como toda la Rioja Alavesa y bodegas de Navarra cercanas, con fichas técnicas completas."}, {"q": "¿Sirve para pintxo-bars sin sommelier?", "a": "Perfectamente. Winerim actúa como un sommelier digital: el personal puede consultar fichas de cata, maridajes y recomendaciones desde el móvil, ofreciendo un servicio profesional sin necesidad de un sommelier en plantilla."}, {"q": "¿Puedo gestionar añadas y evolución de precios?", "a": "Sí. Winerim permite registrar diferentes añadas del mismo vino, seguir la evolución de precios de compra y venta, y gestionar el stock por lote y añada."}]'::jsonb,
  '["software-carta-de-vinos-san-sebastian", "software-carta-de-vinos-pamplona", "software-carta-de-vinos-santander", "software-vino-restaurante-italiano"]'::jsonb,
  'Article',
  true
);

-- San Sebastián
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-san-sebastian',
  'city',
  'es',
  'Software de Carta de Vinos en San Sebastián | Winerim',
  'Software de carta de vinos para la capital gastronómica del mundo. Optimiza tu carta en Donostia con herramientas para alta cocina y pintxos.',
  'San Sebastián, España',
  'Software de carta de vinos para restaurantes en San Sebastián',
  'Herramientas a la altura de la capital gastronómica mundial. Gestiona tu carta de vinos en Donostia con la precisión que tu cocina merece.',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "San Sebastián ostenta la mayor concentración de estrellas Michelin por metro cuadrado del mundo. La Parte Vieja, con sus pintxos de autor, y restaurantes como Arzak, Mugaritz o Akelarre han convertido a Donostia en peregrinación obligatoria para gourmets internacionales. En este contexto de excelencia extrema, la carta de vinos no puede ser un afterthought. Los restauradores donostiarras necesitan gestionar bodegas complejas, ofrecer maridajes impecables y atender a una clientela que viaja expresamente para vivir experiencias gastronómicas completas. Un software de carta de vinos profesional es tan esencial como un buen horno.", "stats": [{"label": "Incremento en ventas de vino", "value": "+15%"}, {"label": "Mejora del ticket medio", "value": "+28%"}, {"label": "Satisfacción del cliente", "value": "9.4/10"}], "country": "España", "features": [{"title": "Maridajes para menús degustación", "desc": "Motor de recomendación que sugiere progresiones de vinos para menús de 8-15 pases, el formato estrella de la alta cocina donostiarra."}, {"title": "Gestión de bodega premium", "desc": "Control de añadas, temperatura de servicio, decantación y ventana de consumo óptimo para referencias de alta gama."}, {"title": "Carta digital elegante", "desc": "Diseño minimalista acorde con la estética de la alta gastronomía vasca. Presentación que eleva la experiencia del comensal."}, {"title": "Multilingüe gastronómico", "desc": "Traducciones cuidadas en inglés, francés, japonés y mandarín — los idiomas del turismo gastronómico que visita Donostia."}], "problems": ["Bodegas con 500+ referencias que requieren actualización constante de precios y disponibilidad", "Menús degustación largos que necesitan maridajes perfectos paso a paso", "Clientela internacional sofisticada que espera una carta de vinos impecable", "Competencia brutal entre restaurantes estrella por la mejor experiencia vinícola", "Sumilleres experimentados que necesitan herramientas que no les frenen, sino que les potencien"], "city_name": "San Sebastián", "ticket_medio": "55-95€"}'::jsonb,
  '[{"q": "¿Winerim puede gestionar bodegas de más de 500 referencias?", "a": "Sin problema. Winerim está diseñado para gestionar bodegas extensas con filtros avanzados, búsqueda por cualquier criterio y gestión de añadas, ideal para restaurantes gastronómicos de San Sebastián."}, {"q": "¿Funciona para pintxo-bars de la Parte Vieja?", "a": "Sí. Winerim se adapta a cualquier formato, desde el bar de pintxos con 15 referencias hasta el tres estrellas con 800. Las funciones de vino por copa y recomendación rápida son perfectas para pintxo-bars."}, {"q": "¿Integra vinos del País Vasco y Navarra?", "a": "Nuestra base de datos incluye txakolís, Rioja Alavesa, Navarra y todas las regiones cercanas, además de cobertura internacional completa para bodegas de todo el mundo."}]'::jsonb,
  '["software-carta-de-vinos-bilbao", "software-carta-de-vinos-pamplona", "software-carta-de-vinos-madrid", "software-vino-restaurante-italiano"]'::jsonb,
  'Article',
  true
);

-- Zaragoza
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-zaragoza',
  'city',
  'es',
  'Software de Carta de Vinos en Zaragoza | Winerim',
  'Digitaliza la carta de vinos de tu restaurante en Zaragoza. Gestión de vinos del Somontano, Campo de Borja, Cariñena y más con Winerim.',
  'Zaragoza, España',
  'Software de carta de vinos para restaurantes en Zaragoza',
  'Gestiona la carta de vinos de tu restaurante zaragozano con tecnología que aprovecha la riqueza vinícola de Aragón.',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Zaragoza es la capital de un territorio vinícola excepcional: Somontano, Campo de Borja, Cariñena y Calatayud producen vinos que compiten con los mejores de España a precios competitivos. La escena gastronómica zaragozana — desde los clásicos del Tubo hasta los restaurantes de nueva cocina aragonesa — está en plena efervescencia. Con una posición estratégica entre Madrid, Barcelona y el País Vasco, Zaragoza atrae turismo de negocios y gastronómico que espera cartas de vinos a la altura. Los restauradores que apuestan por la profesionalización de su oferta vinícola tienen una ventaja competitiva clara en un mercado con mucho recorrido.", "stats": [{"label": "Incremento en ventas de vino", "value": "+21%"}, {"label": "Mejora del ticket medio", "value": "+16%"}, {"label": "Reducción de mermas", "value": "-30%"}], "country": "España", "features": [{"title": "DOs aragonesas integradas", "desc": "Somontano, Campo de Borja, Cariñena y Calatayud con fichas de bodegas locales, variedades autóctonas (Garnacha, Moristel) y maridajes con cocina aragonesa."}, {"title": "Carta optimizada para El Tubo", "desc": "Formato ágil y visual perfecto para la zona de tapas más famosa de Zaragoza. QR, vinos por copa y rotación rápida."}, {"title": "Control de costes por referencia", "desc": "Analítica de margen por botella y por copa, esencial para restaurantes con precios competitivos como los de Zaragoza."}, {"title": "Sugerencias de maridaje aragonés", "desc": "Recomendaciones de vino basadas en platos típicos: ternasco, migas, bacalao ajoarriero, borrajas con almejas."}], "problems": ["Vinos aragoneses de gran calidad-precio que no se aprovechan en carta por falta de información", "Competencia de precios agresiva que requiere optimizar márgenes al máximo", "Zona de El Tubo con alta rotación de clientes que necesita servicio de vino rápido y eficiente", "Falta de formación del personal en variedades autóctonas aragonesas", "Cartas estáticas que no reflejan la estacionalidad de la oferta de bodegas locales"], "city_name": "Zaragoza", "ticket_medio": "35-55€"}'::jsonb,
  '[{"q": "¿Incluye bodegas del Somontano y Campo de Borja?", "a": "Sí. Winerim cubre todas las DOs aragonesas con fichas detalladas de bodegas, añadas y variedades autóctonas como la Garnacha de altura, Moristel y Parraleta."}, {"q": "¿Es rentable para restaurantes con ticket medio moderado?", "a": "Especialmente. Winerim ayuda a optimizar márgenes y a subir el ticket medio sugiriendo vinos que el cliente no habría descubierto solo, algo clave en mercados con precios competitivos como Zaragoza."}, {"q": "¿Funciona para los bares de tapas de El Tubo?", "a": "Perfectamente. El modo de carta rápida y las funciones de vino por copa están diseñados para entornos de alta rotación como las tascas del Tubo."}]'::jsonb,
  '["software-carta-de-vinos-madrid", "software-carta-de-vinos-barcelona", "software-carta-de-vinos-pamplona", "software-vino-restaurante-italiano"]'::jsonb,
  'Article',
  true
);

-- Palma de Mallorca
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-palma-de-mallorca',
  'city',
  'es',
  'Software de Carta de Vinos en Palma de Mallorca | Winerim',
  'Software de carta de vinos para restaurantes en Palma de Mallorca. Gestiona vinos de Binissalem, Pla i Llevant y tu bodega turística con Winerim.',
  'Palma de Mallorca, España',
  'Software de carta de vinos para restaurantes en Palma de Mallorca',
  'Gestiona la carta de vinos de tu restaurante mallorquín con tecnología pensada para el turismo premium y los vinos de la isla.',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Palma de Mallorca combina una escena gastronómica sofisticada con un turismo internacional de alto poder adquisitivo. Los vinos mallorquines — Binissalem y Pla i Llevant a la cabeza — viven un momento de reconocimiento internacional, con variedades autóctonas como Manto Negro, Callet y Prensal Blanc que intrigan a los visitantes. Los restaurantes de Palma y alrededores atienden a británicos, alemanes, escandinavos y un creciente segmento de lujo que busca experiencias gastronómicas auténticas. Una carta de vinos que combine oferta local con referencias internacionales, presentada en varios idiomas, es hoy una necesidad operativa, no un capricho.", "stats": [{"label": "Incremento en ventas de vino", "value": "+24%"}, {"label": "Mejora del ticket medio", "value": "+21%"}, {"label": "Vinos locales vendidos", "value": "+55%"}], "country": "España", "features": [{"title": "Vinos de Mallorca destacados", "desc": "Binissalem, Pla i Llevant y Vi de la Terra con fichas de variedades autóctonas (Manto Negro, Callet, Prensal). Storytelling integrado para turistas curiosos."}, {"title": "Multilingüe para turismo premium", "desc": "Alemán, inglés, francés, sueco y holandés. Adaptado al perfil turístico de Mallorca con traducciones cuidadas."}, {"title": "Carta con storytelling local", "desc": "Descripciones que cuentan la historia de cada vino y su bodega, una herramienta de venta potentísima para visitantes que buscan autenticidad."}, {"title": "Gestión de terraza y beach club", "desc": "Formato móvil optimizado para entornos de exterior, con carta simplificada para beach clubs y terrazas frente al mar."}], "problems": ["Turistas que desconocen los vinos mallorquines y eligen solo marcas conocidas de Rioja o Ribera", "Restaurantes de hotel que necesitan cartas en 4-5 idiomas actualizadas constantemente", "Estacionalidad extrema: alta temporada con personal temporal sin formación vinícola", "Vinos locales de pequeñas bodegas con disponibilidad limitada y precios cambiantes", "Beach clubs y chiringuitos que subestiman el potencial de una buena carta de vinos"], "city_name": "Palma de Mallorca", "ticket_medio": "45-75€"}'::jsonb,
  '[{"q": "¿Winerim incluye vinos de Binissalem y Pla i Llevant?", "a": "Sí. Nuestra base de datos cubre las DOs mallorquinas y los Vi de la Terra de la isla, con fichas de variedades autóctonas y descripciones pensadas para explicar estos vinos a turistas internacionales."}, {"q": "¿Funciona para restaurantes de hotel con mucho turismo?", "a": "Es ideal. Winerim ofrece cartas multilingües, formación rápida para personal de temporada y analítica de ventas por nacionalidad de cliente, perfecto para el entorno hotelero de Mallorca."}, {"q": "¿Puedo gestionar la carta de un beach club?", "a": "Por supuesto. El formato mobile-first de Winerim es perfecto para beach clubs, con carta visual, vinos por copa y acceso por QR sin necesidad de carta física."}]'::jsonb,
  '["software-carta-de-vinos-ibiza", "software-carta-de-vinos-barcelona", "software-carta-de-vinos-malaga", "software-vino-restaurante-italiano"]'::jsonb,
  'Article',
  true
);

-- Alicante
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-alicante',
  'city',
  'es',
  'Software de Carta de Vinos en Alicante | Winerim',
  'Software de carta de vinos para restaurantes en Alicante. Gestiona tu carta con vinos de la DO Alicante, Monastrell y cocina mediterránea.',
  'Alicante, España',
  'Software de carta de vinos para restaurantes en Alicante',
  'Digitaliza la carta de vinos de tu restaurante alicantino con herramientas que potencian la Monastrell y la cocina mediterránea.',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Alicante es mucho más que turismo de playa. La provincia alberga la DO Alicante con su emblemática Monastrell, el fondillón (uno de los grandes vinos históricos de Europa) y una escena gastronómica que fusiona arroces, pescados y cocina de interior. La Costa Blanca atrae millones de turistas europeos, y los restauradores alicantinos que profesionalizan su carta de vinos descubren un filón: el visitante que disfruta de un buen arroz con un Monastrell local gasta más y vuelve. La digitalización de la carta es el primer paso para convertir el vino en un centro de beneficio real.", "stats": [{"label": "Incremento en ventas de vino", "value": "+19%"}, {"label": "Mejora del ticket medio", "value": "+15%"}, {"label": "Clientes que piden vino local", "value": "+45%"}], "country": "España", "features": [{"title": "DO Alicante y Monastrell", "desc": "Cobertura completa de la DO Alicante con énfasis en Monastrell, Fondillón y Moscatel, con maridajes para arroces y cocina mediterránea."}, {"title": "Carta para arrocerías", "desc": "Sugerencias de vino específicas para cada tipo de arroz (seco, meloso, caldoso, a banda), el plato estrella de la gastronomía alicantina."}, {"title": "QR multilingüe para terrazas", "desc": "Acceso instantáneo a la carta desde el móvil en inglés, alemán, francés y holandés, perfecto para las terrazas de la Costa Blanca."}, {"title": "Gestión de vinos por copa en temporada", "desc": "Rotación optimizada de vinos al corte con alertas de consumo y sugerencias de precio adaptadas al volumen de temporada alta."}], "problems": ["Arrocerías que ofrecen solo cerveza o vino de la casa, perdiendo margen en vinos de calidad", "Turistas internacionales que no conocen los vinos de Alicante y optan por lo seguro", "Personal de temporada sin conocimiento de variedades locales como Monastrell o Fondillón", "Cartas de vinos estáticas que no se adaptan a la enorme estacionalidad de la Costa Blanca", "Competencia de precio con restaurantes de menú del día que no valoran el vino"], "city_name": "Alicante", "ticket_medio": "30-50€"}'::jsonb,
  '[{"q": "¿Winerim incluye maridajes para arroces?", "a": "Sí. Nuestro motor de maridaje tiene sugerencias específicas para arroces secos, melosos, caldosos, a banda y fideuás, con vinos que van desde blancos frescos hasta tintos ligeros de Monastrell."}, {"q": "¿Funciona para chiringuitos de playa?", "a": "Perfectamente. El formato QR y la carta mobile-first son ideales para chiringuitos donde no hay espacio para cartas físicas y el cliente quiere elegir rápido desde su móvil."}, {"q": "¿Es rentable con un ticket medio moderado?", "a": "Especialmente. Winerim ayuda a subir el ticket medio sugiriendo vinos que complementan el plato, convirtiendo una comida de 30€ en una experiencia de 45€ de forma natural."}]'::jsonb,
  '["software-carta-de-vinos-valencia", "software-carta-de-vinos-malaga", "software-carta-de-vinos-palma-de-mallorca", "software-vino-restaurante-italiano"]'::jsonb,
  'Article',
  true
);

-- Granada
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-granada',
  'city',
  'es',
  'Software de Carta de Vinos en Granada | Winerim',
  'Software de carta de vinos para restaurantes en Granada. Gestión de vinos de la Contraviesa, Alpujarras y maridajes con cocina granadina.',
  'Granada, España',
  'Software de carta de vinos para restaurantes en Granada',
  'Lleva la carta de vinos de tu restaurante granadino al siguiente nivel con herramientas que valoran los vinos de la tierra y la cocina local.',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Granada es una de las ciudades más visitadas de España, con la Alhambra como imán turístico y una cultura de tapas gratuitas que la hace única. Esta generosidad gastronómica convive con una escena de restaurantes de autor cada vez más ambiciosa y con una zona vinícola sorprendente: la Contraviesa y las Alpujarras producen vinos de altura (hasta 1.400m) con carácter propio. Los restauradores granadinos tienen la oportunidad de transformar la experiencia del vino: del vino de la casa gratuito al maridaje premium que multiplica el ticket medio. Winerim es la herramienta para dar ese salto.", "stats": [{"label": "Incremento en ventas de vino", "value": "+23%"}, {"label": "Mejora del ticket medio", "value": "+17%"}, {"label": "Turistas que eligen vino", "value": "+38%"}], "country": "España", "features": [{"title": "Vinos de la Contraviesa y Alpujarras", "desc": "Base de datos con los vinos de altura de Granada, incluyendo variedades como Vijiriego, Jaén tinto y Tempranillo de montaña."}, {"title": "Estrategia de upsell para bares de tapas", "desc": "Herramientas para convertir el vino de la casa en una oportunidad de venta: sugerencias de upgrade y vinos por copa premium."}, {"title": "Carta multilingüe para turismo Alhambra", "desc": "Traducciones en inglés, francés, alemán, japonés y coreano, adaptadas al perfil turístico diverso de Granada."}, {"title": "Maridajes con cocina granadina", "desc": "Sugerencias específicas para platos locales: habas con jamón, tortilla del Sacromonte, piononos, remojón granadino."}], "problems": ["Cultura de tapa gratis que devalúa la percepción del vino como experiencia premium", "Restaurantes turísticos que sirven vino genérico sin aprovechar la oferta local", "Vinos de la Contraviesa poco conocidos incluso entre los propios granadinos", "Personal de hostelería joven sin formación en vinos locales", "Alta rotación de turistas que necesitan recomendaciones rápidas y atractivas"], "city_name": "Granada", "ticket_medio": "30-50€"}'::jsonb,
  '[{"q": "¿Winerim puede ayudar a subir el ticket medio en un bar de tapas?", "a": "Sí. Winerim incluye herramientas de upsell que sugieren vinos por copa premium como alternativa al vino de la casa, y maridajes específicos que animan al cliente a probar algo especial."}, {"q": "¿Incluye vinos de la Contraviesa?", "a": "Sí. Nuestra base de datos cubre los vinos de la Contraviesa, las Alpujarras y otras zonas vinícolas de Granada, con fichas de variedades autóctonas y altitud de viñedo."}, {"q": "¿Funciona con turismo de la Alhambra?", "a": "Perfectamente. La carta multilingüe y las descripciones contextualizadas ayudan a que los visitantes internacionales descubran los vinos locales como parte de su experiencia granadina."}]'::jsonb,
  '["software-carta-de-vinos-sevilla", "software-carta-de-vinos-malaga", "software-carta-de-vinos-cadiz", "software-vino-restaurante-italiano"]'::jsonb,
  'Article',
  true
);

-- A Coruña
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-a-coruna',
  'city',
  'es',
  'Software de Carta de Vinos en A Coruña | Winerim',
  'Software de carta de vinos para restaurantes en A Coruña. Gestión de albariños, Ribeira Sacra y maridajes con marisco gallego.',
  'A Coruña, España',
  'Software de carta de vinos para restaurantes en A Coruña',
  'Gestiona la carta de vinos de tu restaurante coruñés con tecnología pensada para el maridaje de vinos gallegos y marisco atlántico.',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "A Coruña es la puerta de entrada a una de las regiones vinícolas más emocionantes de España. Galicia produce blancos extraordinarios — Albariño, Godello, Treixadura, Mencía — en denominaciones como Rías Baixas, Ribeira Sacra, Valdeorras, Monterrei y Ribeiro. La cocina coruñesa, dominada por el marisco atlántico de las rías, exige vinos que estén a la altura de su frescura y complejidad. Los restauradores coruñeses manejan cartas donde la calidad del vino es tan importante como la del producto del mar. Profesionalizar esa carta con herramientas digitales significa servir mejor y vender más.", "stats": [{"label": "Incremento en ventas de vino", "value": "+16%"}, {"label": "Mejora del ticket medio", "value": "+20%"}, {"label": "Rotación de blancos por copa", "value": "+50%"}], "country": "España", "features": [{"title": "5 DOs gallegas integradas", "desc": "Rías Baixas, Ribeira Sacra, Valdeorras, Ribeiro y Monterrei con fichas de subzonas, suelos y microclimas. Cobertura de las bodegas de referencia."}, {"title": "Maridaje marisco-vino", "desc": "Motor de recomendación especializado en maridajes con mariscos atlánticos: percebes, nécoras, centollas, navajas, ostras, almejas y vieiras."}, {"title": "Gestión de blancos por copa", "desc": "Los blancos gallegos pierden frescura rápido una vez abiertos. Alertas de consumo, rotación óptima y sugerencias de precio por copa."}, {"title": "Carta estacional Galicia", "desc": "Adaptación automática según temporada de mariscos (percebes en verano, centolla en invierno) con vinos sugeridos por temporada."}], "problems": ["Carta dominada por Albariño genérico sin explorar Godello, Treixadura o Mencía", "Marisquerías con producto excepcional pero vinos que no están a la altura", "Blancos que se abren y no se consumen a tiempo, generando mermas", "Falta de información sobre subzonas de Rías Baixas (Val do Salnés, O Rosal, Condado do Tea)", "Clientela local con alto conocimiento de vinos gallegos que exige profundidad en la carta"], "city_name": "A Coruña", "ticket_medio": "40-65€"}'::jsonb,
  '[{"q": "¿Winerim cubre todas las DOs gallegas?", "a": "Sí. Incluimos Rías Baixas (con subzonas), Ribeira Sacra, Valdeorras, Ribeiro y Monterrei, con fichas detalladas de variedades como Albariño, Godello, Treixadura, Mencía y Brancellao."}, {"q": "¿Tiene maridajes específicos para marisco?", "a": "Es una de nuestras especialidades. El motor de maridaje incluye sugerencias específicas para cada tipo de marisco atlántico, desde ostras y navajas hasta percebes y centolla."}, {"q": "¿Cómo gestiona la caducidad de blancos abiertos?", "a": "Winerim incluye alertas de consumo para vinos abiertos, sugiriendo acciones (promoción por copa, inclusión en menú) antes de que el vino pierda sus cualidades óptimas."}]'::jsonb,
  '["software-carta-de-vinos-santander", "software-carta-de-vinos-bilbao", "software-carta-de-vinos-madrid", "software-vino-restaurante-italiano"]'::jsonb,
  'Article',
  true
);

-- Marbella
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-marbella',
  'city',
  'es',
  'Software de Carta de Vinos en Marbella | Winerim',
  'Software de carta de vinos para restaurantes de lujo en Marbella. Gestión de bodegas premium, multilingüe y analítica para hostelería de alto nivel.',
  'Marbella, España',
  'Software de carta de vinos para restaurantes en Marbella',
  'Herramientas de gestión vinícola a la altura del lujo gastronómico de Marbella. Bodega premium, carta multilingüe y analítica avanzada.',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Marbella es sinónimo de lujo gastronómico. La Milla de Oro de restaurantes entre Puerto Banús y el casco antiguo compite con Mónaco y Saint-Tropez por atraer a una clientela internacional de alto poder adquisitivo. En este contexto, la carta de vinos no es un complemento sino un centro de beneficio que puede representar el 40-60% de la facturación. Los restauradores marbellíes gestionan bodegas con referencias de Borgoña, Burdeos, Toscana, Napa Valley y champagnes prestige. La digitalización de esta gestión no es opcional: es la diferencia entre maximizar una inversión de miles de euros en stock y dejar que ese capital se deprecie.", "stats": [{"label": "Incremento en ventas de vino", "value": "+18%"}, {"label": "Mejora del ticket medio", "value": "+32%"}, {"label": "Rentabilidad de bodega", "value": "+25%"}], "country": "España", "features": [{"title": "Gestión de bodega de lujo", "desc": "Control de referencias premium: Borgoña, Burdeos, Super Toscanos, Champagne prestige. Gestión de añadas, valoración de inventario y ventana de consumo óptimo."}, {"title": "Carta multilingüe premium", "desc": "Inglés, árabe, ruso, francés y alemán con terminología enológica cuidada para clientela internacional de alto nivel."}, {"title": "Analítica de margen por segmento", "desc": "Datos de rentabilidad segmentados por tipo de cliente (hotel, beach club, restaurante gastronómico) para optimizar la oferta en cada punto de venta."}, {"title": "Wine pairing experience", "desc": "Diseño de experiencias de maridaje premium para eventos, cenas privadas y menús degustación con sugerencias de vinos y presentación."}], "problems": ["Bodegas con inversiones de decenas de miles de euros sin control de rotación ni valoración actualizada", "Clientela ultra-premium que espera encontrar champagnes y Borgoñas específicos en carta", "Beach clubs y pool restaurants que subestiman el potencial de venta de vino premium por copa", "Personal de sala internacional que necesita formación constante en una bodega que cambia", "Competencia directa con restaurantes de Mónaco, Ibiza y Mykonos por el mismo cliente"], "city_name": "Marbella", "ticket_medio": "65-120€"}'::jsonb,
  '[{"q": "¿Winerim gestiona bodegas con referencias de más de 100€?", "a": "Por supuesto. Winerim está diseñado para gestionar bodegas de cualquier nivel de precio, con funciones específicas para vinos premium: valoración de inventario, ventana de consumo óptimo y alertas de reposición."}, {"q": "¿Incluye carta en árabe y ruso?", "a": "Sí. Para mercados como Marbella donde la clientela incluye perfiles de Oriente Medio y Europa del Este, ofrecemos traducciones profesionales en árabe, ruso y otros idiomas relevantes."}, {"q": "¿Funciona para beach clubs y pool restaurants?", "a": "Ideal. El formato digital de Winerim es perfecto para entornos de playa y piscina, con carta accesible por QR, selección de vinos por copa premium y analítica de ventas por punto de venta."}]'::jsonb,
  '["software-carta-de-vinos-malaga", "software-carta-de-vinos-ibiza", "software-carta-de-vinos-palma-de-mallorca", "software-vino-restaurante-italiano"]'::jsonb,
  'Article',
  true
);

-- Ibiza
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-ibiza',
  'city',
  'es',
  'Software de Carta de Vinos en Ibiza | Winerim',
  'Software de carta de vinos para restaurantes en Ibiza. Gestión de carta multilingüe, vinos ibicencos y analítica para hostelería estacional.',
  'Ibiza, España',
  'Software de carta de vinos para restaurantes en Ibiza',
  'Gestiona la carta de vinos de tu restaurante ibicenco con tecnología adaptada a la estacionalidad, el turismo premium y los vinos de la isla.',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Ibiza ha evolucionado de isla de fiesta a destino gastronómico de primer nivel. Restaurantes como Sublimotion, La Gaia o Es Tragón colocan a la isla en el mapa culinario mundial, mientras que agroturismos reconvertidos y chiringuitos de autor ofrecen experiencias enogastronómicas únicas. Los vinos ibicencos (DO Ibiza / Vi de la Terra) son el secreto mejor guardado de la isla, con variedades como Monastrell, Malvasía y Garnacha cultivadas en terrazas con vistas al mar. La temporada concentrada (mayo-octubre) exige una gestión impecable: cada semana cuenta para maximizar la rentabilidad de la carta de vinos.", "stats": [{"label": "Incremento en ventas de vino", "value": "+26%"}, {"label": "Mejora del ticket medio", "value": "+23%"}, {"label": "Eficiencia en temporada alta", "value": "+40%"}], "country": "España", "features": [{"title": "Vinos de Ibiza integrados", "desc": "DO Ibiza y Vi de la Terra con storytelling de bodegas locales (Can Rich, Ibizkus, Sa Cova). Punto de diferenciación para turistas que buscan autenticidad."}, {"title": "Gestión de temporada intensiva", "desc": "Herramientas para maximizar ventas en los 5 meses de temporada alta: precios dinámicos, rotación acelerada y previsión de stock."}, {"title": "Multilingüe para jet set", "desc": "Inglés, francés, italiano, alemán y ruso. Adaptado al perfil cosmopolita de los visitantes de Ibiza."}, {"title": "Integración con agroturismos", "desc": "Formato de carta que combina vinos con experiencia rural: visita a viñedo, cata privada, cena entre olivos."}], "problems": ["Temporada ultracorta que exige rentabilizar al máximo cada servicio", "Personal de temporada internacional sin conocimiento de vinos ibicencos", "Beach clubs y restaurantes de puesta de sol donde el vino compite con cócteles de alto margen", "Proveedores insulares con logística limitada y costes de transporte elevados", "Turistas que asocian Ibiza a fiesta y no a gastronomía — oportunidad de sorpresa"], "city_name": "Ibiza", "ticket_medio": "50-90€"}'::jsonb,
  '[{"q": "¿Winerim sirve para negocios con temporada corta?", "a": "Especialmente. Las herramientas de previsión de stock, precios dinámicos y analítica de ventas están diseñadas para maximizar cada semana de temporada, algo crítico en Ibiza."}, {"q": "¿Incluye vinos de la DO Ibiza?", "a": "Sí. Cubrimos todas las bodegas de la isla con fichas detalladas y storytelling que permite al personal explicar estos vinos a turistas curiosos."}, {"q": "¿Puedo competir con la carta de cócteles?", "a": "Winerim ayuda a presentar el vino como experiencia (maridaje, historia, terroir) en vez de como producto commodity, posicionándolo como alternativa premium a los cócteles."}]'::jsonb,
  '["software-carta-de-vinos-palma-de-mallorca", "software-carta-de-vinos-marbella", "software-carta-de-vinos-barcelona", "software-vino-restaurante-italiano"]'::jsonb,
  'Article',
  true
);

-- Tenerife
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-tenerife',
  'city',
  'es',
  'Software de Carta de Vinos en Tenerife | Winerim',
  'Software de carta de vinos para restaurantes en Tenerife. Gestiona vinos volcánicos, Listán Negro y cartas multilingües para turismo canario.',
  'Tenerife, España',
  'Software de carta de vinos para restaurantes en Tenerife',
  'Gestiona la carta de vinos de tu restaurante tinerfeño con tecnología que pone en valor los vinos volcánicos de la isla.',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Tenerife es la isla más grande de Canarias y alberga una de las zonas vinícolas más singulares de Europa. Con 5 denominaciones de origen propias, viñedos en laderas volcánicas a más de 1.000 metros de altitud y variedades únicas como Listán Negro y Listán Blanco, los vinos tinerfeños están captando la atención de la crítica internacional. Los restaurantes de la isla — desde las guachinches tradicionales hasta los gastronómicos de Santa Cruz y La Laguna — tienen en estos vinos un activo diferencial que pocos destinos pueden igualar. Winerim ayuda a transformar esa riqueza vinícola en experiencias memorables y ventas reales.", "stats": [{"label": "Incremento en ventas de vino", "value": "+25%"}, {"label": "Mejora del ticket medio", "value": "+18%"}, {"label": "Turistas que prueban vino local", "value": "+60%"}], "country": "España", "features": [{"title": "5 DOs tinerfeñas integradas", "desc": "Tacoronte-Acentejo, Valle de la Orotava, Ycoden-Daute-Isora, Abona y Valle de Güímar con fichas de variedades volcánicas y altitud de viñedo."}, {"title": "Storytelling volcánico", "desc": "Descripciones que explican la singularidad del terroir volcánico del Teide, un argumento de venta potentísimo para turistas internacionales."}, {"title": "Multilingüe para turismo canario", "desc": "Inglés, alemán, holandés, sueco y francés. Adaptado al perfil turístico del norte de Europa que visita Tenerife."}, {"title": "Formato para guachinches", "desc": "Carta simplificada y económica perfecta para guachinches y bodegas tradicionales que quieren profesionalizar sin perder autenticidad."}], "problems": ["Vinos volcánicos únicos en el mundo que los turistas desconocen completamente", "Guachinches con vinos excelentes pero sin carta formal ni información para el cliente", "Restaurantes de hotel que sirven vinos peninsulares ignorando la producción local", "5 DOs diferentes en una sola isla que confunden incluso a los profesionales locales", "Turismo de crucero con visitas cortas que necesita recomendaciones inmediatas"], "city_name": "Tenerife", "ticket_medio": "35-55€"}'::jsonb,
  '[{"q": "¿Winerim cubre las 5 DOs de Tenerife?", "a": "Sí. Incluimos Tacoronte-Acentejo, Valle de la Orotava, Ycoden-Daute-Isora, Abona y Valle de Güímar con fichas completas de bodegas, variedades y subzonas."}, {"q": "¿Funciona para guachinches?", "a": "Hemos diseñado un formato simplificado perfecto para guachinches: carta breve, visual, con QR y descripciones que ayudan al visitante a entender qué está bebiendo sin perder la esencia del formato tradicional."}, {"q": "¿Cómo explico los vinos volcánicos a turistas?", "a": "Winerim incluye storytelling integrado que explica el terroir volcánico, la altitud y las variedades autóctonas de forma accesible. El personal puede consultarlo y el cliente puede leerlo en su idioma."}]'::jsonb,
  '["software-carta-de-vinos-las-palmas", "software-carta-de-vinos-palma-de-mallorca", "software-carta-de-vinos-malaga", "software-vino-restaurante-italiano"]'::jsonb,
  'Article',
  true
);

-- Las Palmas
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-las-palmas',
  'city',
  'es',
  'Software de Carta de Vinos en Las Palmas | Winerim',
  'Software de carta de vinos para restaurantes en Las Palmas de Gran Canaria. Gestión de vinos canarios y cartas multilingües con Winerim.',
  'Las Palmas de Gran Canaria, España',
  'Software de carta de vinos para restaurantes en Las Palmas',
  'Digitaliza la carta de vinos de tu restaurante en Gran Canaria con tecnología que valora los vinos canarios y el turismo internacional.',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Las Palmas de Gran Canaria es una ciudad cosmopolita con una escena gastronómica que fusiona tradición canaria, influencia africana y vanguardia. La DO Gran Canaria y los vinos de Lanzarote (Malvasía volcánica) están ganando reconocimiento internacional, mientras que el turismo de la isla — nómadas digitales, jubilados europeos, cruceristas — demanda experiencias gastronómicas auténticas. Los restauradores de Las Palmas que integran vinos canarios en cartas profesionales y multilingües capturan un segmento de mercado cada vez más valioso. La barriada de Vegueta y la zona de Las Canteras son focos gastronómicos en plena expansión.", "stats": [{"label": "Incremento en ventas de vino", "value": "+20%"}, {"label": "Mejora del ticket medio", "value": "+16%"}, {"label": "Vinos canarios vendidos", "value": "+48%"}], "country": "España", "features": [{"title": "Vinos de Gran Canaria y Canarias", "desc": "DO Gran Canaria, Malvasía de Lanzarote y vinos de otras islas con fichas de terroir volcánico y variedades autóctonas."}, {"title": "Carta para nómadas digitales", "desc": "Formato moderno y digital-first que encaja con la comunidad de trabajadores remotos que ha elegido Las Palmas como base."}, {"title": "Multilingüe para cruceristas", "desc": "Inglés, alemán, francés, holandés y los idiomas escandinavos, pensado para la alta rotación de visitantes de crucero."}, {"title": "Maridajes con cocina canaria", "desc": "Sugerencias de vino para papas arrugadas con mojo, gofio, ropa vieja, sancocho y pescado fresco del día."}], "problems": ["Restaurantes que sirven solo vinos peninsulares sin aprovechar la producción canaria local", "Turistas que desconocen que Canarias produce vino y optan por cerveza o sangría", "Logística insular que encarece el stock de vinos de la península", "Cruceristas con tiempo limitado que necesitan cartas claras y recomendaciones rápidas", "Nómadas digitales exigentes acostumbrados a cartas de vino sofisticadas en otras ciudades"], "city_name": "Las Palmas", "ticket_medio": "30-50€"}'::jsonb,
  '[{"q": "¿Winerim incluye vinos de Gran Canaria?", "a": "Sí. Cubrimos la DO Gran Canaria y los vinos de todas las islas Canarias, incluyendo la célebre Malvasía volcánica de Lanzarote, con fichas de terroir y variedades."}, {"q": "¿Es útil para restaurantes con mucho turismo de crucero?", "a": "Ideal. La carta multilingüe, las recomendaciones rápidas y el formato QR son perfectos para atender cruceristas que buscan una experiencia gastronómica local en pocas horas."}, {"q": "¿Puedo destacar vinos locales sobre peninsulares?", "a": "Winerim permite organizar la carta destacando la producción local, con storytelling volcánico que convierte cada copa de vino canario en una experiencia memorable para el visitante."}]'::jsonb,
  '["software-carta-de-vinos-tenerife", "software-carta-de-vinos-palma-de-mallorca", "software-carta-de-vinos-sevilla", "software-vino-restaurante-italiano"]'::jsonb,
  'Article',
  true
);

-- Cádiz
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-cadiz',
  'city',
  'es',
  'Software de Carta de Vinos en Cádiz | Winerim',
  'Software de carta de vinos para restaurantes en Cádiz. Gestión de jereces, manzanillas de Sanlúcar y maridajes con cocina gaditana.',
  'Cádiz, España',
  'Software de carta de vinos para restaurantes en Cádiz',
  'Gestiona la carta de vinos de tu restaurante gaditano con tecnología que hace justicia al Marco de Jerez y la cocina del mar.',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Cádiz y su provincia son el epicentro de una de las culturas vinícolas más ricas y complejas del mundo: el Marco de Jerez. Finos, manzanillas, amontillados, olorosos, palos cortados, creams y PX conforman un universo que la crítica internacional redescubre cada año. La cocina gaditana — atún de almadraba, tortillitas de camarones, pescaíto frito, ortiguillas — tiene en estos vinos su maridaje natural e insuperable. Los restauradores de Cádiz, El Puerto de Santa María y Sanlúcar de Barrameda tienen un tesoro vinícola a su puerta. Winerim les ayuda a presentarlo, explicarlo y rentabilizarlo.", "stats": [{"label": "Incremento en ventas de jerez", "value": "+30%"}, {"label": "Mejora del ticket medio", "value": "+22%"}, {"label": "Clientes que prueban manzanilla", "value": "+55%"}], "country": "España", "features": [{"title": "Catálogo completo del Marco de Jerez", "desc": "Todas las categorías: fino, manzanilla, amontillado, oloroso, palo cortado, cream, PX, VOS, VORS. Con fichas de bodegas, soleras y notas de cata."}, {"title": "Maridaje con cocina gaditana", "desc": "Sugerencias específicas: manzanilla con langostinos, fino con tortillitas de camarones, amontillado con atún de almadraba, PX con tocino de cielo."}, {"title": "Educación del cliente", "desc": "Fichas explicativas que ayudan al comensal a entender el sistema de crianza biológica y oxidativa, desmitificando el jerez para nuevos consumidores."}, {"title": "Gestión de vinos generosos", "desc": "Control de botellas abiertas, temperatura de servicio y rotación óptima para vinos que requieren un manejo especial una vez abiertos."}], "problems": ["Turistas que asocian jerez a vino dulce barato y no conocen finos ni manzanillas", "Restaurantes con cartas de vino genéricas que no exploran la diversidad del Marco de Jerez", "Botellas de jerez abiertas que pierden cualidades por mala gestión de la rotación", "Personal de sala que no sabe explicar la diferencia entre un fino y un amontillado", "Competencia de la cerveza y el rebujito en un mercado donde el vino debería dominar"], "city_name": "Cádiz", "ticket_medio": "35-55€"}'::jsonb,
  '[{"q": "¿Winerim cubre todo el Marco de Jerez?", "a": "Completamente. Desde finos y manzanillas hasta VORS de 30+ años, con fichas de las principales bodegas de Jerez, El Puerto y Sanlúcar, incluidas soleras históricas."}, {"q": "¿Puede ayudar a que los turistas prueben jerez?", "a": "Sí. Las fichas educativas y las descripciones accesibles están diseñadas para desmitificar el jerez y presentarlo como vino de gastronomía, no como aperitivo del abuelo."}, {"q": "¿Cómo gestiono las botellas abiertas de jerez?", "a": "Winerim incluye alertas de consumo específicas para vinos generosos, que tienen necesidades diferentes a los vinos tranquilos una vez abiertos, especialmente finos y manzanillas."}]'::jsonb,
  '["software-carta-de-vinos-sevilla", "software-carta-de-vinos-malaga", "software-carta-de-vinos-granada", "software-vino-restaurante-italiano"]'::jsonb,
  'Article',
  true
);

-- Santander
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-santander',
  'city',
  'es',
  'Software de Carta de Vinos en Santander | Winerim',
  'Software de carta de vinos para restaurantes en Santander. Gestión de vinos cántabros y del norte de España con maridajes de cocina marinera.',
  'Santander, España',
  'Software de carta de vinos para restaurantes en Santander',
  'Gestiona la carta de vinos de tu restaurante en Santander con tecnología pensada para la cocina cántabra y los vinos del Cantábrico.',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Santander y Cantabria ofrecen una gastronomía de producto atlántico excepcional: anchoas de Santoña, rabas, cocido montañés, sobaos y quesucos. La escena vinícola cántabra, aunque modesta en volumen, está creciendo con bodegas que elaboran blancos atlánticos y tintos sorprendentes. Pero la carta de vinos de un restaurante santanderino va mucho más allá de lo local: Riojas, txakolís, Ruedas y Rías Baixas son compañeros naturales de la cocina cantábrica. La profesionalización de la carta de vinos es una oportunidad real en una ciudad con turismo de calidad y una clientela local que valora comer bien.", "stats": [{"label": "Incremento en ventas de vino", "value": "+18%"}, {"label": "Mejora del ticket medio", "value": "+19%"}, {"label": "Rotación de referencias", "value": "x1.8"}], "country": "España", "features": [{"title": "Vinos del Cantábrico norte", "desc": "Cobertura de vinos cántabros, txakolís, Rías Baixas, Bierzo y Rioja — las regiones que mejor maridan con la cocina atlántica santanderina."}, {"title": "Maridajes con producto cántabro", "desc": "Sugerencias específicas para anchoas de Santoña, rabas, cocido montañés, almejas y bonito del norte."}, {"title": "Gestión estacional costa", "desc": "Herramientas para adaptar la carta a la temporada turística de verano y a la clientela local el resto del año."}, {"title": "Carta para sidrerías y tabernas", "desc": "Formato simplificado que incluye sidra, vinos y opciones por copa para establecimientos tradicionales cántabros."}], "problems": ["Restaurantes marineros con producto excepcional pero cartas de vino genéricas", "Desconocimiento de la incipiente producción vinícola cántabra entre los propios locales", "Estacionalidad turística que concentra la demanda en verano en la zona de El Sardinero", "Competencia de la cerveza y la sidra en un mercado donde el vino tiene mucho potencial", "Falta de formación del personal en maridajes específicos para cocina atlántica"], "city_name": "Santander", "ticket_medio": "40-60€"}'::jsonb,
  '[{"q": "¿Winerim incluye vinos de Cantabria?", "a": "Sí. Aunque la producción cántabra es pequeña, incluimos las bodegas locales junto con una amplia cobertura de regiones cercanas como Rioja, txakolí y Rías Baixas que son el complemento natural."}, {"q": "¿Tiene maridajes para anchoas y cocina marinera?", "a": "Es una de nuestras especialidades. El motor de maridaje incluye sugerencias para anchoas, rabas, bonito, almejas y todos los productos del Cantábrico."}, {"q": "¿Sirve para un restaurante con carta corta?", "a": "Perfectamente. Winerim se adapta a cualquier tamaño de carta, y para restaurantes con 20-30 referencias, las herramientas de optimización y vino por copa son especialmente valiosas."}]'::jsonb,
  '["software-carta-de-vinos-bilbao", "software-carta-de-vinos-a-coruna", "software-carta-de-vinos-san-sebastian", "software-vino-restaurante-italiano"]'::jsonb,
  'Article',
  true
);

-- Pamplona
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-pamplona',
  'city',
  'es',
  'Software de Carta de Vinos en Pamplona | Winerim',
  'Software de carta de vinos para restaurantes en Pamplona. Gestión de vinos de Navarra, Rioja y maridajes con cocina navarra.',
  'Pamplona, España',
  'Software de carta de vinos para restaurantes en Pamplona',
  'Gestiona la carta de vinos de tu restaurante pamplonés con tecnología que aprovecha la riqueza vinícola de Navarra.',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Pamplona es la capital de una de las regiones vinícolas con mejor relación calidad-precio de España. La DO Navarra produce rosados legendarios, tintos de Garnacha que compiten con los mejores, y blancos de Chardonnay que sorprenden. A esto se suma la proximidad de Rioja (a 30 minutos), la influencia de la cocina vasca y una tradición de pintxos propia que rivaliza con San Sebastián. Los Sanfermines atraen turismo internacional masivo, pero Pamplona es mucho más: una ciudad gastronómica de primer nivel donde la carta de vinos es parte esencial de la experiencia.", "stats": [{"label": "Incremento en ventas de vino", "value": "+19%"}, {"label": "Mejora del ticket medio", "value": "+21%"}, {"label": "Vinos de Navarra vendidos", "value": "+42%"}], "country": "España", "features": [{"title": "DO Navarra completa", "desc": "Todas las subzonas (Baja Montaña, Valdizarbe, Tierra Estella, Ribera Alta, Ribera Baja) con fichas de bodegas, rosados, Garnachas y blancos."}, {"title": "Rioja y Navarra integradas", "desc": "Gestión conjunta de las dos DOs que dominan la oferta vinícola pamplonesa, con filtros por región, variedad y precio."}, {"title": "Carta para Sanfermines", "desc": "Formato especial para la alta demanda de julio: carta simplificada, vinos por copa optimizados y gestión de stock para volumen extremo."}, {"title": "Pintxos y maridaje navarro", "desc": "Sugerencias de vino para la tradición de pintxos pamplonesa: chistorra, pimientos del piquillo, espárragos de Navarra, chuletón."}], "problems": ["Rosados de Navarra infravalorados en carta a pesar de su calidad internacional", "Restaurantes que solo ofrecen Rioja ignorando el potencial de la DO Navarra", "Sanfermines: gestión caótica de stock y personal temporal sin formación vinícola", "Pintxo-bars que no aprovechan el vino como palanca de ticket medio", "Competencia de cerveza artesanal en un mercado joven y dinámico"], "city_name": "Pamplona", "ticket_medio": "40-60€"}'::jsonb,
  '[{"q": "¿Winerim cubre la DO Navarra?", "a": "Completamente. Todas las subzonas, con especial atención a los rosados de Garnacha, los tintos de Garnacha vieja y los blancos de Chardonnay que están dando que hablar."}, {"q": "¿Sirve para gestionar Sanfermines?", "a": "Sí. El modo de carta rápida, la gestión de stock para volumen alto y los precios dinámicos son herramientas diseñadas para eventos de alta demanda como los Sanfermines."}, {"q": "¿Puedo combinar Navarra y Rioja en la carta?", "a": "Por supuesto. Winerim permite organizar la carta por región, variedad o precio, facilitando que el comensal descubra tanto los Riojas clásicos como los Navarras emergentes."}]'::jsonb,
  '["software-carta-de-vinos-bilbao", "software-carta-de-vinos-san-sebastian", "software-carta-de-vinos-zaragoza", "software-vino-restaurante-italiano"]'::jsonb,
  'Article',
  true
);

-- Salamanca
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-salamanca',
  'city',
  'es',
  'Software de Carta de Vinos en Salamanca | Winerim',
  'Software de carta de vinos para restaurantes en Salamanca. Gestión de vinos de Arribes, Sierra de Salamanca y maridajes con cocina charra.',
  'Salamanca, España',
  'Software de carta de vinos para restaurantes en Salamanca',
  'Gestiona la carta de vinos de tu restaurante salmantino con tecnología que pone en valor los vinos de la tierra y la cocina charra.',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Salamanca es una ciudad universitaria y monumental con una gastronomía de interior potente: jamón de Guijuelo, hornazo, chanfaina, farinato. La provincia alberga zonas vinícolas emergentes como Arribes del Duero y Sierra de Salamanca, con variedades autóctonas como Rufete y Juan García que están ganando reconocimiento. A esto se suma la proximidad de Toro, Ribera del Duero y Rueda. La comunidad universitaria internacional y el turismo cultural demandan experiencias gastronómicas completas. Los restauradores salmantinos que profesionalizan su carta de vinos se diferencian en un mercado con mucho potencial de crecimiento.", "stats": [{"label": "Incremento en ventas de vino", "value": "+22%"}, {"label": "Mejora del ticket medio", "value": "+17%"}, {"label": "Estudiantes que piden vino", "value": "+35%"}], "country": "España", "features": [{"title": "Vinos salmantinos y de Castilla y León", "desc": "Arribes, Sierra de Salamanca, Toro, Ribera del Duero y Rueda con fichas de variedades autóctonas como Rufete, Juan García y Bruñal."}, {"title": "Maridajes con cocina charra", "desc": "Sugerencias específicas para jamón de Guijuelo, hornazo, chanfaina, cochinillo y morucha de Salamanca."}, {"title": "Formato para mesones y asadores", "desc": "Carta adaptada al formato de restaurante tradicional salmantino, con énfasis en tintos de guarda y vinos por copa."}, {"title": "Carta con atractivo para universitarios", "desc": "Selección de vinos accesibles y opciones por copa que atraen al público universitario sin sacrificar calidad ni margen."}], "problems": ["Mesones tradicionales con cartas de vino anticuadas y poca rotación", "Vinos salmantinos (Arribes, Sierra) prácticamente desconocidos incluso localmente", "Público universitario que asocia vino con precio alto y no lo pide", "Restaurantes turísticos en la Plaza Mayor con cartas genéricas sin identidad local", "Proveedores de Ribera del Duero y Toro que eclipsan la producción provincial"], "city_name": "Salamanca", "ticket_medio": "30-45€"}'::jsonb,
  '[{"q": "¿Winerim incluye vinos de Arribes y Sierra de Salamanca?", "a": "Sí. Cubrimos las DOs salmantinas con fichas de variedades autóctonas como Rufete y Juan García, además de toda Castilla y León para una carta completa."}, {"q": "¿Puede atraer público universitario al vino?", "a": "Winerim ayuda a crear selecciones de vinos por copa accesibles con descripciones informales y atractivas, ideal para acercar el vino a un público joven y curioso."}, {"q": "¿Sirve para mesones tradicionales?", "a": "Perfectamente. El formato de carta respeta la estética del mesón tradicional mientras moderniza la gestión y amplía la información disponible para el comensal."}]'::jsonb,
  '["software-carta-de-vinos-madrid", "software-carta-de-vinos-valladolid", "software-carta-de-vinos-sevilla", "software-vino-restaurante-italiano"]'::jsonb,
  'Article',
  true
);

-- Valladolid
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-valladolid',
  'city',
  'es',
  'Software de Carta de Vinos en Valladolid | Winerim',
  'Software de carta de vinos para restaurantes en Valladolid. Ribera del Duero, Rueda, Cigales y Toro: gestiona tu bodega con Winerim.',
  'Valladolid, España',
  'Software de carta de vinos para restaurantes en Valladolid',
  'Gestiona la carta de vinos de tu restaurante vallisoletano rodeado de las mejores DOs de Castilla y León.',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Valladolid es probablemente la ciudad española mejor posicionada vinícola y geográficamente: Ribera del Duero, Rueda, Cigales, Toro y Tierra de León están todas a menos de una hora. Esta riqueza vinícola inigualable se combina con una escena gastronómica que va de los asadores clásicos a los restaurantes de nueva cocina castellana. La ciudad se ha consolidado como capital del enoturismo español, y sus restauradores tienen acceso directo a bodegas de primer nivel. Winerim ayuda a transformar esa ventaja geográfica en una carta de vinos que refleje la excepcionalidad del entorno vinícola vallisoletano.", "stats": [{"label": "Incremento en ventas de vino", "value": "+16%"}, {"label": "Mejora del ticket medio", "value": "+23%"}, {"label": "Referencias locales en carta", "value": "+60%"}], "country": "España", "features": [{"title": "5 DOs a menos de 1 hora", "desc": "Ribera del Duero, Rueda, Cigales, Toro y Tierra de León integradas con fichas de bodegas, añadas y pagos. La carta definitiva de Castilla y León."}, {"title": "Gestión de bodega para asadores", "desc": "Control de tintos de guarda, añadas clásicas y vinos jóvenes. Ideal para asadores con bodega profunda de Ribera del Duero y Toro."}, {"title": "Enoturismo integrado", "desc": "Conecta tu carta con las experiencias de enoturismo de la zona: visitas a bodegas, catas y eventos vinícolas que complementan la oferta gastronómica."}, {"title": "Maridajes con asados castellanos", "desc": "Sugerencias perfectas para lechazo, cochinillo, morcilla de Valladolid, queso de oveja y legumbres de la tierra."}], "problems": ["Bodegas con demasiadas opciones de Ribera del Duero que dificultan la selección para el cliente", "Asadores clásicos con cartas de vino extensas pero difíciles de navegar", "Rueda y Cigales infravalorados frente al dominio de Ribera del Duero en cartas locales", "Enoturistas que esperan encontrar en restaurante lo que han probado en bodega", "Competencia entre restaurantes por ofrecer la mejor experiencia Ribera del Duero"], "city_name": "Valladolid", "ticket_medio": "35-55€"}'::jsonb,
  '[{"q": "¿Winerim cubre Ribera del Duero, Rueda y Cigales?", "a": "Completamente. Las cinco grandes DOs de la zona — Ribera del Duero, Rueda, Cigales, Toro y Tierra de León — están integradas con fichas detalladas de bodegas y añadas."}, {"q": "¿Sirve para asadores con bodega grande?", "a": "Es ideal. La gestión de añadas, el control de stock por lote y la navegación por filtros avanzados son funciones diseñadas para bodegas extensas como las de los asadores vallisoletanos."}, {"q": "¿Puedo vincular la carta con enoturismo?", "a": "Sí. Winerim permite añadir información sobre visitas a bodegas y experiencias de enoturismo vinculadas a los vinos de tu carta, enriqueciendo la experiencia del comensal."}]'::jsonb,
  '["software-carta-de-vinos-madrid", "software-carta-de-vinos-salamanca", "software-carta-de-vinos-bilbao", "software-vino-restaurante-italiano"]'::jsonb,
  'Article',
  true
);

-- Girona
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-girona',
  'city',
  'es',
  'Software de Carta de Vinos en Girona | Winerim',
  'Software de carta de vinos para restaurantes en Girona. Empordà, Costa Brava y alta cocina catalana: gestiona tu carta con Winerim.',
  'Girona, España',
  'Software de carta de vinos para restaurantes en Girona',
  'Gestiona la carta de vinos de tu restaurante gerundense con tecnología a la altura de la excelencia gastronómica de l''Empordà.',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Girona y la comarca del Empordà son sinónimo de alta gastronomía. El legado de El Bulli, restaurantes con estrella Michelin como El Celler de Can Roca (tres estrellas, mejor restaurante del mundo en dos ocasiones) y una tradición culinaria que fusiona mar y montaña hacen de Girona un destino gastronómico de élite. La DO Empordà produce vinos de enorme carácter — Garnatxa, Cariñena, Moscatel — en un paisaje de Tramontana y viñedos junto al mar. Los restauradores gerundenses necesitan cartas de vinos que reflejen esta excelencia, desde el restaurante gastronómico hasta el chiringuito de la Costa Brava.", "stats": [{"label": "Incremento en ventas de vino", "value": "+17%"}, {"label": "Mejora del ticket medio", "value": "+26%"}, {"label": "Vinos del Empordà vendidos", "value": "+45%"}], "country": "España", "features": [{"title": "DO Empordà y vinos catalanes", "desc": "Empordà, Penedès, Priorat, Montsant, Costers del Segre y Terra Alta con fichas de variedades mediterráneas y bodegas de referencia."}, {"title": "Carta para alta gastronomía", "desc": "Herramientas de gestión de bodega profunda con control de añadas, temperatura y maridajes para menús degustación de nivel Michelin."}, {"title": "Costa Brava turística", "desc": "Formato multilingüe (francés, inglés, alemán, holandés) optimizado para el turismo internacional de la Costa Brava."}, {"title": "Garnatxa del Empordà destacada", "desc": "Storytelling específico para la Garnatxa (dulce natural, seca, de viñas viejas), el vino emblema de la comarca."}], "problems": ["Restaurantes de Costa Brava con cartas de vino genéricas que no reflejan el Empordà", "Vinos del Empordà eclipsados por Priorat y Penedès en cartas catalanas", "Turismo francés fronterizo con altas expectativas vinícolas (vienen de Burdeos, Languedoc)", "Restaurantes gastronómicos que necesitan bodegas extensas y actualización constante", "Estacionalidad de la Costa Brava que concentra la demanda en verano"], "city_name": "Girona", "ticket_medio": "45-75€"}'::jsonb,
  '[{"q": "¿Winerim cubre la DO Empordà?", "a": "Completamente. Incluimos todas las bodegas del Empordà con fichas de Garnatxa, Cariñena, Moscatel y los vinos dulces naturales, además de toda la oferta vinícola catalana."}, {"q": "¿Sirve para restaurantes de nivel Michelin?", "a": "Está diseñado para ello. La gestión de bodega profunda, el control de añadas y las herramientas de maridaje para menús degustación son funciones pensadas para la alta gastronomía."}, {"q": "¿Funciona en francés para turismo fronterizo?", "a": "Sí. La carta multilingüe incluye francés con terminología enológica cuidada, esencial para el turismo francés que visita la Costa Brava y el Empordà."}]'::jsonb,
  '["software-carta-de-vinos-barcelona", "software-carta-de-vinos-palma-de-mallorca", "software-carta-de-vinos-san-sebastian", "software-vino-restaurante-italiano"]'::jsonb,
  'Article',
  true
);

-- Toledo
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-toledo',
  'city',
  'es',
  'Software de Carta de Vinos en Toledo | Winerim',
  'Software de carta de vinos para restaurantes en Toledo. Gestión de vinos manchegos, La Mancha y maridajes con cocina castellana.',
  'Toledo, España',
  'Software de carta de vinos para restaurantes en Toledo',
  'Gestiona la carta de vinos de tu restaurante toledano con tecnología que pone en valor los vinos de La Mancha y la cocina castellana.',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Toledo, la ciudad de las tres culturas, atrae millones de visitantes al año que buscan una experiencia cultural completa que incluye la gastronomía. La Mancha — la mayor zona vinícola del mundo por superficie — produce desde vinos de mesa económicos hasta referencias premium que sorprenden a los expertos. La cocina toledana — carcamusas, perdiz estofada, mazapán, queso manchego — pide vinos con carácter que acompañen sabores intensos. Los restauradores toledanos tienen la oportunidad de reivindicar los vinos de La Mancha ante un público internacional que los desconoce, transformando la percepción de vino barato en experiencia gastronómica auténtica.", "stats": [{"label": "Incremento en ventas de vino", "value": "+24%"}, {"label": "Mejora del ticket medio", "value": "+18%"}, {"label": "Turistas que eligen vino local", "value": "+52%"}], "country": "España", "features": [{"title": "Vinos de La Mancha y Méntrida", "desc": "DO La Mancha, Méntrida, Mondéjar y Uclés con fichas de Tempranillo, Airén, Garnacha y las nuevas expresiones de calidad manchegas."}, {"title": "Storytelling Quijote", "desc": "Descripciones que conectan el vino manchego con el imaginario cultural de La Mancha y Toledo, un argumento de venta irresistible para turistas internacionales."}, {"title": "Multilingüe para turismo monumental", "desc": "Inglés, francés, alemán, japonés, chino y coreano. Toledo es uno de los destinos más internacionales de España interior."}, {"title": "Maridajes con cocina toledana", "desc": "Sugerencias para carcamusas, perdiz, venado, queso manchego, mazapán y otros platos de la tradición culinaria de Toledo."}], "problems": ["Percepción de vinos de La Mancha como baratos, sin explorar las referencias premium", "Restaurantes turísticos con menú del día que no valoran la carta de vinos", "Turismo de día (Madrid-Toledo ida y vuelta) que limita el tiempo de experiencia gastronómica", "Falta de oferta de vinos por copa de calidad en un mercado dominado por el vino de la casa", "Competencia de precio con restaurantes de menú económico en zona turística"], "city_name": "Toledo", "ticket_medio": "30-50€"}'::jsonb,
  '[{"q": "¿Winerim puede reivindicar los vinos de La Mancha?", "a": "Sí. Nuestras fichas destacan las nuevas expresiones de calidad de La Mancha: Tempranillos de viña vieja, Garnachas de Méntrida y blancos de Airén con crianza que sorprenden a cualquier paladar."}, {"q": "¿Funciona para restaurantes con mucho turismo de día?", "a": "Perfecto. El formato QR, las recomendaciones rápidas y las descripciones multilingües permiten que el turista con tiempo limitado elija bien y rápido."}, {"q": "¿Puedo subir el ticket medio con vinos manchegos?", "a": "Absolutamente. Winerim ayuda a presentar vinos de La Mancha con 10-15€ de PVP como experiencias de valor, no como commodities, subiendo el ticket medio de forma natural."}]'::jsonb,
  '["software-carta-de-vinos-madrid", "software-carta-de-vinos-salamanca", "software-carta-de-vinos-sevilla", "software-vino-restaurante-italiano"]'::jsonb,
  'Article',
  true
);

COMMIT;

-- Verificación
SELECT slug, city_name FROM (
  SELECT slug, body->>'city_name' as city_name FROM seo_pages WHERE cluster='city' AND lang='es'
) t ORDER BY city_name;