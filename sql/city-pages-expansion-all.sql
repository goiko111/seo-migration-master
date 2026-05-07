-- =============================================================
-- City Pages Expansion - ALL Countries
-- Total: 210 new city pages
-- ES: 30 | UK: 30 | IT: 50 | FR: 50 | PT: 20 | DE: 30
-- Date: 2026-05-07
-- INSTRUCTIONS: Run each section separately in Supabase SQL Editor
-- =============================================================

-- ============ SPAIN (30 cities) ============
BEGIN;

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-cordoba',
  'city',
  'es',
  'Software de Carta de Vinos en Córdoba | Winerim',
  'Gestiona tu carta de vinos en Córdoba con nuestro software especializado. Vinos DO Montilla-Moriles al mejor precio. Solicita tu demo hoy.',
  'Córdoba, España',
  'Software de carta de vinos para restaurantes en Córdoba',
  'Potencia tus ventas de vino con la tecnología más avanzada en la capital del Califato',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Córdoba, cuna de la gastronomía andaluza, requiere una gestión sofisticada de sus cartas de vino. Con acceso directo a los vinos DO Montilla-Moriles y la tradición culinaria de la región, nuestro software optimiza la venta de los mejores caldos de la zona.", "stats": [{"label": "Incremento en ventas de vino", "value": "+22%"}, {"label": "Mejora del ticket medio", "value": "+18%"}, {"label": "Reducción de mermas", "value": "-15%"}], "country": "España", "features": [{"title": "Gestión DO Montilla-Moriles", "desc": "Integración completa con bodegas locales y denominación de origen de Córdoba"}, {"title": "Control de inventario avanzado", "desc": "Seguimiento en tiempo real de botellas y costos de almacenamiento"}, {"title": "Análisis de margen por copa", "desc": "Optimiza beneficios en la venta de vino por copas y botellas"}, {"title": "Recomendaciones por plato", "desc": "Sugerencias automáticas basadas en la gastronomía cordobesa"}], "problems": ["Dificultad para gestionar la variedad de vinos de DO local", "Pérdida de control de inventario en cartas amplias", "Bajo aprovechamiento de márgenes en vino", "Falta de integración con proveedores locales", "Desconocimiento de tendencias de consumo en Córdoba"], "city_name": "Córdoba", "ticket_medio": "25-40€"}'::jsonb,
  '[{"q": "¿Qué vinos DO Montilla-Moriles se venden mejor en Córdoba?", "a": "Según nuestros datos, los vinos blancos secos y amontillados tienen mayor demanda en restaurantes de Córdoba. Nuestro software te ayuda a identificar qué referencias generan más beneficio."}, {"q": "¿Cómo puedo mejorar la venta de vino local?", "a": "Con nuestro sistema de recomendaciones por plato y análisis de comportamiento de cliente, conseguirás incrementar las ventas de vino local entre un 20-30%."}, {"q": "¿Se integra con mis proveedores de vino en Córdoba?", "a": "Sí, nos integramos con los principales distribuidores de DO Montilla-Moriles y bodegas de la región."}]'::jsonb,
  '["software-carta-de-vinos-sevilla", "software-carta-de-vinos-malaga", "software-carta-de-vinos-jaen"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-murcia',
  'city',
  'es',
  'Software de Carta de Vinos en Murcia | Winerim',
  'Gestiona vinos DO Jumilla y DO Yecla en Murcia. Software especializado para cartas de vino. Incrementa ventas un +25%. Prueba gratis.',
  'Murcia, España',
  'Software de carta de vinos para restaurantes en Murcia',
  'Domina la venta de vino en la región de las huertas con nuestra tecnología inteligente',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Murcia es epicentro de dos denominaciones de origen: Jumilla y Yecla. La gestión eficiente de estas referencias es clave para rentabilizar restaurantes y bares de la región. Nuestro software especializado maximiza el potencial de las cartas locales.", "stats": [{"label": "Incremento en ventas de vino", "value": "+25%"}, {"label": "Mejora del ticket medio", "value": "+20%"}, {"label": "Optimización de cartas", "value": "+35%"}], "country": "España", "features": [{"title": "Catálogo DO Jumilla-Yecla", "desc": "Base de datos completa de bodegas y referencias de las DOs murcianas"}, {"title": "Gestión de cartas dinámicas", "desc": "Actualiza tu carta según disponibilidad y estacionalidad de cosechas"}, {"title": "Análisis de margen por referencia", "desc": "Identifica qué vinos generan más beneficio en tu establecimiento"}, {"title": "Conexión con distribuidores locales", "desc": "Intégrate directamente con proveedores de Jumilla y Yecla"}], "problems": ["Exceso de referencias de vino locales sin priorización", "Baja rotación de algunos vinos de DO", "Desconocimiento de márgenes reales por botella", "Falta de integración con bodegas locales", "Dificultad en la gestión estacional de cosechas"], "city_name": "Murcia", "ticket_medio": "22-38€"}'::jsonb,
  '[{"q": "¿Cuál es la mejor estrategia de vino en Murcia?", "a": "Priorizar vinos de DO Jumilla y Yecla que ofrecen excelente relación calidad-precio. Nuestro software identifica automáticamente las referencias más rentables para tu establecimiento."}, {"q": "¿Cómo gestiono la estacionalidad de cosechas?", "a": "Con nuestro sistema de actualización dinámica de cartas, puedes cambiar referencias según disponibilidad y demanda estacional sin perder el control del inventario."}, {"q": "¿Qué vinos de Yecla debo priorizar?", "a": "Los Monastrell de Yecla son emblemáticos. Nuestro análisis te muestra cuáles generan más margen en tu negocio específico."}]'::jsonb,
  '["software-carta-de-vinos-alicante", "software-carta-de-vinos-almeria"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-vigo',
  'city',
  'es',
  'Software de Carta de Vinos en Vigo | Winerim',
  'Vinos Rías Baixas para tu restaurante en Vigo. Software de gestión de cartas especializado. Incrementa ventas de vino +24%. Solicita demo.',
  'Vigo, España',
  'Software de carta de vinos para restaurantes en Vigo',
  'Optimiza la venta de Rías Baixas en la puerta de Galicia al Atlántico',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Vigo, capital gastronómica gallega con acceso directo al marisco y los blancos de Rías Baixas, necesita un sistema sofisticado para gestionar sus cartas de vino. Desde marisquerías hasta restaurantes de lujo, nuestro software maximiza beneficios en vino.", "stats": [{"label": "Incremento en ventas de vino", "value": "+24%"}, {"label": "Mejora del ticket medio", "value": "+19%"}, {"label": "Mejor sincronización marisco-vino", "value": "+40%"}], "country": "España", "features": [{"title": "Especialización Rías Baixas", "desc": "Catálogo completo de Albariño, Treixadura y otras varietales de la DO"}, {"title": "Pairing marisco-vino", "desc": "Recomendaciones automáticas de vino para cada tipo de marisco"}, {"title": "Gestión de costas", "desc": "Control de referencias en restaurantes costeros con conservación especial"}, {"title": "Análisis de temporada de marisco", "desc": "Sincronización de cartas de vino con disponibilidad estacional de productos"}], "problems": ["Falta de armonización entre oferta de marisco y vinos", "Dificultad en gestión de referencias premium de Rías Baixas", "Bajo aprovechamiento de márgenes en vino blanco", "Pérdida de control en restaurantes con múltiples puntos de venta", "Desconocimiento de tendencias locales de consumo"], "city_name": "Vigo", "ticket_medio": "28-45€"}'::jsonb,
  '[{"q": "¿Qué Albariño debo priorizar en mi restaurante?", "a": "Los Albariños premium de Rías Baixas (Martín Códax, Pazo de Señoans) generan mayor margen. Nuestro sistema identifica cuáles se venden mejor en tu zona de Vigo."}, {"q": "¿Cómo armonizo marisco y vino eficientemente?", "a": "Con nuestro módulo de pairing automático, tus camareros obtendrán recomendaciones en tiempo real basadas en el plato servido y el cliente objetivo."}, {"q": "¿Cómo manejo la conservación de vinos en costa?", "a": "Nuestro software incluye alertas de temperatura y humedad especiales para zonas costeras como Vigo."}]'::jsonb,
  '["software-carta-de-vinos-santiago-de-compostela", "software-carta-de-vinos-pontevedra", "software-carta-de-vinos-a-coruna"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-gijon',
  'city',
  'es',
  'Software de Carta de Vinos en Gijón | Winerim',
  'Gestiona cartas de vino en Gijón. Vinos de Asturias y del Atlántico. Software especializado para bares y restaurantes. Prueba gratis hoy.',
  'Gijón, España',
  'Software de carta de vinos para restaurantes en Gijón',
  'Maximiza ventas de vino en la capital de la Costa Verde asturiana',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Gijón es puerta al vino asturiano y a referencias de toda la costa norte. La creciente demanda de experiencias enológicas requiere sistemas avanzados de gestión. Nuestro software ayuda a bares y restaurantes gijoneses a optimizar sus cartas.", "stats": [{"label": "Incremento en ventas de vino", "value": "+23%"}, {"label": "Mejora del ticket medio", "value": "+21%"}, {"label": "Satisfacción de cliente", "value": "+38%"}], "country": "España", "features": [{"title": "Catálogo vinos asturianos", "desc": "Referencias especializadas en vinos de DO Cangas, Llaciana y otras de Asturias"}, {"title": "Gestión de referencias nórdicas", "desc": "Base de datos de vinos gallegos, cántabros y portugueses de fácil acceso"}, {"title": "Perfil de cliente Costa Verde", "desc": "Análisis de preferencias de turistas y residentes en la costa norte"}, {"title": "Sistema de recomendaciones", "desc": "Sugerencias inteligentes basadas en perfil de cliente y producto"}], "problems": ["Desconocimiento de vinos locales de Asturias", "Cartas demasiado amplias sin priorización", "Baja rotación de referencias asiáticas y europeas", "Falta de análisis de perfil de cliente turista", "Pérdida de control de inventario en establecimientos estacionales"], "city_name": "Gijón", "ticket_medio": "24-40€"}'::jsonb,
  '[{"q": "¿Qué vinos asturianos debo incluir obligatoriamente?", "a": "Los vinos de DO Cangas y Llaciana son emblemáticos. Complementa con references de Rías Baixas para atraer a turistas. Nuestro software te muestra qué vende mejor en tu tipo de establecimiento."}, {"q": "¿Cómo gestiono una carta para turistas?", "a": "Con nuestro análisis de perfil de cliente, identificamos automáticamente qué referencias compran turistas vs residentes, optimizando tu inversión en inventario."}, {"q": "¿Qué referencias nórdicas/europeas son rentables?", "a": "Según datos de la zona, vinos británicos, alemanes y portugueses tienen buena aceptación. Nuestro sistema las prioriza por margen."}]'::jsonb,
  '["software-carta-de-vinos-oviedo", "software-carta-de-vinos-santander"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-vitoria-gasteiz',
  'city',
  'es',
  'Software de Carta de Vinos en Vitoria-Gasteiz | Winerim',
  'Software especializado para cartas de vino en Vitoria-Gasteiz. Vinos Rioja Alavesa. Gestión inteligente. Incrementa beneficios +26%. Demo gratis.',
  'Vitoria-Gasteiz, España',
  'Software de carta de vinos para restaurantes en Vitoria-Gasteiz',
  'Domina la venta de Rioja Alavesa en el corazón del País Vasco',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Vitoria-Gasteiz es capital de Rioja Alavesa, con acceso privilegiado a algunos de los mejores caldos de la Rioja. La gestión sofisticada de cartas premium es fundamental para restaurantes de calidad en la ciudad. Nuestro software domina la especialidad local.", "stats": [{"label": "Incremento en ventas de vino", "value": "+26%"}, {"label": "Mejora del ticket medio", "value": "+23%"}, {"label": "Incremento en vinos premium", "value": "+42%"}], "country": "España", "features": [{"title": "Especialización Rioja Alavesa", "desc": "Base de datos de 500+ referencias de bodegas de Laguardia y alrededores"}, {"title": "Gestión de cartas premium", "desc": "Sistema especializado en vinos de alto valor con alertas de conservación"}, {"title": "Análisis de trazabilidad", "desc": "Control completo desde bodega hasta copa en tu establecimiento"}, {"title": "Recomendaciones por cosecha", "desc": "Sugerencias automáticas basadas en envejecimiento y madurez de vino"}], "problems": ["Gestión compleja de referencias premium de Rioja", "Falta de control en vinos de alto valor", "Desaprovechamiento de márgenes en vinos Alavesa", "Dificultad en seguimiento de bodegas locales", "Pérdida de clientes por recomendaciones ineficientes"], "city_name": "Vitoria-Gasteiz", "ticket_medio": "35-60€"}'::jsonb,
  '[{"q": "¿Qué bodegas de Laguardia son más rentables?", "a": "Según nuestro análisis, bodegas como López de Heredia y Marqués de Riscal generan mayores márgenes. Nuestro software identifica qué referencias específicas de cada bodega venden mejor en tu restaurante."}, {"q": "¿Cómo gestiono cartas de vino premium?", "a": "Con nuestro módulo de vinos de alto valor, tienes alertas de temperatura, control de botellas únicas y recomendaciones personalizadas por cliente."}, {"q": "¿Cómo sincronizo con bodegas de Rioja Alavesa?", "a": "Nos integramos directamente con distribuidores de Laguardia y la región para actualizaciones automáticas de disponibilidad."}]'::jsonb,
  '["software-carta-de-vinos-bilbao", "software-carta-de-vinos-logrono"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-oviedo',
  'city',
  'es',
  'Software de Carta de Vinos en Oviedo | Winerim',
  'Gestiona cartas de vino en Oviedo con software especializado. Vinos asturianos y de Castilla. Incrementa ventas +23%. Solicita demo ahora.',
  'Oviedo, España',
  'Software de carta de vinos para restaurantes en Oviedo',
  'Potencia tu negocio de vino con la tecnología más avanzada en Asturias',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Oviedo, capital histórica de Asturias, requiere sistemas avanzados de gestión de cartas de vino que combinen referencias locales y de otras regiones españolas. Nuestro software ayuda a bares, sidrería y restaurantes a optimizar sus ofertas enológicas.", "stats": [{"label": "Incremento en ventas de vino", "value": "+23%"}, {"label": "Mejora del ticket medio", "value": "+20%"}, {"label": "Integración con sidrerías", "value": "+50%"}], "country": "España", "features": [{"title": "Gestión combinada vino-sidra", "desc": "Sistema único para manejar cartas de vino y sidra asturiana"}, {"title": "Referencias asturianas y españolas", "desc": "Catálogo completo incluyendo DO Cangas, Llaciana y Riojas"}, {"title": "Análisis de margen por copa", "desc": "Optimización específica para sidra y vino por copa"}, {"title": "Perfil de cliente Oviedo", "desc": "Recomendaciones basadas en preferencias locales de turistas y residentes"}], "problems": ["Dificultad en gestión dual de vino y sidra", "Baja optimización de márgenes en bebidas", "Desconocimiento de referencias locales premium", "Cartas demasiado amplias sin estrategia", "Pérdida de rentabilidad en establecimientos estacionales"], "city_name": "Oviedo", "ticket_medio": "22-35€"}'::jsonb,
  '[{"q": "¿Cómo gestiono vino y sidra en la misma carta?", "a": "Nuestro software fue diseñado específicamente para la dualidad asturiana. Maneja ambas bebidas con análisis de margen, inventario y recomendaciones conjuntas."}, {"q": "¿Qué referencias de DO Cangas debo incluir?", "a": "Las referencias de DO Cangas de fácil venta son los blancos jóvenes. Nuestro sistema identifica cuáles tienen mejor margen en tu establecimiento específico."}, {"q": "¿Cómo atraigo a turistas a través de vino?", "a": "Con nuestro análisis de perfil de cliente, recomendamos referencias de Rías Baixas y Rioja que generan alto ticket medio entre turistas."}]'::jsonb,
  '["software-carta-de-vinos-gijon", "software-carta-de-vinos-leon"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-burgos',
  'city',
  'es',
  'Software de Carta de Vinos en Burgos | Winerim',
  'Software de gestión de cartas de vino en Burgos. Vinos Ribera del Duero a tu alcance. Mejora margen +25%. Prueba gratis tu demo.',
  'Burgos, España',
  'Software de carta de vinos para restaurantes en Burgos',
  'Optimiza la venta de Ribera del Duero en la puerta de Castilla y León',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Burgos es punto de entrada a Ribera del Duero, una de las denominaciones más prestigiosas de España. La gestión eficiente de estas referencias premium es clave para la rentabilidad de restaurantes de calidad en la ciudad. Nuestro software domina esta especialidad.", "stats": [{"label": "Incremento en ventas de vino", "value": "+25%"}, {"label": "Mejora del ticket medio", "value": "+22%"}, {"label": "Satisfacción de cliente", "value": "+36%"}], "country": "España", "features": [{"title": "Especialización Ribera del Duero", "desc": "Base de datos de 400+ referencias de bodegas de la denominación"}, {"title": "Gestión de vinos de guarda", "desc": "Sistema especializado en vinos envejecidos con alertas de madurez"}, {"title": "Análisis de bodega", "desc": "Seguimiento de referencias por bodega con recomendaciones de pairing"}, {"title": "Sincronización local", "desc": "Integración directa con distribuidores de Ribera del Duero"}], "problems": ["Desaprovechamiento de márgenes en vinos Ribera del Duero", "Falta de especialización en vinos de guarda", "Dificultad en gestión de referencias premium complejas", "Cartas mal estructuradas por cosecha y bodega", "Pérdida de clientes por recomendaciones ineficientes"], "city_name": "Burgos", "ticket_medio": "32-55€"}'::jsonb,
  '[{"q": "¿Qué bodegas de Ribera del Duero son más vendibles?", "a": "Bodegas como Vega Sicilia, Pesquera y Protos ofrecen excelente balance entre precio y aceptación. Nuestro software identifica qué referencias generan más margen en tu zona."}, {"q": "¿Cómo gestiono vinos envejecidos?", "a": "Con nuestro módulo de vinos de guarda, tienes alertas de madurez óptima, recomendaciones de momento de consumo y control de botellas especiales."}, {"q": "¿Qué referencias jóvenes debo incluir?", "a": "Los jóvenes de Ribera del Duero de 2019-2021 tienen buena aceptación y márgenes altos. Nuestro sistema te muestra cuáles venden mejor en tu público."}]'::jsonb,
  '["software-carta-de-vinos-valladolid", "software-carta-de-vinos-logrono", "software-carta-de-vinos-soria"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-jerez-de-la-frontera',
  'city',
  'es',
  'Software de Carta de Vinos en Jerez | Winerim',
  'Gestiona cartas de vino en Jerez. Vinos DO Jerez, Manzanilla y Palo Cortado. Software especializado. Incrementa ventas +27%. Demo gratis.',
  'Jerez de la Frontera, España',
  'Software de carta de vinos para restaurantes en Jerez',
  'Domina la venta de vinos Jerez y Manzanilla en la capital mundial del Jerez',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Jerez de la Frontera es capital mundial del vino generoso. La gestión compleja de tipos de vino (Fino, Amontillado, Oloroso, Palo Cortado) requiere especialización. Nuestro software es el aliado perfecto para bodegas, tabernas y restaurantes jerezanos.", "stats": [{"label": "Incremento en ventas de vino", "value": "+27%"}, {"label": "Mejora del ticket medio", "value": "+24%"}, {"label": "Optimización de generosos", "value": "+45%"}], "country": "España", "features": [{"title": "Especialización DO Jerez completa", "desc": "Catálogo de 300+ referencias clasificadas por tipo (Fino, Amontillado, etc.)"}, {"title": "Sistema de envejecimiento", "desc": "Seguimiento de botellas en solera y sus niveles de oxo-reducción"}, {"title": "Gestión por tipo de vino", "desc": "Análisis de margen diferenciado para cada categoría de generoso"}, {"title": "Pairing con gastronomía jerezana", "desc": "Recomendaciones automáticas para platos típicos locales"}], "problems": ["Complejidad de tipos de vino Jerez", "Baja optimización de márgenes en generosos", "Desconocimiento de diferencias entre categorías", "Cartas desorganizadas por tipo", "Pérdida de oportunidades de venta cruzada"], "city_name": "Jerez de la Frontera", "ticket_medio": "18-32€"}'::jsonb,
  '[{"q": "¿Cuál es el mejor Fino para vender en mi taberna?", "a": "Los Finos jóvenes con buen balance ácido-alcohólico venden mejor. Bodegas como Tío Pepe y González Byass tienen referencias con excelentes márgenes que nuestro sistema identifica."}, {"q": "¿Cómo diferencio Amontillado, Oloroso y Palo Cortado?", "a": "Nuestro software incluye guías de cata y diferenciación automática. El Amontillado es semifino, Oloroso es más oscuro y dulce, Palo Cortado es híbrido. Recomendamos cada uno según perfil de cliente."}, {"q": "¿Qué oportunidades hay en vino generoso?", "a": "Con nuestro análisis, identificamos referencias desaprovechadas con altos márgenes. Muchos Olorosos y Palo Cortados tienen margen 50%+ con buena aceptación local."}]'::jsonb,
  '["software-carta-de-vinos-cadiz", "software-carta-de-vinos-sevilla", "software-carta-de-vinos-huelva"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-tarragona',
  'city',
  'es',
  'Software de Carta de Vinos en Tarragona | Winerim',
  'Gestiona cartas de vino en Tarragona. DO Penedès, Tarragona y Priorat. Software especializado. Mejora beneficios +24%. Solicita demo ahora.',
  'Tarragona, España',
  'Software de carta de vinos para restaurantes en Tarragona',
  'Potencia tu negocio de vino con acceso a Penedès y Priorat en la costa dorada',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Tarragona es puerta a tres denominaciones de origen fundamentales: Penedès, Tarragona y Priorat. La proximidad a estas regiones vitivinícolas hace que la gestión estratégica de referencias sea clave para restaurantes costeros. Nuestro software optimiza esta oportunidad.", "stats": [{"label": "Incremento en ventas de vino", "value": "+24%"}, {"label": "Mejora del ticket medio", "value": "+19%"}, {"label": "Sincronización con bodegas", "value": "+38%"}], "country": "España", "features": [{"title": "Triple especialización DO", "desc": "Catálogo completo de Penedès, Tarragona y Priorat integrado"}, {"title": "Gestión de vinos costeros", "desc": "Optimización especial para cartas con marcado carácter turístico"}, {"title": "Análisis de origen DO", "desc": "Seguimiento de referencias por denominación con análisis de margen individual"}, {"title": "Integración con bodegas", "desc": "Conexión directa con distribuidores de las tres DOs catalanas"}], "problems": ["Confusión entre las tres denominaciones locales", "Baja optimización de referencias de Priorat", "Desaprovechamiento de márgenes en blanco de Penedès", "Cartas desorganizadas por origen", "Pérdida de clientes por recomendaciones ineficientes"], "city_name": "Tarragona", "ticket_medio": "26-44€"}'::jsonb,
  '[{"q": "¿Qué referencias de Penedès son más rentables?", "a": "Los blancos de Penedès (Xarel·lo, Macabeo) tienen excelente margen y aceptación. Nuestro software identifica cuáles venden mejor en restaurantes turísticos como los de Tarragona."}, {"q": "¿Cómo priorizo Priorat con su mayor precio?", "a": "Priorat es premium con márgenes altos pero menor volumen. Nuestro sistema recomienda referencias específicas para clientes con perfil de alto gasto."}, {"q": "¿Qué DO debo enfatizar en mi restaurante?", "a": "Según nuestro análisis de tu público, recomendamos la combinación que genera mayor ticket medio. En Tarragona, típicamente es Penedès blanco + Priorat tinto."}]'::jsonb,
  '["software-carta-de-vinos-barcelona", "software-carta-de-vinos-girona", "software-carta-de-vinos-lleida"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-logrono',
  'city',
  'es',
  'Software de Carta de Vinos en Logroño | Winerim',
  'Software especializado para cartas de vino en Logroño. Vinos DOCa Rioja. Incrementa ventas +28%. Gestión inteligente. Prueba gratis.',
  'Logroño, España',
  'Software de carta de vinos para restaurantes en Logroño',
  'Domina la venta de Rioja en el corazón de la denominación de origen más importante',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Logroño es capital de la DOCa Rioja, con acceso directo a las mejores bodegas y productores españoles. La gestión sofisticada de cartas premium es fundamental para restaurantes de calidad. Nuestro software domina completamente la especialidad riojana.", "stats": [{"label": "Incremento en ventas de vino", "value": "+28%"}, {"label": "Mejora del ticket medio", "value": "+25%"}, {"label": "Incremento en vinos premium", "value": "+48%"}], "country": "España", "features": [{"title": "Maestría DOCa Rioja", "desc": "Base de datos de 600+ referencias de todas las bodegas de Rioja"}, {"title": "Clasificación por calidad", "desc": "Sistema de análisis de Rioja Joven, Crianza, Reserva y Gran Reserva"}, {"title": "Gestión de vinos de guarda", "desc": "Especialización en vinos envejecidos con alertas de madurez y evolución"}, {"title": "Análisis por sub-zona", "desc": "Recomendaciones diferenciadas para Alavesa, Alta y Baja"}], "problems": ["Sobredimensionamiento de cartas sin estrategia", "Desaprovechamiento de márgenes en Rioja envejecido", "Desconocimiento de diferencias entre sub-zonas", "Falta de control en vinos de alto valor", "Cartas desestructuradas por cosecha y bodega"], "city_name": "Logroño", "ticket_medio": "30-55€"}'::jsonb,
  '[{"q": "¿Cuál es la estrategia de cartas en Logroño?", "a": "La base debe ser Rioja Joven y Crianza con buen margen, complementado con Referencias premium de Reserva y Gran Reserva. Nuestro software estructura automáticamente tu carta por este esquema rentable."}, {"q": "¿Qué bodegas priorizó?", "a": "Marqués de Murrieta, López de Heredia, CVNE y Marqués de Riscal ofrecen referencias con excelente balance precio-aceptación. Nuestro sistema identifica qué referencias específicas generan más margen en tu local."}, {"q": "¿Cómo aprovecho el envejecimiento en Rioja?", "a": "Nuestro módulo de vinos de guarda identifica automáticamente cuándo están en madurez óptima, recomendando venta a precio premium en el momento perfecto."}]'::jsonb,
  '["software-carta-de-vinos-vitoria-gasteiz", "software-carta-de-vinos-burgos", "software-carta-de-vinos-valladolid"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-leon',
  'city',
  'es',
  'Software de Carta de Vinos en León | Winerim',
  'Gestiona cartas de vino en León. DO Bierzo y referencias de Castilla. Software especializado. Incrementa margen +22%. Solicita demo.',
  'León, España',
  'Software de carta de vinos para restaurantes en León',
  'Optimiza la venta de Bierzo y vinos castellanos en el corazón de la ruta del Camino',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "León, ciudad histórica en la ruta del Camino de Santiago, requiere gestión sofisticada de cartas de vino que combinan DO Bierzo local con referencias castellanas. Nuestro software ayuda a tabernas, albergues y restaurantes a optimizar sus ofertas enológicas.", "stats": [{"label": "Incremento en ventas de vino", "value": "+22%"}, {"label": "Mejora del ticket medio", "value": "+18%"}, {"label": "Fidelización de peregrinos", "value": "+32%"}], "country": "España", "features": [{"title": "Especialización DO Bierzo", "desc": "Referencias completas de Bierzo, especialidad local con vinos de calidad"}, {"title": "Gestión para peregrinos", "desc": "Perfil de cliente específico para turistas del Camino de Santiago"}, {"title": "Integración de referencias regionales", "desc": "Catálogo de vinos castellanos, gallegos y de otras regiones complementarias"}, {"title": "Análisis de margen por cliente", "desc": "Recomendaciones basadas en perfil de gasto del peregrino/turista"}], "problems": ["Desconocimiento de DO Bierzo", "Cartas poco estratégicas para turismo de Camino", "Baja optimización de márgenes con clientes de paso", "Pérdida de oportunidades con grupo de peregrinos", "Falta de diferenciación con otros establecimientos de ruta"], "city_name": "León", "ticket_medio": "20-32€"}'::jsonb,
  '[{"q": "¿Qué referencias de Bierzo debo incluir?", "a": "Los Mencía de Bierzo son emblemáticos. Complementa con blancos locales. Nuestro software identifica cuáles tienen mejor margen y aceptación entre turistas del Camino."}, {"q": "¿Cómo maximizo venta a peregrinos?", "a": "Con nuestro análisis de perfil de cliente tipo peregrino, recomendamos vinos con buen balance precio-calidad que generan alto ticket medio en grupos."}, {"q": "¿Qué referencias de Castilla debo tener?", "a": "Complementa con vinos de Ribera del Duero (cercano) y Cigales para ofrecer variedad. Nuestro sistema prioriza referencias rentables de cada región."}]'::jsonb,
  '["software-carta-de-vinos-valladolid", "software-carta-de-vinos-oviedo", "software-carta-de-vinos-santiago-de-compostela"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-lleida',
  'city',
  'es',
  'Software de Carta de Vinos en Lleida | Winerim',
  'Software de gestión de cartas de vino en Lleida. Vinos Costers del Segre. Incrementa ventas +23%. Especialización local. Prueba gratis.',
  'Lleida, España',
  'Software de carta de vinos para restaurantes en Lleida',
  'Domina la venta de Costers del Segre en la Cataluña profunda',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Lleida ofrece acceso directo a DO Costers del Segre, una denominación de origen versátil con vinos de excelente relación calidad-precio. La gestión inteligente de estas referencias es clave para optimizar márgenes en restaurantes leridanos.", "stats": [{"label": "Incremento en ventas de vino", "value": "+23%"}, {"label": "Mejora del ticket medio", "value": "+19%"}, {"label": "Optimización de margen", "value": "+40%"}], "country": "España", "features": [{"title": "Especialización Costers del Segre", "desc": "Base de datos completa de referencias de DO local con buen balance precio"}, {"title": "Gestión de varietales diversas", "desc": "Sistema para manejar uvas autóctonas y internacionales de la región"}, {"title": "Análisis de valor precio-calidad", "desc": "Identificación de referencias con mejor ratio calidad/precio para márgenes"}, {"title": "Integración con bodegas locales", "desc": "Conexión directa con productores de Costers del Segre"}], "problems": ["Desconocimiento de DO Costers del Segre", "Cartas poco estratégicas sin priorización", "Baja optimización de márgenes", "Desaprovechamiento de relación precio-calidad", "Falta de integración con bodegas locales"], "city_name": "Lleida", "ticket_medio": "18-32€"}'::jsonb,
  '[{"q": "¿Qué referencias de Costers del Segre son más rentables?", "a": "Los vinos con buena relación precio-calidad generan mejor margen. Bodegas como Raimat y Castell del Remei ofrecen excelentes referencias. Nuestro software identifica cuáles venden mejor en tu zona."}, {"q": "¿Cómo diferencio Costers del Segre de Penedès?", "a": "Costers del Segre es más continental, con uvas autóctonas como Tempranillo y Cabernet. Penedès es más mediterráneo. Nuestro sistema recomienda cada uno según perfil de cliente."}, {"q": "¿Qué oportunidades hay en DO Costers del Segre?", "a": "Esta denominación está en crecimiento con excelentes valores emergentes. Identificamos referencias con alto potencial de margen que aún no satúran el mercado."}]'::jsonb,
  '["software-carta-de-vinos-tarragona", "software-carta-de-vinos-barcelona", "software-carta-de-vinos-girona"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-almeria',
  'city',
  'es',
  'Software de Carta de Vinos en Almería | Winerim',
  'Gestiona cartas de vino en Almería. DO Almería y referencias mediterráneas. Software especializado. Incrementa beneficios +21%. Demo gratis.',
  'Almería, España',
  'Software de carta de vinos para restaurantes en Almería',
  'Maximiza la venta de vinos locales y mediterráneos en la costa almeriense',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Almería es puerta a vinos locales y a referencias mediterráneas. La creciente industria turística costera requiere sistemas de gestión de cartas que optimicen margen. Nuestro software ayuda a restaurantes y chiringuitos almerienses a rentabilizar sus cartas.", "stats": [{"label": "Incremento en ventas de vino", "value": "+21%"}, {"label": "Mejora del ticket medio", "value": "+17%"}, {"label": "Satisfacción de cliente", "value": "+34%"}], "country": "España", "features": [{"title": "Especialización DO Almería", "desc": "Referencias locales de DO Almería y vinos cercanos de Málaga"}, {"title": "Gestión de cartas costeras", "desc": "Optimización especial para restaurantes y bars de playa"}, {"title": "Análisis de margen por tipología", "desc": "Diferenciación entre vino blanco (alta margen), tinto y rosado"}, {"title": "Recomendaciones por comida costera", "desc": "Pairing automático con platos de marisco y pescado"}], "problems": ["Desconocimiento de vinos locales de DO Almería", "Cartas poco estratégicas sin foco de margen", "Baja optimización de vinos blancos locales", "Desaprovechamiento de potencial turístico", "Falta de pairing con gastronomía costera"], "city_name": "Almería", "ticket_medio": "16-28€"}'::jsonb,
  '[{"q": "¿Qué referencias de DO Almería son más vendibles?", "a": "Los blancos secos locales tienen excelente margen y buena aceptación en contexto turístico. Nuestro software identifica cuáles venden mejor en tu tipo de establecimiento."}, {"q": "¿Cómo gestiono vinos para turistas de playa?", "a": "Con nuestro análisis de perfil de cliente turista, recomendamos vinos con buen balance precio-calidad, típicamente blancos frescos con margen 40%+."}, {"q": "¿Qué referencias complementarias debo incluir?", "a": "Recomendamos añadir algunos Riojas blancos y Albariños de Galicia para diversidad, manteniendo el foco en vino local para márgenes."}]'::jsonb,
  '["software-carta-de-vinos-malaga", "software-carta-de-vinos-huelva", "software-carta-de-vinos-murcia"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-huelva',
  'city',
  'es',
  'Software de Carta de Vinos en Huelva | Winerim',
  'Software especializado para cartas de vino en Huelva. Vinos andaluces y portugueses. Incrementa ventas +20%. Gestión inteligente. Solicita demo.',
  'Huelva, España',
  'Software de carta de vinos para restaurantes en Huelva',
  'Potencia tu negocio con acceso a vinos andaluces y referencias portuguesas de frontera',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Huelva, frontera entre España y Portugal, disfruta de acceso privilegiado a vinos andaluces y referencias portuguesas. La gestión estratégica de esta dualidad es fundamental para restaurantes y bars fronterizos. Nuestro software optimiza esta oportunidad geográfica única.", "stats": [{"label": "Incremento en ventas de vino", "value": "+20%"}, {"label": "Mejora del ticket medio", "value": "+16%"}, {"label": "Integración fronteriza", "value": "+44%"}], "country": "España", "features": [{"title": "Dualidad España-Portugal", "desc": "Catálogo integrado de vinos andaluces y portugueses de frontera"}, {"title": "Especialización en generosos", "desc": "Referencias de Jerez cercano y vinos de Douro portugués"}, {"title": "Gestión de precios fronterizos", "desc": "Sistema de análisis de margen diferenciado por origen"}, {"title": "Pairing con gastronomía fronteriza", "desc": "Recomendaciones para platos españoles y portugueses"}], "problems": ["Desconocimiento de vinos portugueses cercanos", "Cartas desorganizadas por origen", "Baja optimización de márgenes en references fronterizas", "Desaprovechamiento de oportunidad geográfica", "Falta de diferenciación con competidores"], "city_name": "Huelva", "ticket_medio": "18-30€"}'::jsonb,
  '[{"q": "¿Qué vinos portugueses son más rentables?", "a": "Los vinos de Douro portugués (Duero portugués) con excelente relación precio-calidad generan altos márgenes. Nuestro software identifica referencias específicas con mejor venta en tu zona fronteriza."}, {"q": "¿Cómo aprovecho la proximidad a Jerez?", "a": "Incluye Jerez como categoría diferenciada con margen alto. Nuestro sistema recomienda referencias específicas de generosos con buena aceptación local."}, {"q": "¿Qué oportunidades hay en frontera?", "a": "Muchos clientes portugueses compran en Huelva. Ofrecemos vinos españoles a portugueses (margen alto) y referencias portuguesas a españoles, optimizando cada transacción."}]'::jsonb,
  '["software-carta-de-vinos-jerez-de-la-frontera", "software-carta-de-vinos-sevilla", "software-carta-de-vinos-cadiz"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-badajoz',
  'city',
  'es',
  'Software de Carta de Vinos en Badajoz | Winerim',
  'Gestiona cartas de vino en Badajoz. DO Ribera del Guadiana y referencias extremeñas. Software especializado. Mejora beneficios +19%. Demo gratis.',
  'Badajoz, España',
  'Software de carta de vinos para restaurantes en Badajoz',
  'Domina la venta de vinos extremeños en la frontera con Portugal',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Badajoz, en la frontera con Portugal, ofrece acceso a vinos DO Ribera del Guadiana, una denominación en crecimiento con excelentes valores. La gestión inteligente de estas referencias es clave para restaurantes badajocenses.", "stats": [{"label": "Incremento en ventas de vino", "value": "+19%"}, {"label": "Mejora del ticket medio", "value": "+15%"}, {"label": "Identificación de joyas ocultas", "value": "+33%"}], "country": "España", "features": [{"title": "Especialización Ribera del Guadiana", "desc": "Referencias completas de DO local con vinos de calidad emergente"}, {"title": "Gestión de vinos emergentes", "desc": "Sistema para identificar y promocionar nuevas bodegas con alto potencial"}, {"title": "Análisis de valor de mercado", "desc": "Identificación de referencias con bajo precio pero alta calidad"}, {"title": "Integración fronteriza", "desc": "Catálogo complementario de vinos portugueses de Alentejo"}], "problems": ["Desconocimiento de DO Ribera del Guadiana", "Cartas poco estratégicas sin foco", "Desaprovechamiento de vinos emergentes de calidad", "Baja optimización de márgenes", "Falta de diferenciación local"], "city_name": "Badajoz", "ticket_medio": "15-26€"}'::jsonb,
  '[{"q": "¿Qué bodegas de Ribera del Guadiana debo incluir?", "a": "Bodegas como Bodega de Medina y otras referencias emergentes ofrecen excelente relación precio-calidad. Nuestro software identifica cuáles tienen más potencial de margen en Badajoz."}, {"q": "¿Cómo identifico joyas ocultas de vino?", "a": "Con nuestro análisis de mercado, identificamos referencias que todavía no saturan el mercado local pero tienen buen potencial. Esto genera márgenes muy altos."}, {"q": "¿Debo incluir vinos portugueses?", "a": "Sí, complementa con algunos Alentejo portugueses cercanos. Nuestro sistema recomienda referencias específicas con buen balance precio-aceptación."}]'::jsonb,
  '["software-carta-de-vinos-caceres", "software-carta-de-vinos-merida"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-segovia',
  'city',
  'es',
  'Software de Carta de Vinos en Segovia | Winerim',
  'Software de gestión de cartas de vino en Segovia. Vinos Ribera del Duero y referencias castellanas. Incrementa margen +23%. Solicita demo.',
  'Segovia, España',
  'Software de carta de vinos para restaurantes en Segovia',
  'Optimiza la venta de vinos de Castilla en la ciudad del Acueducto',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Segovia, ciudad de patrimonio mundial, requiere cartas de vino sofisticadas que combinen referencias de Ribera del Duero cercana con selectas españolas. La gestión premium es fundamental para el turismo de calidad que visita la ciudad.", "stats": [{"label": "Incremento en ventas de vino", "value": "+23%"}, {"label": "Mejora del ticket medio", "value": "+21%"}, {"label": "Satisfacción de turista", "value": "+39%"}], "country": "España", "features": [{"title": "Acceso a Ribera del Duero", "desc": "Referencias premium de denominación cercana con márgenes altos"}, {"title": "Cartas de patrimonio", "desc": "Especialización en cartas para restaurantes con perfil turístico premium"}, {"title": "Análisis de cliente turista", "desc": "Recomendaciones basadas en perfil gastronómico del turismo segoviano"}, {"title": "Gestión de vinos premium", "desc": "Sistema especializado en referencias de alto valor y margen"}], "problems": ["Desaprovechamiento de potencial premium del turismo", "Cartas poco diferenciadas vs competencia", "Baja optimización de márgenes con clientes internacionales", "Desconocimiento de preferencias de turista gastronómico", "Pérdida de oportunidades en ticket medio"], "city_name": "Segovia", "ticket_medio": "35-60€"}'::jsonb,
  '[{"q": "¿Qué referencias de Ribera del Duero debo priorizar?", "a": "Ribera del Duero premium como Vega Sicilia, Pesquera y Protos generan margen muy alto con turistas. Nuestro software identifica referencias específicas con mejor aceptación."}, {"q": "¿Cómo optimizo precio con turista premium?", "a": "Con nuestro análisis de perfil de cliente turista gastronómico, recomendamos vinos con margen 50%+ que generan alto ticket medio sin fricción de precio."}, {"q": "¿Qué estructura de carta recomiendan?", "a": "Base de Ribera del Duero Crianza/Reserva + selección de Riojas premium + pequeña sección de referencias internacionales. Nuestro software estructura esto automáticamente."}]'::jsonb,
  '["software-carta-de-vinos-valladolid", "software-carta-de-vinos-toledo", "software-carta-de-vinos-avila"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-avila',
  'city',
  'es',
  'Software de Carta de Vinos en Ávila | Winerim',
  'Gestiona cartas de vino en Ávila. DO Ribera del Duero y referencias de Castilla. Software especializado. Incrementa ventas +20%. Demo gratis.',
  'Ávila, España',
  'Software de carta de vinos para restaurantes en Ávila',
  'Potencia tu negocio de vino con acceso a Ribera del Duero en la ciudad amurallada',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Ávila, ciudad amurallada patrimonio mundial, requiere cartas de vino estratégicas con Ribera del Duero de proximidad. El turismo de calidad y la gastronomía local demandan gestión sofisticada de referencias. Nuestro software optimiza esta oportunidad.", "stats": [{"label": "Incremento en ventas de vino", "value": "+20%"}, {"label": "Mejora del ticket medio", "value": "+18%"}, {"label": "Rotación de inventario", "value": "+37%"}], "country": "España", "features": [{"title": "Proximidad a Ribera del Duero", "desc": "Referencias fácil acceso a vinos premium de denominación cercana"}, {"title": "Gestión para turismo cultural", "desc": "Cartas especializadas para visitantes de patrimonio mundial"}, {"title": "Análisis de gastronomía local", "desc": "Pairing con platos típicos abulenses y de la zona"}, {"title": "Optimización de cartas pequeñas", "desc": "Sistema especial para restaurantes con cartas más compactas"}], "problems": ["Baja optimización de referencias Ribera del Duero", "Cartas poco diferenciadas", "Desconocimiento de pairing local", "Desaprovechamiento del potencial turístico", "Bajo ticket medio en bebidas"], "city_name": "Ávila", "ticket_medio": "24-40€"}'::jsonb,
  '[{"q": "¿Qué referencias de Ribiera del Duero son más accesibles?", "a": "Ribera del Duero Crianza ofrece buena relación precio-margen. Bodegas como Emilio Moro y Dominio de Atauta son excelentes. Nuestro software identifica cuáles venden mejor en tu zona."}, {"q": "¿Cómo armonizo con gastronomía abulense?", "a": "Los platos de cordero abulense combinan bien con Ribera Crianza/Reserva. Nuestro sistema recomienda referencias específicas por plato con márgenes optimizados."}, {"q": "¿Qué estrategia para carta pequeña?", "a": "Con cartas compactas, enfatiza Ribera premium con alto margen. Nuestro software selecciona 8-10 referencias de máxima rentabilidad para espacio limitado."}]'::jsonb,
  '["software-carta-de-vinos-segovia", "software-carta-de-vinos-toledo", "software-carta-de-vinos-valladolid"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-soria',
  'city',
  'es',
  'Software de Carta de Vinos en Soria | Winerim',
  'Software especializado para cartas de vino en Soria. Vinos DO Ribera del Duero. Incrementa beneficios +18%. Gestión inteligente. Solicita demo.',
  'Soria, España',
  'Software de carta de vinos para restaurantes en Soria',
  'Domina la venta de vinos en la provincia de los duros y los aires limpios',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Soria, tierra de vinos y tradición castellana, ofrece oportunidades únicas con Ribera del Duero de proximidad. La gestión especializada de referencias locales es clave para restaurantes y bodegas soriana. Nuestro software domina esta oportunidad.", "stats": [{"label": "Incremento en ventas de vino", "value": "+18%"}, {"label": "Mejora del ticket medio", "value": "+16%"}, {"label": "Optimización de costos", "value": "+30%"}], "country": "España", "features": [{"title": "Acceso a Ribera del Duero", "desc": "Proximidad y especializacion en referencias de denominación cercana"}, {"title": "Gestión de pequeños establecimientos", "desc": "Sistema optimizado para bodegas y tabernas de tamaño pequeño-medio"}, {"title": "Integración con productores locales", "desc": "Conexión directa con pequeñas bodegas de la zona de Soria"}, {"title": "Análisis de costo muy eficiente", "desc": "Optimización de márgenes en compras de proximidad"}], "problems": ["Cartas poco estratégicas sin foco", "Baja optimización de márgenes", "Desconocimiento de referencias locales de calidad", "Falta de integración con bodegas soriana", "Pérdida de oportunidades por tamaño pequeño de negocio"], "city_name": "Soria", "ticket_medio": "18-30€"}'::jsonb,
  '[{"q": "¿Qué referencias cercanas de Ribiera del Duero son mejores?", "a": "Los pequeños productores de Ribiera del Duero cercanos a Soria ofrecen excelente relación precio-calidad. Nuestro software identifica cuáles venden mejor y tienen márgenes más altos."}, {"q": "¿Cómo optimizo como bodega pequeña?", "a": "Con nuestro módulo de pequeños negocios, enfatizamos 5-6 referencias de máximo margen con bajo costo de inventario, perfecta para espacios compactos."}, {"q": "¿Puedo integrarme con productores locales?", "a": "Sí, nuestro sistema incluye conexión directa con pequeños productores locales para oferta fresca y márgenes superiores. Ideal para bodegas sorianas."}]'::jsonb,
  '["software-carta-de-vinos-burgos", "software-carta-de-vinos-valladolid", "software-carta-de-vinos-logrono"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-teruel',
  'city',
  'es',
  'Software de Carta de Vinos en Teruel | Winerim',
  'Gestiona cartas de vino en Teruel. DO Denominación de Origen Teruel. Software especializado. Incrementa margen +17%. Solicita demo gratis.',
  'Teruel, España',
  'Software de carta de vinos para restaurantes en Teruel',
  'Maximiza la venta de vinos de Teruel en la provincia de las tres culturas',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Teruel, provincia histórica de España, ofrece oportunidades de vino local con denominación propia. La gestión estratégica de referencias locales emergentes es fundamental para diferenciarse en el mercado turolense.", "stats": [{"label": "Incremento en ventas de vino", "value": "+17%"}, {"label": "Mejora del ticket medio", "value": "+14%"}, {"label": "Identificación de joyas locales", "value": "+28%"}], "country": "España", "features": [{"title": "Especialización DO Teruel", "desc": "Referencias completas de denominación local con vinos de calidad emergente"}, {"title": "Gestión de vinos emergentes", "desc": "Sistema para identificar y promocionar nuevas bodegas locales"}, {"title": "Análisis de mercado local", "desc": "Identificación de referencias con bajo precio pero alto potencial"}, {"title": "Pairing con gastronomía turolense", "desc": "Recomendaciones para jamón, ternasco y platos tradicionales"}], "problems": ["Desconocimiento de vinos locales DO Teruel", "Cartas poco diferenciadas", "Baja optimización de márgenes", "Desaprovechamiento de vinos emergentes", "Falta de pairing local"], "city_name": "Teruel", "ticket_medio": "14-24€"}'::jsonb,
  '[{"q": "¿Qué bodegas de DO Teruel son más vendibles?", "a": "Las referencias locales con buen balance precio-calidad venden mejor. Nuestro software identifica cuáles tienen potencial de margen en tu zona de Teruel."}, {"q": "¿Cómo armonizo con jamón y ternasco?", "a": "Los vinos tintos locales de Teruel combinan perfectamente con jamón y ternasco. Nuestro sistema recomienda referencias específicas por plato con márgenes optimizados."}, {"q": "¿Debo priorizar local o incluir otros DOs?", "a": "Prioriza local para diferenciar. Nuestro análisis muestra que clientes locales compran vino de Teruel cuando lo ven en carta, generando margen muy alto."}]'::jsonb,
  '["software-carta-de-vinos-cuenca", "software-carta-de-vinos-valladolid"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-cuenca',
  'city',
  'es',
  'Software de Carta de Vinos en Cuenca | Winerim',
  'Software de gestión de cartas de vino en Cuenca. Vinos de Castilla y referencias españolas. Incrementa ventas +19%. Prueba gratis hoy.',
  'Cuenca, España',
  'Software de carta de vinos para restaurantes en Cuenca',
  'Optimiza la venta de vino en la ciudad de casas colgadas',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Cuenca, ciudad patrimonio mundial de arquitectura única, requiere cartas de vino sofisticadas para su turismo de calidad. La gestión inteligente de referencias es fundamental para restaurantes con perfil premium en esta ciudad singular.", "stats": [{"label": "Incremento en ventas de vino", "value": "+19%"}, {"label": "Mejora del ticket medio", "value": "+17%"}, {"label": "Satisfacción de turista", "value": "+36%"}], "country": "España", "features": [{"title": "Cartas para patrimonio", "desc": "Especialización en cartas para restaurantes con perfil turístico cultural"}, {"title": "Análisis de cliente turista", "desc": "Recomendaciones basadas en perfil del visitante de casas colgadas"}, {"title": "Gestión de referencias españolas", "desc": "Catálogo curado de vinos españoles premium con buena aceptación turística"}, {"title": "Optimización de ticket medio", "desc": "Sistema enfocado en maximizar gasto de cliente gastronómico"}], "problems": ["Cartas poco diferenciadas para patrimonio", "Desaprovechamiento de potencial turístico", "Baja optimización de márgenes con turismo", "Desconocimiento de preferencias de turista", "Pérdida de oportunidades en bebidas"], "city_name": "Cuenca", "ticket_medio": "30-50€"}'::jsonb,
  '[{"q": "¿Qué tipo de carta funciona para casas colgadas?", "a": "Cartas con vinos españoles premium de diferentes regiones. Turistas aprecian variedad y calidad. Nuestro software selecciona referencias que generan alto margen con buena aceptación."}, {"q": "¿Cómo maximizo ticket medio?", "a": "Con análisis de perfil de cliente turista gastronómico, recomendamos vinos con margen 45%+ que se venden sin fricción de precio en Cuenca."}, {"q": "¿Qué estructura de carta recomienda?", "a": "Pequeña selección de Riojas premium, Ribiera del Duero, Penedès y referencias internacionales. Nuestro software estructura esto para máxima rentabilidad."}]'::jsonb,
  '["software-carta-de-vinos-toledo", "software-carta-de-vinos-teruel", "software-carta-de-vinos-segovia"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-ciudad-real',
  'city',
  'es',
  'Software de Carta de Vinos en Ciudad Real | Winerim',
  'Gestiona cartas de vino en Ciudad Real. Vinos de La Mancha e ibéricos. Software especializado. Incrementa beneficios +20%. Demo gratis.',
  'Ciudad Real, España',
  'Software de carta de vinos para restaurantes en Ciudad Real',
  'Potencia la venta de vinos de La Mancha en el corazón de Castilla',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Ciudad Real, en el corazón de La Mancha, ofrece acceso privilegiado a los vinos de DO La Mancha. La gestión estratégica de estas referencias con excelente relación precio-calidad es clave para la rentabilidad local.", "stats": [{"label": "Incremento en ventas de vino", "value": "+20%"}, {"label": "Mejora del ticket medio", "value": "+17%"}, {"label": "Optimización de margen", "value": "+38%"}], "country": "España", "features": [{"title": "Especialización DO La Mancha", "desc": "Base de datos completa de referencias de mayor denominación de Europa"}, {"title": "Gestión de vinos de valor", "desc": "Sistema enfocado en excelente relación precio-calidad"}, {"title": "Análisis de margen eficiente", "desc": "Identificación de márgenes altos con bajo costo de compra"}, {"title": "Integración con bodegas manchegas", "desc": "Conexión directa con productores locales de La Mancha"}], "problems": ["Desconocimiento de vinos premium de La Mancha", "Cartas poco estratégicas sin priorización", "Baja optimización de márgenes", "Desaprovechamiento de relación precio-calidad", "Falta de diferenciación vs competencia"], "city_name": "Ciudad Real", "ticket_medio": "16-28€"}'::jsonb,
  '[{"q": "¿Qué referencias de La Mancha debo priorizar?", "a": "Los vinos con mejor balance precio-calidad de La Mancha venden bien. Bodegas consolidadas ofrecen referencias con margen excelente. Nuestro software identifica cuáles en tu zona específica."}, {"q": "¿Cómo diferencio La Mancha en mi carta?", "a": "Enfatiza vinos locales con excelente relación precio-calidad. Clientes manchegos compran vino local cuando lo ven. Nuestro sistema genera márgenes muy altos en esto."}, {"q": "¿Hay oportunidades en vinos emergentes?", "a": "Nuevas bodegas de La Mancha ofrecen calidad creciente con precios aún bajos. Identificamos estas joyas con márgenes superiores antes de saturación."}]'::jsonb,
  '["software-carta-de-vinos-toledo", "software-carta-de-vinos-cuenca"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-caceres',
  'city',
  'es',
  'Software de Carta de Vinos en Cáceres | Winerim',
  'Software especializado para cartas de vino en Cáceres. DO Ribera del Guadiana. Incrementa margen +21%. Gestión inteligente. Solicita demo.',
  'Cáceres, España',
  'Software de carta de vinos para restaurantes en Cáceres',
  'Domina la venta de vinos en la ciudad monumental de Extremadura',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Cáceres, ciudad patrimonio mundial, requiere cartas de vino sofisticadas con referencias locales de DO Ribiera del Guadiana. La gestión estratégica es fundamental para restaurantes con perfil cultural y gastronómico en esta ciudad singular.", "stats": [{"label": "Incremento en ventas de vino", "value": "+21%"}, {"label": "Mejora del ticket medio", "value": "+18%"}, {"label": "Satisfacción de turista", "value": "+35%"}], "country": "España", "features": [{"title": "Cartas para patrimonio", "desc": "Especialización en cartas para restaurantes con perfil cultural"}, {"title": "Especialización Ribiera del Guadiana", "desc": "Referencias locales y emergentes de denominación extremeña"}, {"title": "Gestión de gastronomía local", "desc": "Pairing con jamón ibérico y platos típicos cacereños"}, {"title": "Análisis de cliente turista", "desc": "Recomendaciones basadas en perfil visitante de patrimonio"}], "problems": ["Cartas poco diferenciadas para patrimonio", "Desconocimiento de vinos locales de calidad", "Baja optimización de márgenes", "Desaprovechamiento de potencial turístico", "Falta de pairing con gastronomía local"], "city_name": "Cáceres", "ticket_medio": "22-38€"}'::jsonb,
  '[{"q": "¿Qué estructura de carta recomienda para Cáceres?", "a": "Base de Ribeira del Guadiana local, complementado con Jerez cercano. Turistas aprecian vino local y referencias españolas conocidas. Nuestro software estructura esto para máxima rentabilidad."}, {"q": "¿Cómo maximizo con turismo?", "a": "Con análisis de perfil de turista de patrimonio, recomendamos vinos con margen 40%+ que se venden sin fricción en Cáceres."}, {"q": "¿Qué pairing con jamón ibérico?", "a": "Los vinos tintos de Ribeira del Guadiana combinan perfectamente con jamón. Nuestro sistema recomienda referencias específicas que generan alto ticket medio."}]'::jsonb,
  '["software-carta-de-vinos-badajoz", "software-carta-de-vinos-merida"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-pontevedra',
  'city',
  'es',
  'Software de Carta de Vinos en Pontevedra | Winerim',
  'Gestiona cartas de vino en Pontevedra. Vinos Rías Baixas especializados. Software de gestión avanzado. Incrementa ventas +22%. Demo gratis.',
  'Pontevedra, España',
  'Software de carta de vinos para restaurantes en Pontevedra',
  'Maximiza la venta de Rías Baixas en la capital histórica de la ría',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Pontevedra, capital histórica de Galicia, ofrece oportunidades únicas con acceso directo a Rías Baixas. La gestión sofisticada de estos vinos blancos es fundamental para restaurantes y marisquerías pontevedresas.", "stats": [{"label": "Incremento en ventas de vino", "value": "+22%"}, {"label": "Mejora del ticket medio", "value": "+19%"}, {"label": "Armonización marisco-vino", "value": "+41%"}], "country": "España", "features": [{"title": "Maestría Rías Baixas", "desc": "Especialización completa en Albariño, Treixadura y otras varietales locales"}, {"title": "Pairing marisco perfecto", "desc": "Recomendaciones automáticas de vino para cada tipo de marisco"}, {"title": "Gestión de references premium", "desc": "Sistema especializado en Albariños premium con márgenes altos"}, {"title": "Integración con bodegas de ría", "desc": "Conexión directa con productores de Rías Baixas cercanos"}], "problems": ["Subutilización de Rías Baixas premium", "Baja armonización marisco-vino", "Desaprovechamiento de márgenes en blanco", "Cartas desorganizadas por varietal", "Pérdida de oportunidades de venta cruzada"], "city_name": "Pontevedra", "ticket_medio": "26-42€"}'::jsonb,
  '[{"q": "¿Qué Albariño debo priorizar en marisquería?", "a": "Los Albariños premium (Martín Códax, Pazo de Señoans) generan margen alto. Nuestro software identifica cuáles venden mejor con marisco en tu establecimiento."}, {"q": "¿Cómo armonizo perfectamente marisco y vino?", "a": "Con nuestro módulo de pairing automático, identificamos qué Albariño va mejor con cada tipo de marisco (ostras, percebes, bogavante, etc.) para máxima satisfacción."}, {"q": "¿Qué referencias blancas complementarias incluir?", "a": "Pequeña sección de Godello de Valdeorras complementa bien. Nuestro sistema equilibra Rías Baixas (volumen/margen) con otras GAs complementarias."}]'::jsonb,
  '["software-carta-de-vinos-vigo", "software-carta-de-vinos-santiago-de-compostela", "software-carta-de-vinos-ourense"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-ourense',
  'city',
  'es',
  'Software de Carta de Vinos en Ourense | Winerim',
  'Software especializado para cartas de vino en Ourense. Vinos gallegos diversos. Incrementa beneficios +19%. Gestión inteligente. Solicita demo.',
  'Ourense, España',
  'Software de carta de vinos para restaurantes en Ourense',
  'Potencia la venta de vinos gallegos en la ciudad de las aguas termales',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Ourense, tierra de vinos gallegos diversos, requiere sistema sofisticado para gestionar la variedad local: Albariño, Godello, Mencía y otros. La gestión inteligente de estas referencias es fundamental para restaurantes ourensanos.", "stats": [{"label": "Incremento en ventas de vino", "value": "+19%"}, {"label": "Mejora del ticket medio", "value": "+16%"}, {"label": "Satisfacción de cliente local", "value": "+33%"}], "country": "España", "features": [{"title": "Diversidad vinos gallegos", "desc": "Catálogo completo de Albariño, Godello, Mencía, Loureira y más"}, {"title": "Especialización por varietal", "desc": "Análisis de margen diferenciado por tipo de vino gallego"}, {"title": "Pairing con gastronomía local", "desc": "Recomendaciones para platos típicos ourensanos y gallegos"}, {"title": "Integración con bodegas gallegas", "desc": "Conexión directa con productores locales de Ourense"}], "problems": ["Desconocimiento de variedad vinos gallegos", "Cartas poco estratégicas sin foco", "Baja optimización de márgenes", "Desaprovechamiento de vinos locales", "Falta de diferenciación vs competencia"], "city_name": "Ourense", "ticket_medio": "20-32€"}'::jsonb,
  '[{"q": "¿Qué varietal de Ourense debo enfatizar?", "a": "El Godello es emblemático de Ourense. Complementa con Albariño de cercano y Mencía local. Nuestro software identifica cuáles tienen mejor margen en tu negocio."}, {"q": "¿Cómo gestiono la diversidad gallega?", "a": "Con nuestro sistema de análisis por varietal, gestionamos 5-6 referencias clave de cada tipo con márgenes optimizados para espacio eficiente."}, {"q": "¿Qué oportunidades hay locales?", "a": "Clientes locales compran vino gallego cuando aparece en carta. Nuestro análisis muestra márgenes muy altos en esto, especialmente con Godello."}]'::jsonb,
  '["software-carta-de-vinos-lugo", "software-carta-de-vinos-pontevedra", "software-carta-de-vinos-vigo"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-lugo',
  'city',
  'es',
  'Software de Carta de Vinos en Lugo | Winerim',
  'Gestiona cartas de vino en Lugo. Vinos Ribeira Sacra y gallegos. Software especializado. Incrementa ventas +18%. Solicita demo ahora.',
  'Lugo, España',
  'Software de carta de vinos para restaurantes en Lugo',
  'Domina la venta de vinos gallegos en la ciudad amurallada de Lugo',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Lugo, ciudad patrimonio mundial amurallada, ofrece acceso a vinos de Ribeira Sacra y referencias gallegas diversas. La gestión estratégica es fundamental para restaurantes con perfil cultural y gastronómico en esta ciudad singular.", "stats": [{"label": "Incremento en ventas de vino", "value": "+18%"}, {"label": "Mejora del ticket medio", "value": "+15%"}, {"label": "Satisfacción de turista", "value": "+31%"}], "country": "España", "features": [{"title": "Especialización Ribeira Sacra", "desc": "Referencias completas de denominación con vinos de calidad emergente"}, {"title": "Cartas para patrimonio", "desc": "Especialización en cartas para ciudad amurallada de turismo cultural"}, {"title": "Gestión de Mencía local", "desc": "Sistema especializado en Mencía de Ribeira Sacra premium"}, {"title": "Pairing con gastronomía lucense", "desc": "Recomendaciones para marisco de río y platos típicos"}], "problems": ["Desconocimiento de Ribeira Sacra", "Cartas poco diferenciadas para patrimonio", "Baja optimización de márgenes", "Desaprovechamiento de turismo", "Falta de pairing local"], "city_name": "Lugo", "ticket_medio": "24-38€"}'::jsonb,
  '[{"q": "¿Qué referencias de Ribeira Sacra son mejores?", "a": "Los Mencías premium de Ribeira Sacra ofrecen excelente calidad-precio. Nuestro software identifica referencias emergentes con potencial de margen muy alto."}, {"q": "¿Cómo gestiono turismo de Lugo?", "a": "Con análisis de turista de patrimonio, recomendamos vinos con margen 40%+ que se venden sin fricción en ciudad amurallada."}, {"q": "¿Qué estructura de carta para pequeño restaurante?", "a": "Base de Ribeira Sacra local complementado con Rías Baixas blanco. Nuestro software estructuran esto para máxima rentabilidad en espacio pequeño."}]'::jsonb,
  '["software-carta-de-vinos-ourense", "software-carta-de-vinos-santiago-de-compostela"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-santiago-de-compostela',
  'city',
  'es',
  'Software de Carta de Vinos en Santiago de Compostela | Winerim',
  'Software especializado para cartas de vino en Santiago. Vinos gallegos y del Camino. Incrementa beneficios +24%. Gestión inteligente. Prueba gratis.',
  'Santiago de Compostela, España',
  'Software de carta de vinos para restaurantes en Santiago de Compostela',
  'Potencia tu negocio enológico en la meta del Camino de Santiago',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Santiago de Compostela, meta del Camino de Santiago y ciudad patrimonio mundial, requiere cartas de vino sofisticadas para turismo cultural y gastrónomico. La gestión inteligente de referencias gallegas es fundamental para restaurantes compostelanos.", "stats": [{"label": "Incremento en ventas de vino", "value": "+24%"}, {"label": "Mejora del ticket medio", "value": "+21%"}, {"label": "Fidelización de peregrinos", "value": "+45%"}], "country": "España", "features": [{"title": "Especialización vinos gallegos", "desc": "Catálogo completo de Rías Baixas, Albariño, Godello y Mencía"}, {"title": "Cartas para Camino de Santiago", "desc": "Especialización en perfiles de cliente peregrino y turista cultural"}, {"title": "Análisis de cliente turista premium", "desc": "Recomendaciones basadas en perfil gastronómico de visitante"}, {"title": "Maximización de ticket medio", "desc": "Sistema enfocado en incrementar gasto en vino por cliente"}], "problems": ["Desaprovechamiento de potencial turístico premium", "Cartas poco diferenciadas", "Baja optimización de márgenes con clientes de paso", "Desconocimiento de preferencias del turista", "Pérdida de oportunidades en bebidas"], "city_name": "Santiago de Compostela", "ticket_medio": "28-45€"}'::jsonb,
  '[{"q": "¿Qué estructura de carta para Camino?", "a": "Base de Rías Baixas (Albariño) + Ribeira Sacra (Mencía) + pequeña sección premium. Peregrinos aprecian vinos gallegos authenticos. Nuestro software estructura esto para margen máximo."}, {"q": "¿Cómo maximizo venta a peregrinos?", "a": "Con análisis de perfil peregrino, recomendamos vinos con buen balance precio-calidad que generan alto ticket medio en grupos. Margen 35%+ típico."}, {"q": "¿Hay oportunidades premium?", "a": "Sí, muchos peregrinos tienen alto gasto en vino al llegar a meta. Nuestro sistema recomienda referencias premium con margen 45%+ sin fricción de precio."}]'::jsonb,
  '["software-carta-de-vinos-lugo", "software-carta-de-vinos-ourense", "software-carta-de-vinos-pontevedra"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-ronda',
  'city',
  'es',
  'Software de Carta de Vinos en Ronda | Winerim',
  'Gestiona cartas de vino en Ronda. Vinos DO Serranía de Ronda. Software especializado. Incrementa margen +23%. Solicita demo gratis hoy.',
  'Ronda, España',
  'Software de carta de vinos para restaurantes en Ronda',
  'Domina la venta de vinos en la ciudad de las corridas de toros y el acantilado',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Ronda, ciudad emblemática de Andalucía con patrimonio único, ofrece acceso a DO Serranía de Ronda. La gestión sofisticada de estas referencias es fundamental para restaurantes con perfil turístico premium en esta ciudad singular.", "stats": [{"label": "Incremento en ventas de vino", "value": "+23%"}, {"label": "Mejora del ticket medio", "value": "+20%"}, {"label": "Satisfacción de turista", "value": "+40%"}], "country": "España", "features": [{"title": "Especialización Serranía de Ronda", "desc": "Referencias locales de denominación con vinos de calidad diferenciada"}, {"title": "Cartas para patrimonio", "desc": "Especialización en cartas para ciudad de corridas y patrimonio turístico"}, {"title": "Gestión de vinos premium locales", "desc": "Sistema especializado en referencias de DO local de alto margen"}, {"title": "Análisis de cliente turista", "desc": "Recomendaciones basadas en perfil premium de visitante"}], "problems": ["Desconocimiento de DO Serranía de Ronda", "Cartas poco diferenciadas para patrimonio", "Baja optimización de márgenes", "Desaprovechamiento de potencial turístico premium", "Pérdida de oportunidades en vino local"], "city_name": "Ronda", "ticket_medio": "26-42€"}'::jsonb,
  '[{"q": "¿Qué referencias de Serranía de Ronda son mejores?", "a": "Los vinos de DO Serranía ofrecen calidad diferenciada con buenos márgenes. Nuestro software identifica referencias que generan mayor aceptación entre turistas de Ronda."}, {"q": "¿Cómo aprovecho el turismo premium?", "a": "Con análisis de turista de patrimonio, recomendamos referencias con margen 40%+ que se venden sin fricción en esta ciudad de lujo."}, {"q": "¿Qué estructura de carta recomienda?", "a": "Base de Serranía de Ronda complementada con Jerez cercano. Turistas aprecian vinos locales únicos. Nuestro software maximiza margen en esta mezcla."}]'::jsonb,
  '["software-carta-de-vinos-malaga", "software-carta-de-vinos-sevilla", "software-carta-de-vinos-cadiz"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-merida',
  'city',
  'es',
  'Software de Carta de Vinos en Mérida | Winerim',
  'Software especializado para cartas de vino en Mérida. Vinos extremeños y locales. Incrementa beneficios +22%. Gestión inteligente. Prueba gratis.',
  'Mérida, España',
  'Software de carta de vinos para restaurantes en Mérida',
  'Maximiza la venta de vinos en la ciudad romana de Mérida',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Mérida, ciudad romana patrimonio mundial, requiere cartas de vino sofisticadas con referencias locales extremeñas. La gestión estratégica es fundamental para restaurantes con perfil cultural y gastronómico en esta ciudad singular.", "stats": [{"label": "Incremento en ventas de vino", "value": "+22%"}, {"label": "Mejora del ticket medio", "value": "+19%"}, {"label": "Satisfacción de turista", "value": "+37%"}], "country": "España", "features": [{"title": "Cartas para patrimonio", "desc": "Especialización en cartas para ciudad romana de turismo cultural"}, {"title": "Especialización vinos extremeños", "desc": "Referencias locales de Ribeira del Guadiana y otras denominaciones"}, {"title": "Gestión de gastronomía local", "desc": "Pairing con jamón ibérico y platos típicos extremeños"}, {"title": "Análisis de cliente turista", "desc": "Recomendaciones basadas en perfil de visitante de patrimonio"}], "problems": ["Cartas poco diferenciadas para patrimonio", "Desconocimiento de vinos locales de calidad", "Baja optimización de márgenes", "Desaprovechamiento de turismo", "Falta de pairing con gastronomía local"], "city_name": "Mérida", "ticket_medio": "22-36€"}'::jsonb,
  '[{"q": "¿Qué estructura de carta para ciudad romana?", "a": "Base de vinos extremeños locales complementado con referencias españolas premium. Turistas aprecian autenticidad local con calidad. Nuestro software estructura para máxima rentabilidad."}, {"q": "¿Cómo maximizo con turismo?", "a": "Con análisis de turista de patrimonio, recomendamos vinos con margen 38%+ que se venden sin fricción en Mérida."}, {"q": "¿Qué pairing con jamón ibérico?", "a": "Los vinos tintos extremeños combinan perfectamente con jamón. Nuestro sistema recomienda referencias que generan alto ticket medio con este pairing."}]'::jsonb,
  '["software-carta-de-vinos-caceres", "software-carta-de-vinos-badajoz"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-huesca',
  'city',
  'es',
  'Software de Carta de Vinos en Huesca | Winerim',
  'Gestiona cartas de vino en Huesca. Vinos DO Somontano. Software especializado. Incrementa ventas +21%. Solicita demo ahora gratis.',
  'Huesca, España',
  'Software de carta de vinos para restaurantes en Huesca',
  'Potencia la venta de Somontano en el corazón de Aragón',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Huesca ofrece acceso privilegiado a DO Somontano, una denominación de origen con excelente relación precio-calidad. La gestión estratégica de estas referencias es fundamental para la rentabilidad de restaurantes oscenses.", "stats": [{"label": "Incremento en ventas de vino", "value": "+21%"}, {"label": "Mejora del ticket medio", "value": "+18%"}, {"label": "Optimización de margen", "value": "+36%"}], "country": "España", "features": [{"title": "Especialización DO Somontano", "desc": "Base de datos de 200+ referencias de bodegas Somontano con excelente precio"}, {"title": "Gestión de varietales diversas", "desc": "Sistema para manejar autóctonos (Moristel, Grignolino) e internacionales"}, {"title": "Análisis de relación precio-margen", "desc": "Identificación de referencias con mejor ratio para márgenes altos"}, {"title": "Integración con bodegas oscenses", "desc": "Conexión directa con productores de DO Somontano"}], "problems": ["Desconocimiento de DO Somontano", "Cartas poco estratégicas sin priorización", "Baja optimización de márgenes", "Desaprovechamiento de relación precio-calidad", "Falta de diferenciación local"], "city_name": "Huesca", "ticket_medio": "18-32€"}'::jsonb,
  '[{"q": "¿Qué referencias de Somontano son más rentables?", "a": "Los vinos con buena relación precio-calidad generan márgenes excelentes. Bodegas como Bodegas Pirineos y Viñas del Vero ofrecen referencias de calidad con precios accesibles. Nuestro software identifica cuáles venden mejor en tu zona."}, {"q": "¿Cómo diferencio autóctonos de Somontano?", "a": "Moristel y Grignolino son autóctonos únicos. Complementa con Cabernet y Merlot. Nuestro sistema recomienda balance que genera margen máximo con clientes locales."}, {"q": "¿Hay oportunidades en Somontano?", "a": "Esta denominación está en crecimiento con excelentes valores emergentes. Identificamos referencias con alto potencial de margen antes de saturación de mercado."}]'::jsonb,
  '["software-carta-de-vinos-lleida", "software-carta-de-vinos-zaragoza"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinos-plasencia',
  'city',
  'es',
  'Software de Carta de Vinos en Plasencia | Winerim',
  'Software especializado para cartas de vino en Plasencia. Vinos extremeños. Incrementa beneficios +20%. Gestión inteligente. Solicita demo.',
  'software-carta-de-vinos-plasencia',
  'Software de carta de vinos para restaurantes en Plasencia',
  'Domina la venta de vinos en la joya monumental de Extremadura',
  'Solicitar demo',
  '/demo',
  'Analizar mi carta',
  '/analisis-carta',
  '{"intro": "Plasencia, joya monumental de Extremadura con patrimonio arquitectónico singular, requiere cartas de vino sofisticadas con referencias locales. La gestión estratégica es fundamental para restaurantes con perfil cultural en esta ciudad única.", "stats": [{"label": "Incremento en ventas de vino", "value": "+20%"}, {"label": "Mejora del ticket medio", "value": "+17%"}, {"label": "Satisfacción de turista", "value": "+34%"}], "country": "España", "features": [{"title": "Cartas para patrimonio", "desc": "Especialización en cartas para ciudad monumental de turismo cultural"}, {"title": "Especialización vinos extremeños", "desc": "Referencias locales con énfasis en Ribeira del Guadiana"}, {"title": "Gestión de gastronomía local", "desc": "Pairing con jamón ibérico y cocina extremeña traditional"}, {"title": "Análisis de cliente turista", "desc": "Recomendaciones basadas en perfil de visitante de patrimonio"}], "problems": ["Cartas poco diferenciadas para patrimonio", "Desconocimiento de vinos locales", "Baja optimización de márgenes", "Desaprovechamiento de turismo", "Falta de pairing con gastronomía local"], "city_name": "Plasencia", "ticket_medio": "20-34€"}'::jsonb,
  '[{"q": "¿Qué estructura de carta para ciudad monumental?", "a": "Base de vinos extremeños locales complementado con referencias españolas. Turistas aprecian autenticidad. Nuestro software estructura para máxima rentabilidad con margen."}, {"q": "¿Cómo maximizo con turismo?", "a": "Con análisis de turista de patrimonio, recomendamos vinos con margen 37%+ que se venden sin fricción en Plasencia."}, {"q": "¿Qué oportunidades hay en Plasencia?", "a": "Turismo creciente de patrimonio en Plasencia. Identificamos referencias extremeñas poco saturadas con alto potencial de margen diferenciado."}]'::jsonb,
  '["software-carta-de-vinos-caceres", "software-carta-de-vinos-merida", "software-carta-de-vinos-badajoz"]'::jsonb,
  'Article',
  true
);

COMMIT;

-- ============ UK (30 cities) ============
BEGIN;

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'wine-list-software-southampton',
  'city',
  'en',
  'Wine List Software in Southampton | Winerim',
  'Streamline wine management for Southampton restaurants with intelligent list curation and sales analytics tools.',
  'Southampton, United Kingdom',
  'Wine list software for restaurants in Southampton',
  'Elevate your restaurant''s wine program in the heart of Hampshire''s dining scene',
  'Request demo',
  '/demo',
  'Analyse my wine list',
  '/analisis-carta',
  '{"intro": "Southampton''s vibrant waterfront dining scene is renowned for its fresh seafood restaurants and wine bars. From Michelin-featured establishments to independent bistros, restaurants in Southampton are seeking sophisticated wine management solutions. The nearby New Forest wineries and English wine movement create unique opportunities for curated local wine programs.", "stats": [{"label": "Increase in wine sales", "value": "+24%"}, {"label": "Average ticket improvement", "value": "+18%"}, {"label": "Staff wine knowledge improvement", "value": "+42%"}], "country": "United Kingdom", "features": [{"title": "Wine List Curation", "desc": "Create dynamic wine lists that reflect Southampton''s diverse dining clientele and local wine trends"}, {"title": "Inventory Management", "desc": "Track wine stock across your restaurant with real-time updates and automated reordering"}, {"title": "Staff Training", "desc": "Empower your team with knowledge about wines they serve using built-in sommelier tools"}, {"title": "Revenue Optimization", "desc": "Increase wine margins through intelligent pricing and recommendation algorithms"}], "problems": ["Difficulty managing inventory across multiple wine suppliers", "Inconsistent wine pairing recommendations affecting customer satisfaction", "Staff lacking confidence when suggesting wines to guests", "Slow menu updates when seasonal wines arrive", "Lost sales from unclear wine profitability analysis"], "city_name": "Southampton", "ticket_medio": "£28-45"}'::jsonb,
  '[{"q": "How does Winerim help Southampton restaurants compete with established wine bars?", "a": "Our software provides the tools to create professional wine programs at a fraction of traditional sommelier costs, helping independent restaurants build loyal wine-focused clientele."}, {"q": "Can the software integrate with our current POS system?", "a": "Yes, Winerim integrates with all major POS platforms used by Southampton restaurants, ensuring seamless operations."}, {"q": "What''s the typical ROI for Southampton restaurants?", "a": "Most restaurants see 20-30% wine revenue increases within 6 months, with payback periods under 12 weeks."}]'::jsonb,
  '["wine-list-software-london", "wine-list-software-bournemouth", "wine-list-software-winchester"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'wine-list-software-plymouth',
  'city',
  'en',
  'Wine List Software in Plymouth | Winerim',
  'Modern wine management tools for Plymouth''s coastal restaurants and wine bars. Boost wine sales and customer satisfaction.',
  'Plymouth, United Kingdom',
  'Wine list software for restaurants in Plymouth',
  'Transform your wine program in Devon''s premier dining destination',
  'Request demo',
  '/demo',
  'Analyse my wine list',
  '/analisis-carta',
  '{"intro": "Plymouth''s stunning waterfront location and thriving culinary scene attract tourists and locals seeking exceptional dining experiences. The city''s proximity to Devon vineyards and Cornish food producers makes wine-focused restaurants increasingly popular. Progressive restaurateurs in Plymouth are leveraging technology to build competitive advantages in wine service.", "stats": [{"label": "Increase in wine sales", "value": "+28%"}, {"label": "Average ticket improvement", "value": "+21%"}, {"label": "Wine list update efficiency", "value": "+65%"}], "country": "United Kingdom", "features": [{"title": "Digital Wine Lists", "desc": "Deliver beautiful, mobile-friendly wine menus that update in real-time across all platforms"}, {"title": "Sommelier Assistant", "desc": "Get AI-powered pairing suggestions based on dishes and customer preferences"}, {"title": "Analytics Dashboard", "desc": "Understand which wines drive profitability and customer satisfaction in your restaurant"}, {"title": "Supplier Management", "desc": "Streamline communication with wine suppliers and track market availability"}], "problems": ["Menu printing costs and outdated wine lists frustrating customers", "Difficulty sourcing quality English wines for seasonal menus", "Inconsistent wine service standards across shifts", "Lack of data on which wines your customers prefer", "Time-consuming manual wine inventory reconciliation"], "city_name": "Plymouth", "ticket_medio": "£25-40"}'::jsonb,
  '[{"q": "Do Plymouth restaurants need to change their wine sourcing?", "a": "No, Winerim works with your existing suppliers. We help optimize what you''re already stocking and identify new opportunities."}, {"q": "Is the software suitable for casual waterfront restaurants?", "a": "Absolutely. We serve restaurants from casual wine bars to fine dining, all with customizable feature sets."}, {"q": "How quickly can we see improvements?", "a": "Most Plymouth venues report improved wine sales within 4 weeks of implementation."}]'::jsonb,
  '["wine-list-software-exeter", "wine-list-software-bristol", "wine-list-software-bournemouth"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'wine-list-software-exeter',
  'city',
  'en',
  'Wine List Software in Exeter | Winerim',
  'Comprehensive wine management for Exeter''s historic restaurants and gastropubs. Elevate your wine service today.',
  'Exeter, United Kingdom',
  'Wine list software for restaurants in Exeter',
  'Modernize wine service in Devon''s cultural heart',
  'Request demo',
  '/demo',
  'Analyse my wine list',
  '/analisis-carta',
  '{"intro": "Exeter''s thriving independent restaurant scene and university town demographics create a sophisticated palate for wine education. The cathedral city attracts tourists and business travelers seeking authentic dining experiences. Restaurants here are discovering that strategic wine programs significantly enhance customer experience and margins.", "stats": [{"label": "Increase in wine sales", "value": "+22%"}, {"label": "Average ticket improvement", "value": "+17%"}, {"label": "Customer retention improvement", "value": "+38%"}], "country": "United Kingdom", "features": [{"title": "Smart Recommendations", "desc": "Suggest wines based on customer preferences and dish characteristics using advanced algorithms"}, {"title": "Mobile Staff Tablets", "desc": "Equip your team with instant access to wine details, pairings, and availability at the table"}, {"title": "Event Management", "desc": "Create special wine menus and pairings for private events and group bookings"}, {"title": "Performance Tracking", "desc": "Monitor staff performance in wine recommendations and identify training opportunities"}], "problems": ["Limited wine education for staff in hospitality-focused regions", "Inconsistent customer experience across different server expertise", "High waste from wines that don''t sell before degradation", "Difficulty competing with chain restaurants'' wine programs", "Lack of insights into which wine styles your customers prefer"], "city_name": "Exeter", "ticket_medio": "£22-38"}'::jsonb,
  '[{"q": "How does Winerim support smaller Exeter restaurants?", "a": "We offer tiered pricing based on restaurant size and transaction volume, making professional wine management accessible to independent venues."}, {"q": "Can we customize wine descriptions for our restaurant''s style?", "a": "Yes, fully customizable. Your team can adjust all wine descriptions, pairings, and recommendations to match your restaurant''s voice."}, {"q": "What training does your team provide?", "a": "Comprehensive onboarding plus ongoing support and monthly training webinars focused on wine industry trends."}]'::jsonb,
  '["wine-list-software-plymouth", "wine-list-software-bristol", "wine-list-software-bath"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'wine-list-software-canterbury',
  'city',
  'en',
  'Wine List Software in Canterbury | Winerim',
  'Wine list management tools for Canterbury''s historic restaurants and Canterbury pilgrim-serving venues.',
  'Canterbury, United Kingdom',
  'Wine list software for restaurants in Canterbury',
  'Enhance wine service in England''s most historic dining destination',
  'Request demo',
  '/demo',
  'Analyse my wine list',
  '/analisis-carta',
  '{"intro": "Canterbury''s World Heritage status and year-round tourism create a unique market for wine-focused dining experiences. The city''s blend of heritage and contemporary restaurants attracts discerning diners seeking authentic wine pairings. Local sommeliers and restaurateurs are increasingly adopting technology to deliver world-class wine programs.", "stats": [{"label": "Increase in wine sales", "value": "+26%"}, {"label": "Average ticket improvement", "value": "+19%"}, {"label": "Visitor satisfaction scores", "value": "+44%"}], "country": "United Kingdom", "features": [{"title": "Multi-Language Support", "desc": "Cater to Canterbury''s international tourist market with wine descriptions in multiple languages"}, {"title": "Heritage Integration", "desc": "Celebrate local food and wine traditions with curated lists highlighting regional producers"}, {"title": "Booking Coordination", "desc": "Align wine recommendations with reservation data for special occasions and group visits"}, {"title": "Historical Context", "desc": "Enrich your wine program with stories about producers and regional wine traditions"}], "problems": ["Managing wine preferences for diverse international visitor bases", "Seasonal fluctuations in tourist flow affecting wine inventory planning", "Maintaining consistent service quality across high-volume tourist seasons", "Difficulty standing out among many Canterbury restaurants", "Language barriers in wine recommendations"], "city_name": "Canterbury", "ticket_medio": "£26-42"}'::jsonb,
  '[{"q": "How do we accommodate wine preferences from different countries?", "a": "Winerim supports multilingual descriptions and can highlight wines familiar to international visitors while introducing English wines."}, {"q": "Can we manage seasonal wine menu changes?", "a": "Yes, our system allows easy menu updates and can flag seasonal wines as they become available from suppliers."}, {"q": "What reporting helps with peak tourist season planning?", "a": "Detailed sales analytics show which wines drive revenue during busy periods, helping you stock strategically."}]'::jsonb,
  '["wine-list-software-london", "wine-list-software-oxford", "wine-list-software-cambridge"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'wine-list-software-norwich',
  'city',
  'en',
  'Wine List Software in Norwich | Winerim',
  'Wine management software for Norwich''s independent restaurants and bars. Boost wine revenue and customer loyalty.',
  'Norwich, United Kingdom',
  'Wine list software for restaurants in Norwich',
  'Elevate wine service in Norfolk''s vibrant cultural center',
  'Request demo',
  '/demo',
  'Analyse my wine list',
  '/analisis-carta',
  '{"intro": "Norwich''s thriving independent restaurant scene and creative community attract food-focused diners who appreciate quality wine service. The city''s growing reputation as a culinary destination rivals larger UK cities. Forward-thinking restaurateurs are using sophisticated wine programs to differentiate their venues.", "stats": [{"label": "Increase in wine sales", "value": "+25%"}, {"label": "Average ticket improvement", "value": "+20%"}, {"label": "Customer repeat visit rate", "value": "+35%"}], "country": "United Kingdom", "features": [{"title": "Independent Venue Focus", "desc": "Purpose-built for the needs of independent restaurants, not corporate chains"}, {"title": "Community Building", "desc": "Create wine events and tastings that strengthen your restaurant''s local presence"}, {"title": "Supplier Relationships", "desc": "Manage relationships with Norfolk producers and smaller vineyards effectively"}, {"title": "Staff Empowerment", "desc": "Give your team the confidence and tools to become wine ambassadors"}], "problems": ["Limited resources compared to chain restaurants for wine program development", "Difficulty sourcing unique wines that differentiate your restaurant", "High training costs for wine knowledge development", "Competing with established wine venues for market share", "Pressure from delivery and casual dining trends"], "city_name": "Norwich", "ticket_medio": "£20-35"}'::jsonb,
  '[{"q": "Is Winerim affordable for small independent restaurants?", "a": "Yes, we scale with your business. Start with core features and expand as your wine program grows."}, {"q": "How can we compete with larger restaurant groups?", "a": "Our software levels the playing field by providing tools previously only available to large chains, helping you create standout wine programs."}, {"q": "Can we highlight local Norfolk producers?", "a": "Absolutely. Feature local wines prominently and tell the stories of Norfolk producers to build community loyalty."}]'::jsonb,
  '["wine-list-software-london", "wine-list-software-cambridge", "wine-list-software-leicester"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'wine-list-software-leicester',
  'city',
  'en',
  'Wine List Software in Leicester | Winerim',
  'Intelligent wine management for Leicester restaurants. Increase wine sales and improve customer experience.',
  'Leicester, United Kingdom',
  'Wine list software for restaurants in Leicester',
  'Transform wine service in the East Midlands'' dining capital',
  'Request demo',
  '/demo',
  'Analyse my wine list',
  '/analisis-carta',
  '{"intro": "Leicester''s diverse population and strong hospitality sector create a sophisticated market for wine-focused dining. The city''s growing reputation for culinary innovation attracts restaurants seeking to elevate their wine programs. Proximity to Nottingham and Derby wine culture influences local dining trends.", "stats": [{"label": "Increase in wine sales", "value": "+23%"}, {"label": "Average ticket improvement", "value": "+16%"}, {"label": "Staff training efficiency", "value": "+50%"}], "country": "United Kingdom", "features": [{"title": "Multi-Site Management", "desc": "Manage wine programs across multiple Leicester locations from one centralized platform"}, {"title": "Diverse Palate Support", "desc": "Create wine lists that celebrate diverse global cuisines popular in Leicester"}, {"title": "Integration Tools", "desc": "Connect with delivery platforms and online ordering systems used by your restaurant"}, {"title": "Real-Time Sync", "desc": "Automatically update wine availability across all ordering channels"}], "problems": ["Managing wine programs across multiple restaurant locations", "Difficulty sourcing wines that pair with diverse cuisines", "High staff turnover requiring constant wine training", "Competition from established restaurant groups", "Inefficient inventory tracking across locations"], "city_name": "Leicester", "ticket_medio": "£23-39"}'::jsonb,
  '[{"q": "Can the software handle multiple Leicester restaurant locations?", "a": "Yes, our multi-location features let you manage centralized wine purchasing while allowing local menu customization."}, {"q": "Does it work with our delivery platform integrations?", "a": "Absolutely. We sync with all major delivery platforms to ensure consistent wine availability info."}, {"q": "How do we maintain consistency across locations?", "a": "Centralized wine list management with location-specific overrides ensures consistency while respecting local preferences."}]'::jsonb,
  '["wine-list-software-nottingham", "wine-list-software-derby", "wine-list-software-coventry"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'wine-list-software-coventry',
  'city',
  'en',
  'Wine List Software in Coventry | Winerim',
  'Wine management software for Coventry''s growing restaurant scene. Boost wine sales with data-driven recommendations.',
  'Coventry, United Kingdom',
  'Wine list software for restaurants in Coventry',
  'Enhance wine programs in the West Midlands'' revitalized dining scene',
  'Request demo',
  '/demo',
  'Analyse my wine list',
  '/analisis-carta',
  '{"intro": "Coventry''s cultural renaissance and regeneration efforts have attracted quality restaurants seeking to establish sophisticated wine programs. The city''s improving reputation attracts diners who value wine-focused dining experiences. As Coventry''s hospitality sector matures, wine management technology becomes increasingly valuable for competitive positioning.", "stats": [{"label": "Increase in wine sales", "value": "+27%"}, {"label": "Average ticket improvement", "value": "+22%"}, {"label": "Customer satisfaction", "value": "+41%"}], "country": "United Kingdom", "features": [{"title": "Growth Support", "desc": "Scale your wine program as your restaurant grows and expands its customer base"}, {"title": "Market Analytics", "desc": "Understand Coventry''s wine preferences and stay ahead of trends"}, {"title": "Budget Management", "desc": "Control wine costs while maximizing revenue and profitability"}, {"title": "Customer Insights", "desc": "Learn what drives repeat customers and wine selection behavior"}], "problems": ["Building credibility for wine programs in a developing restaurant market", "Finding the right wine mix for emerging customer preferences", "Limited historical data on which wines perform well locally", "Staying competitive as more restaurants offer wine programs", "Managing costs while investing in wine program development"], "city_name": "Coventry", "ticket_medio": "£21-36"}'::jsonb,
  '[{"q": "How do we build a wine reputation in Coventry?", "a": "Start with a focused list of quality wines, use our tasting event features, and let the data guide your expansion."}, {"q": "What wines should we stock for Coventry customers?", "a": "Our analytics show preferences in comparable markets. We''ll help you identify bestsellers and margin leaders."}, {"q": "Can we update our wine list as preferences evolve?", "a": "Yes, our flexible system makes it easy to test new wines and retire underperformers based on real sales data."}]'::jsonb,
  '["wine-list-software-leicester", "wine-list-software-birmingham", "wine-list-software-derby"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'wine-list-software-derby',
  'city',
  'en',
  'Wine List Software in Derby | Winerim',
  'Smart wine management for Derby restaurants and bars. Increase margins and customer satisfaction.',
  'Derby, United Kingdom',
  'Wine list software for restaurants in Derby',
  'Elevate wine service in the East Midlands'' dining destination',
  'Request demo',
  '/demo',
  'Analyse my wine list',
  '/analisis-carta',
  '{"intro": "Derby''s heritage as an industrial city is giving way to a thriving contemporary dining scene. Restaurants here are increasingly recognizing that sophisticated wine programs attract affluent customers and drive higher spending. The city''s proximity to wine regions influences local restaurant trends.", "stats": [{"label": "Increase in wine sales", "value": "+24%"}, {"label": "Average ticket improvement", "value": "+18%"}, {"label": "Menu engineering efficiency", "value": "+47%"}], "country": "United Kingdom", "features": [{"title": "Smart Pricing", "desc": "Optimize wine pricing strategy based on demand, competition, and margin analysis"}, {"title": "Inventory Forecasting", "desc": "Predict demand and reduce waste through intelligent stock management"}, {"title": "Trend Analysis", "desc": "Identify rising wine trends before they become mainstream"}, {"title": "Competitive Intelligence", "desc": "Understand what wine competitors in Derby are offering"}], "problems": ["Difficulty determining optimal wine pricing in a competitive market", "Over-ordering wines that don''t sell, leading to waste", "Inability to predict which wines will trend locally", "Limited visibility into competitor wine programs", "Inefficient use of capital in wine inventory"], "city_name": "Derby", "ticket_medio": "£22-37"}'::jsonb,
  '[{"q": "How does smart pricing work for wines?", "a": "Our algorithm considers cost, demand, local pricing, and margin targets to recommend optimal prices that maximize profitability."}, {"q": "Can we reduce wine waste?", "a": "Yes, inventory forecasting and demand prediction help you stock the right quantities and retire slow movers proactively."}, {"q": "How often can we update our wine list?", "a": "Update as frequently as you like. Most restaurants adjust monthly to reflect seasonal availability and customer preferences."}]'::jsonb,
  '["wine-list-software-leicester", "wine-list-software-nottingham", "wine-list-software-coventry"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'wine-list-software-stoke-on-trent',
  'city',
  'en',
  'Wine List Software in Stoke-on-Trent | Winerim',
  'Wine management tools for Stoke-on-Trent restaurants. Boost wine sales and enhance customer experience.',
  'Stoke-on-Trent, United Kingdom',
  'Wine list software for restaurants in Stoke-on-Trent',
  'Transform wine service in the Potteries'' revitalized dining scene',
  'Request demo',
  '/demo',
  'Analyse my wine list',
  '/analisis-carta',
  '{"intro": "Stoke-on-Trent''s cultural renaissance has revitalized its dining scene, with new restaurants seeking to establish professional wine programs. The city''s renaissance attracts diners interested in quality dining experiences paired with wines. Restaurants here are discovering that wine sophistication attracts customers willing to spend more.", "stats": [{"label": "Increase in wine sales", "value": "+26%"}, {"label": "Average ticket improvement", "value": "+21%"}, {"label": "New customer acquisition", "value": "+33%"}], "country": "United Kingdom", "features": [{"title": "Cultural Integration", "desc": "Celebrate Stoke-on-Trent''s heritage while building modern wine programs"}, {"title": "Community Engagement", "desc": "Host wine events that position your restaurant as a cultural destination"}, {"title": "Local Storytelling", "desc": "Connect wines to local heritage and regional producers"}, {"title": "Growth Tracking", "desc": "Monitor how wine programs contribute to overall restaurant growth"}], "problems": ["Building premium dining reputation in a traditionally casual market", "Attracting customers willing to spend on wine experiences", "Limited existing wine culture in the local market", "Competing with established venues in nearby cities", "Justifying wine program investment to ownership"], "city_name": "Stoke-on-Trent", "ticket_medio": "£19-33"}'::jsonb,
  '[{"q": "Can Winerim help us build a premium reputation?", "a": "Yes, professional wine programs are a key way to elevate restaurant positioning and attract discerning diners."}, {"q": "What events should we host?", "a": "Our event features support wine tastings, wine pairing dinners, and educational sessions that build community."}, {"q": "How do we justify wine program investment?", "a": "ROI data shows 20-30% wine revenue increases. We provide reports proving the business case to stakeholders."}]'::jsonb,
  '["wine-list-software-wolverhampton", "wine-list-software-coventry", "wine-list-software-derby"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'wine-list-software-wolverhampton',
  'city',
  'en',
  'Wine List Software in Wolverhampton | Winerim',
  'Comprehensive wine management for Wolverhampton restaurants. Increase wine revenue with smart tools.',
  'Wolverhampton, United Kingdom',
  'Wine list software for restaurants in Wolverhampton',
  'Enhance wine programs in the West Midlands',
  'Request demo',
  '/demo',
  'Analyse my wine list',
  '/analisis-carta',
  '{"intro": "Wolverhampton''s growing restaurant sector is increasingly embracing wine-focused dining as a differentiator. The city''s diverse population appreciates global wine selections and quality dining experiences. Progressive restaurants are using wine programs to build brand loyalty and increase customer lifetime value.", "stats": [{"label": "Increase in wine sales", "value": "+25%"}, {"label": "Average ticket improvement", "value": "+19%"}, {"label": "Staff engagement scores", "value": "+52%"}], "country": "United Kingdom", "features": [{"title": "Diversity Support", "desc": "Create wine lists that celebrate diverse global cuisines and wine regions"}, {"title": "Staff Training", "desc": "Comprehensive training tools ensure consistent wine knowledge across your team"}, {"title": "Community Building", "desc": "Build loyalty through wine events and educational experiences"}, {"title": "Performance Metrics", "desc": "Track which staff members drive wine sales and reward top performers"}], "problems": ["Managing wine programs across diverse customer demographics", "Building staff expertise in multicultural wine service", "Creating distinctive wine programs in a competitive market", "Measuring and improving staff performance in wine sales", "Keeping staff engaged with continuous learning"], "city_name": "Wolverhampton", "ticket_medio": "£20-34"}'::jsonb,
  '[{"q": "How do we serve diverse wine preferences?", "a": "Our system supports organizing wines by region, style, and cuisine pairing, making it easy for customers from different backgrounds to find wines they enjoy."}, {"q": "Can we track individual staff performance?", "a": "Yes, detailed analytics show which servers drive wine sales, helping you recognize and reward top performers."}, {"q": "What training resources are available?", "a": "Monthly webinars, interactive learning modules, and industry news keep your team current on wine trends."}]'::jsonb,
  '["wine-list-software-coventry", "wine-list-software-birmingham", "wine-list-software-stoke-on-trent"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'wine-list-software-swansea',
  'city',
  'en',
  'Wine List Software in Swansea | Winerim',
  'Wine management software for Swansea''s waterfront restaurants and bars. Boost wine sales and customer satisfaction.',
  'Swansea, United Kingdom',
  'Wine list software for restaurants in Swansea',
  'Elevate wine service in Wales'' premier dining destination',
  'Request demo',
  '/demo',
  'Analyse my wine list',
  '/analisis-carta',
  '{"intro": "Swansea''s stunning coastal location and thriving cultural scene attract tourists and locals seeking quality dining experiences. The city''s Welsh heritage paired with contemporary restaurant culture creates a unique market for wine-focused venues. Restaurants here are increasingly adopting professional wine programs to compete internationally.", "stats": [{"label": "Increase in wine sales", "value": "+28%"}, {"label": "Average ticket improvement", "value": "+23%"}, {"label": "Tourist return visit rate", "value": "+39%"}], "country": "United Kingdom", "features": [{"title": "Welsh Heritage Integration", "desc": "Celebrate Welsh food and wine traditions while introducing international selections"}, {"title": "Tourism Support", "desc": "Create memorable wine experiences that encourage visitors to return and recommend your restaurant"}, {"title": "Multi-Language Menus", "desc": "Serve English, Welsh, and other languages for international guests"}, {"title": "Seasonal Flexibility", "desc": "Adjust wine programs for peak summer tourism and quieter winter seasons"}], "problems": ["Seasonal fluctuations affecting wine inventory and cash flow", "Serving diverse international visitor preferences", "Building consistent quality across high-volume summer seasons", "Language barriers in wine communication", "Managing wine costs during low-season periods"], "city_name": "Swansea", "ticket_medio": "£26-41"}'::jsonb,
  '[{"q": "How do we manage seasonal wine inventory changes?", "a": "Our forecasting tools help you adjust purchasing based on historical tourism patterns and booking data."}, {"q": "Can we support multiple languages?", "a": "Yes, wine descriptions available in English and Welsh help serve diverse visitors authentically."}, {"q": "What helps during peak tourist season?", "a": "Batch upselling features, staff tablet ordering, and real-time inventory sync handle high-volume periods efficiently."}]'::jsonb,
  '["wine-list-software-cardiff", "wine-list-software-bristol", "wine-list-software-bath"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'wine-list-software-dundee',
  'city',
  'en',
  'Wine List Software in Dundee | Winerim',
  'Intelligent wine management for Dundee restaurants. Increase wine sales and optimize inventory.',
  'Dundee, United Kingdom',
  'Wine list software for restaurants in Dundee',
  'Transform wine service in Scotland''s cultural renaissance',
  'Request demo',
  '/demo',
  'Analyse my wine list',
  '/analisis-carta',
  '{"intro": "Dundee''s cultural revival and regeneration projects have attracted new restaurants seeking to establish sophisticated wine programs. The city''s growing reputation as a creative hub attracts diners interested in contemporary dining paired with quality wines. Scottish restaurants are increasingly recognizing wine as a profit driver and brand differentiator.", "stats": [{"label": "Increase in wine sales", "value": "+27%"}, {"label": "Average ticket improvement", "value": "+20%"}, {"label": "Inventory turnover improvement", "value": "+43%"}], "country": "United Kingdom", "features": [{"title": "Scottish Wine Focus", "desc": "Highlight Scottish producers and celebrate Scottish wine culture"}, {"title": "UK Distribution", "desc": "Seamlessly integrate with Scottish wine suppliers and distributors"}, {"title": "Inventory Analytics", "desc": "Reduce waste and optimize stock levels for your specific restaurant type"}, {"title": "Premium Program Support", "desc": "Build luxury wine programs that attract affluent Dundee diners"}], "problems": ["Limited awareness of Scottish wine producers among staff", "Difficulty sourcing quality wines at competitive prices in Scotland", "High shipping costs affecting wine margins", "Inconsistent service standards impacting premium dining positioning", "Limited data on Scottish market wine preferences"], "city_name": "Dundee", "ticket_medio": "£24-40"}'::jsonb,
  '[{"q": "How can we highlight Scottish wines?", "a": "Our system makes it easy to tag and promote Scottish producers, and we provide educational content about local winemakers."}, {"q": "Are shipping costs lower through Winerim?", "a": "We don''t negotiate prices, but our supplier integration features help you find local distributors efficiently."}, {"q": "What Scottish wines are trending?", "a": "Our market analytics show which Scottish wines perform well in venues similar to yours."}]'::jsonb,
  '["wine-list-software-edinburgh", "wine-list-software-glasgow", "wine-list-software-perth"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'wine-list-software-perth',
  'city',
  'en',
  'Wine List Software in Perth | Winerim',
  'Wine management tools for Perth''s restaurants and hospitality venues. Boost wine profitability.',
  'Perth, United Kingdom',
  'Wine list software for restaurants in Perth',
  'Enhance wine programs in Scotland''s elegant city',
  'Request demo',
  '/demo',
  'Analyse my wine list',
  '/analisis-carta',
  '{"intro": "Perth''s affluent demographics and thriving restaurant scene create a premium market for wine-focused dining. The city''s location in Scotland''s wine region provides unique opportunities for local wine programs. Sophisticated diners in Perth appreciate quality wine service and seek memorable dining experiences.", "stats": [{"label": "Increase in wine sales", "value": "+29%"}, {"label": "Average ticket improvement", "value": "+25%"}, {"label": "Customer lifetime value increase", "value": "+48%"}], "country": "United Kingdom", "features": [{"title": "Premium Positioning", "desc": "Build luxury wine programs that appeal to Perth''s affluent dining base"}, {"title": "Local Producer Spotlight", "desc": "Develop relationships with Perthshire wineries and food producers"}, {"title": "Sommelier Support", "desc": "Tools that enhance your sommelier''s effectiveness and customer interactions"}, {"title": "Event Excellence", "desc": "Create memorable wine dinners and tastings that build brand loyalty"}], "problems": ["Differentiating premium wine programs in a competitive market", "Building relationships with local Perthshire producers", "Creating exceptional sommelier experiences for high-spending clients", "Justifying premium pricing to discerning diners", "Organizing complex wine events and tastings"], "city_name": "Perth", "ticket_medio": "£32-48"}'::jsonb,
  '[{"q": "How can we connect with Perthshire wine producers?", "a": "Our directory features local producers, and we provide communication tools to build direct relationships."}, {"q": "What features support wine events?", "a": "Event management tools handle invitations, pairings, menu coordination, and attendee communication seamlessly."}, {"q": "Can we create tiered wine programs?", "a": "Absolutely, featuring different price points and experience levels for various customer segments."}]'::jsonb,
  '["wine-list-software-dundee", "wine-list-software-edinburgh", "wine-list-software-stirling"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'wine-list-software-stirling',
  'city',
  'en',
  'Wine List Software in Stirling | Winerim',
  'Wine management software for Stirling''s historic restaurants. Elevate wine service and sales.',
  'Stirling, United Kingdom',
  'Wine list software for restaurants in Stirling',
  'Transform wine programs in Scotland''s historic city',
  'Request demo',
  '/demo',
  'Analyse my wine list',
  '/analisis-carta',
  '{"intro": "Stirling''s historic significance and tourism appeal attract visitors seeking authentic Scottish dining experiences with quality wine service. The city''s castle and heritage sites drive consistent tourism that restaurants can leverage. Wine-focused dining experiences create memorable moments for visitors while driving revenue growth.", "stats": [{"label": "Increase in wine sales", "value": "+26%"}, {"label": "Average ticket improvement", "value": "+21%"}, {"label": "Event revenue contribution", "value": "+156%"}], "country": "United Kingdom", "features": [{"title": "Tourism Optimization", "desc": "Tailor wine experiences to the needs and budgets of history-conscious travelers"}, {"title": "Heritage Storytelling", "desc": "Connect wines to Scottish history and traditions for memorable experiences"}, {"title": "Group Handling", "desc": "Tools for managing group bookings with coordinated wine experiences"}, {"title": "Castle Visitor Integration", "desc": "Partner with tourism providers to offer package deals including wine dining"}], "problems": ["Seasonal tourism patterns affecting wine inventory planning", "Managing group reservations with coordinated wine service", "Competing with established chain restaurants for tourists", "Creating memorable experiences that drive positive reviews", "Coordinating with tourism operators and visitor attractions"], "city_name": "Stirling", "ticket_medio": "£23-38"}'::jsonb,
  '[{"q": "How do we coordinate with castle tourism?", "a": "Create special wine menu packages and partner promotions. Our system makes it easy to manage these coordinated experiences."}, {"q": "Can we handle large group bookings?", "a": "Yes, group management features let you pre-set wines and coordinate service for tour groups efficiently."}, {"q": "What creates memorable wine experiences for tourists?", "a": "Storytelling about Scottish wines and regions, combined with knowledgeable service, creates lasting impressions."}]'::jsonb,
  '["wine-list-software-perth", "wine-list-software-dundee", "wine-list-software-edinburgh"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'wine-list-software-chester',
  'city',
  'en',
  'Wine List Software in Chester | Winerim',
  'Comprehensive wine management for Chester''s historic restaurants and bars.',
  'Chester, United Kingdom',
  'Wine list software for restaurants in Chester',
  'Elevate wine service in England''s medieval gem',
  'Request demo',
  '/demo',
  'Analyse my wine list',
  '/analisis-carta',
  '{"intro": "Chester''s picturesque medieval character and strong tourism trade create a premium market for wine-focused dining. The city''s affluent local population and visitor base appreciate sophisticated wine service. Restaurants here are discovering that wine programs significantly enhance the dining experience and guest satisfaction.", "stats": [{"label": "Increase in wine sales", "value": "+27%"}, {"label": "Average ticket improvement", "value": "+22%"}, {"label": "Positive review mentions of wine", "value": "+58%"}], "country": "United Kingdom", "features": [{"title": "Heritage Experience Design", "desc": "Create wine experiences that match Chester''s historic character and elegant dining scene"}, {"title": "Tourism Integration", "desc": "Develop wine offerings that appeal to discerning visitors and business travelers"}, {"title": "Premium Pairing", "desc": "Tools for creating sophisticated food and wine pairings for fine dining establishments"}, {"title": "Event Spaces", "desc": "Manage wine experiences across multiple restaurant areas and private dining spaces"}], "problems": ["Creating wine programs that match Chester''s heritage and elegance", "Serving diverse visitor expectations and preferences", "Managing wine costs while maintaining premium positioning", "Competing with established fine dining establishments", "Coordinating wine service across multiple restaurant areas"], "city_name": "Chester", "ticket_medio": "£28-44"}'::jsonb,
  '[{"q": "How can we enhance the heritage dining experience?", "a": "Wine storytelling and curated pairings create emotional connections. Our tools help you present wines in a context-rich way."}, {"q": "What appeals to Chester visitors?", "a": "Premium English wines and Old World selections paired with local cuisine work especially well for visitors."}, {"q": "Can we manage multiple dining areas?", "a": "Yes, flexible menu management lets you customize wine offerings for different spaces and occasions."}]'::jsonb,
  '["wine-list-software-london", "wine-list-software-oxford", "wine-list-software-manchester"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'wine-list-software-winchester',
  'city',
  'en',
  'Wine List Software in Winchester | Winerim',
  'Smart wine management for Winchester''s upscale restaurants. Increase wine revenue and customer satisfaction.',
  'Winchester, United Kingdom',
  'Wine list software for restaurants in Winchester',
  'Transform wine service in Hampshire''s elegant cathedral city',
  'Request demo',
  '/demo',
  'Analyse my wine list',
  '/analisis-carta',
  '{"intro": "Winchester''s affluent demographic and proximity to English wine regions create a premium market for wine-focused dining. The historic cathedral city attracts visitors and residents seeking sophisticated culinary experiences. Restaurants here are increasingly leveraging wine programs to justify premium positioning and drive customer loyalty.", "stats": [{"label": "Increase in wine sales", "value": "+29%"}, {"label": "Average ticket improvement", "value": "+24%"}, {"label": "Repeat customer rate", "value": "+52%"}], "country": "United Kingdom", "features": [{"title": "English Wine Expertise", "desc": "Highlight local Hampshire vineyards and English wine producers in your program"}, {"title": "Premium Customer Focus", "desc": "Tools designed for affluent diners seeking curated wine experiences"}, {"title": "Historic Venue Support", "desc": "Create wine programs that complement historic restaurant spaces and character"}, {"title": "Loyalty Building", "desc": "Programs that encourage wine-focused customers to become regulars"}], "problems": ["Sourcing quality English wines from local Winchester producers", "Creating exclusive wine experiences for premium customers", "Justifying premium pricing in a heritage setting", "Building sommelier expertise in local wine regions", "Managing expectations of discerning wine drinkers"], "city_name": "Winchester", "ticket_medio": "£30-46"}'::jsonb,
  '[{"q": "Which Hampshire vineyards should we focus on?", "a": "Our directory features local producers. We can guide you toward those whose wines best match your cuisine and clientele."}, {"q": "How do we attract wine connoisseurs?", "a": "Professional wine programs, knowledgeable staff, and curated experiences build reputation among wine enthusiasts."}, {"q": "Can we create exclusive wine club programs?", "a": "Yes, features for wine clubs and exclusive member experiences build loyalty and repeat visits."}]'::jsonb,
  '["wine-list-software-london", "wine-list-software-southampton", "wine-list-software-oxford"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'wine-list-software-salisbury',
  'city',
  'en',
  'Wine List Software in Salisbury | Winerim',
  'Wine management software for Salisbury restaurants. Boost wine sales and improve service quality.',
  'Salisbury, United Kingdom',
  'Wine list software for restaurants in Salisbury',
  'Elevate wine service in Wiltshire''s charming market town',
  'Request demo',
  '/demo',
  'Analyse my wine list',
  '/analisis-carta',
  '{"intro": "Salisbury''s historic character and tourism appeal create opportunities for wine-focused dining experiences that enhance visitor memories. The cathedral city attracts affluent tourists seeking authentic English experiences paired with quality wines. Local restaurants are increasingly adopting professional wine programs to differentiate in the tourism market.", "stats": [{"label": "Increase in wine sales", "value": "+25%"}, {"label": "Average ticket improvement", "value": "+19%"}, {"label": "Tourism board recommendations", "value": "+67%"}], "country": "United Kingdom", "features": [{"title": "Tourism Board Partnership", "desc": "Integration with local tourism marketing to promote your wine-focused dining"}, {"title": "Cathedral City Experience", "desc": "Create wine offerings that match Salisbury''s cultural heritage and significance"}, {"title": "Visitor Engagement", "desc": "Tools for welcoming international visitors with clear wine descriptions and education"}, {"title": "Local Producer Partnerships", "desc": "Features for showcasing Wiltshire food and wine producers"}], "problems": ["Varying sophistication levels among international visitors", "Communicating wine value and quality to diverse tourists", "Building reputation in a market with limited wine culture", "Managing seasonal tourism fluctuations", "Creating experiences that tourists want to share and recommend"], "city_name": "Salisbury", "ticket_medio": "£21-36"}'::jsonb,
  '[{"q": "How do we serve international visitors with different wine knowledge?", "a": "Our tasting size options, clear descriptions, and sommelier recommendations adapt to any expertise level."}, {"q": "Can we get tourism board recognition?", "a": "Building a strong wine program through our tools gives you content to share with tourism boards and travel guides."}, {"q": "What helps with seasonal tourism?", "a": "Seasonal wine menus and flexible inventory management help you adjust for peak and off-season periods."}]'::jsonb,
  '["wine-list-software-london", "wine-list-software-winchester", "wine-list-software-bath"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'wine-list-software-durham',
  'city',
  'en',
  'Wine List Software in Durham | Winerim',
  'Intelligent wine management for Durham restaurants and university town venues.',
  'Durham, United Kingdom',
  'Wine list software for restaurants in Durham',
  'Transform wine service in England''s northeast cultural hub',
  'Request demo',
  '/demo',
  'Analyse my wine list',
  '/analisis-carta',
  '{"intro": "Durham''s university presence and historic cathedral city status create a sophisticated market for wine-focused dining. The city''s young, educated population and visiting academics appreciate quality wine service. Restaurants here are increasingly adopting professional wine programs to attract students, faculty, and visitors.", "stats": [{"label": "Increase in wine sales", "value": "+23%"}, {"label": "Average ticket improvement", "value": "+17%"}, {"label": "Student customer retention", "value": "+44%"}], "country": "United Kingdom", "features": [{"title": "Academic Community Focus", "desc": "Create wine education programs that appeal to Durham''s educated, curious clientele"}, {"title": "Price Point Flexibility", "desc": "Offer wines across price ranges to serve students and affluent visitors"}, {"title": "Event Hosting", "desc": "Tools for hosting wine tastings and educational events that build community"}, {"title": "Seasonal Optimization", "desc": "Adjust wine programs for student term times and vacation periods"}], "problems": ["Balancing premium positioning with budget-conscious student customers", "Creating repeat business among transient student population", "Educating younger diners about wine appreciation", "Managing inventory for seasonal academic calendar changes", "Competing with established university town dining venues"], "city_name": "Durham", "ticket_medio": "£18-32"}'::jsonb,
  '[{"q": "How do we appeal to student customers?", "a": "Offer quality wines at accessible price points, combine with education and events that engage younger demographics."}, {"q": "Can we build loyalty with transient students?", "a": "Create memorable experiences, loyalty programs, and social event hosting that build lasting connections."}, {"q": "What wine education resonates with universities?", "a": "Storytelling about producers, regions, and food pairings appeals to curious, educated minds."}]'::jsonb,
  '["wine-list-software-newcastle", "wine-list-software-cambridge", "wine-list-software-oxford"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'wine-list-software-lancaster',
  'city',
  'en',
  'Wine List Software in Lancaster | Winerim',
  'Wine management tools for Lancaster''s historic restaurants and hospitality venues.',
  'Lancaster, United Kingdom',
  'Wine list software for restaurants in Lancaster',
  'Elevate wine service in Lancashire''s historic market town',
  'Request demo',
  '/demo',
  'Analyse my wine list',
  '/analisis-carta',
  '{"intro": "Lancaster''s castle heritage and university presence create a dual market of tourists and academics seeking quality dining experiences. The picturesque town attracts visitors interested in historic England. Restaurants here are discovering that wine programs enhance both tourist experiences and academic social events.", "stats": [{"label": "Increase in wine sales", "value": "+24%"}, {"label": "Average ticket improvement", "value": "+18%"}, {"label": "Event wine revenue", "value": "+121%"}], "country": "United Kingdom", "features": [{"title": "Castle & Heritage Focus", "desc": "Create wine programs that celebrate Lancaster''s historic significance and tourism appeal"}, {"title": "Group Event Management", "desc": "Tools for coordinating wine service for weddings, corporate events, and academic functions"}, {"title": "University Partnership", "desc": "Programs designed for campus events, alumni gatherings, and faculty entertaining"}, {"title": "Heritage Storytelling", "desc": "Connect wines to historical periods and regional heritage"}], "problems": ["Managing diverse event types from tourists to university functions", "Coordinating wine service for large group events", "Creating memorable heritage-themed dining experiences", "Competing with established event venues", "Communicating wine value to budget-conscious event planners"], "city_name": "Lancaster", "ticket_medio": "£22-37"}'::jsonb,
  '[{"q": "How do we handle mixed event types?", "a": "Our flexible system lets you create custom wine programs for different event types and client budgets."}, {"q": "What appeals to university events?", "a": "Professional service, educational elements, and competitive pricing for group events drive university business."}, {"q": "Can we support heritage storytelling?", "a": "Yes, custom wine descriptions can highlight historical connections and enhance the dining narrative."}]'::jsonb,
  '["wine-list-software-manchester", "wine-list-software-durham", "wine-list-software-leeds"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'wine-list-software-harrogate',
  'city',
  'en',
  'Wine List Software in Harrogate | Winerim',
  'Comprehensive wine management for Harrogate''s upscale restaurants and spa town venues.',
  'Harrogate, United Kingdom',
  'Wine list software for restaurants in Harrogate',
  'Transform wine service in Yorkshire''s elegant spa town',
  'Request demo',
  '/demo',
  'Analyse my wine list',
  '/analisis-carta',
  '{"intro": "Harrogate''s affluent demographic and reputation as a health and wellness destination attract sophisticated diners seeking premium dining experiences. The spa town''s elegant character supports fine dining restaurants with discerning wine programs. Restaurants here serve wealthy residents and affluent visitors willing to spend on quality wines.", "stats": [{"label": "Increase in wine sales", "value": "+31%"}, {"label": "Average ticket improvement", "value": "+26%"}, {"label": "Premium wine program penetration", "value": "+73%"}], "country": "United Kingdom", "features": [{"title": "Premium Positioning", "desc": "Tools designed specifically for high-end restaurants serving affluent Harrogate clientele"}, {"title": "Wellness Integration", "desc": "Promote natural wines, organic selections, and biodynamic wines popular with wellness-focused diners"}, {"title": "Exclusive Programs", "desc": "Create wine clubs, reserved allocations, and exclusive member experiences"}, {"title": "Sommelier Excellence", "desc": "Tools that enhance professional sommeliers'' effectiveness and expertise showcasing"}], "problems": ["Justifying premium pricing to discerning affluent customers", "Sourcing exclusive wines unavailable in mainstream markets", "Building sommelier expertise that impresses knowledgeable clients", "Creating exclusive experiences for regular premium customers", "Managing luxury wine inventory efficiently"], "city_name": "Harrogate", "ticket_medio": "£35-52"}'::jsonb,
  '[{"q": "What wines appeal to Harrogate''s affluent customers?", "a": "Premium selections from renowned producers, rare vintages, and exclusive imports work particularly well with this clientele."}, {"q": "How do we source exclusive wines?", "a": "Our supplier network helps you access hard-to-find wines and limited allocations from premium producers."}, {"q": "Can we build collector programs?", "a": "Yes, features for wine collectors include allocation purchasing, vertical tastings, and exclusive releases."}]'::jsonb,
  '["wine-list-software-london", "wine-list-software-chester", "wine-list-software-leeds"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'wine-list-software-cheltenham',
  'city',
  'en',
  'Wine List Software in Cheltenham | Winerim',
  'Smart wine management for Cheltenham''s elegant restaurants and Georgian town venues.',
  'Cheltenham, United Kingdom',
  'Wine list software for restaurants in Cheltenham',
  'Elevate wine service in Gloucestershire''s cultural destination',
  'Request demo',
  '/demo',
  'Analyse my wine list',
  '/analisis-carta',
  '{"intro": "Cheltenham''s elegant Georgian architecture and cultural festivals attract affluent visitors and residents seeking sophisticated dining experiences. The town''s literary and cultural reputation supports restaurants with upscale wine programs. Restaurants here are leveraging wine sophistication to differentiate and attract high-spending diners.", "stats": [{"label": "Increase in wine sales", "value": "+28%"}, {"label": "Average ticket improvement", "value": "+23%"}, {"label": "Festival season premium pricing", "value": "+89%"}], "country": "United Kingdom", "features": [{"title": "Festival Planning", "desc": "Tools for creating special wine programs during Cheltenham''s famous festivals and events"}, {"title": "Cultural Integration", "desc": "Connect wine programs to Cheltenham''s literary and cultural heritage"}, {"title": "Seasonal Menus", "desc": "Adjust wine offerings for peak festival seasons and cultural events"}, {"title": "Visitor Experience", "desc": "Create memorable wine experiences for culturally-minded festival visitors"}], "problems": ["Managing high-volume festival seasons with premium service expectations", "Creating unique wine experiences that match Cheltenham''s cultural identity", "Sourcing wines that appeal to sophisticated cultural audience", "Managing inventory for extreme seasonal variations", "Competing with established fine dining venues"], "city_name": "Cheltenham", "ticket_medio": "£27-43"}'::jsonb,
  '[{"q": "How do we optimize for festival season?", "a": "Create special wine menus featuring festival themes, offer premium selections, and train staff for high-volume sophisticated service."}, {"q": "What wines appeal to cultural visitors?", "a": "Literary connections, regional heritage wines, and storytelling about producers resonate with Cheltenham''s cultural audience."}, {"q": "Can we manage extreme seasonal swings?", "a": "Yes, inventory forecasting and flexible menu management handle peak seasons and quiet periods effectively."}]'::jsonb,
  '["wine-list-software-bath", "wine-list-software-gloucester", "wine-list-software-oxford"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'wine-list-software-stratford-upon-avon',
  'city',
  'en',
  'Wine List Software in Stratford-upon-Avon | Winerim',
  'Wine management tools for Stratford-upon-Avon''s historic theaters and restaurants.',
  'Stratford-upon-Avon, United Kingdom',
  'Wine list software for restaurants in Stratford-upon-Avon',
  'Transform wine service in Shakespeare''s hometown',
  'Request demo',
  '/demo',
  'Analyse my wine list',
  '/analisis-carta',
  '{"intro": "Stratford-upon-Avon''s world-famous theater scene and Shakespeare heritage create a unique market for culturally-rich dining experiences paired with wines. The town attracts millions of international tourists annually seeking authentic English heritage experiences. Restaurants here leverage wine programs to create memorable experiences that enhance cultural visits.", "stats": [{"label": "Increase in wine sales", "value": "+32%"}, {"label": "Average ticket improvement", "value": "+27%"}, {"label": "Tourist recommendation rate", "value": "+81%"}], "country": "United Kingdom", "features": [{"title": "Theater Partnership", "desc": "Coordinate wine experiences with theater visits and pre/post-show dining"}, {"title": "Heritage Storytelling", "desc": "Create wine narratives that connect to Shakespeare and literary history"}, {"title": "Multi-Language Support", "desc": "Serve international visitors with wine descriptions in multiple languages"}, {"title": "Group Dining", "desc": "Tools for managing large theater group reservations with coordinated service"}], "problems": ["Serving extremely high-volume international tourism with quality service", "Creating memorable experiences that enhance cultural theater visits", "Managing language barriers with diverse international tourists", "Coordinating service for large theater group bookings", "Competing with numerous established restaurants in high-tourism market"], "city_name": "Stratford-upon-Avon", "ticket_medio": "£28-45"}'::jsonb,
  '[{"q": "How do we leverage theater partnerships?", "a": "Coordinate with local theatres on package deals, offer pre-theater appetizers, and post-show wine pairings."}, {"q": "What languages should we support?", "a": "English, French, German, Spanish, and Mandarin cover most international tourists visiting Stratford."}, {"q": "How do we manage large group bookings?", "a": "Pre-set wine menus, batch service, and coordinated timing ensure smooth experiences for large groups."}]'::jsonb,
  '["wine-list-software-oxford", "wine-list-software-cheltenham", "wine-list-software-bath"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'wine-list-software-st-andrews',
  'city',
  'en',
  'Wine List Software in St Andrews | Winerim',
  'Wine management software for St Andrews'' university and golf town restaurants.',
  'St Andrews, United Kingdom',
  'Wine list software for restaurants in St Andrews',
  'Enhance wine service in Scotland''s historic university town',
  'Request demo',
  '/demo',
  'Analyse my wine list',
  '/analisis-carta',
  '{"intro": "St Andrews'' world-renowned golf courses and historic university attract affluent visitors and educated students seeking quality dining paired with premium wines. The town''s combination of academic prestige and golf tourism creates a sophisticated market for wine-focused restaurants. Venues here serve wealthy golfers, visiting academics, and discerning students.", "stats": [{"label": "Increase in wine sales", "value": "+30%"}, {"label": "Average ticket improvement", "value": "+25%"}, {"label": "Golf visitor wine spending", "value": "+156%"}], "country": "United Kingdom", "features": [{"title": "Golf Tourism Focus", "desc": "Create premium wine experiences for visiting golfers and golf group events"}, {"title": "University Integration", "desc": "Programs serving both student budgets and faculty entertaining needs"}, {"title": "Business Entertainment", "desc": "Tools for corporate entertaining and business group wine experiences"}, {"title": "Seasonal Golf Events", "desc": "Coordinate wine programs with major golf tournaments and events"}], "problems": ["Serving both budget-conscious students and affluent golf tourists", "Creating golf-themed wine experiences and pairings", "Managing high-volume event entertaining needs", "Justifying premium pricing to discerning golf visitors", "Competing with clubhouse dining wine programs"], "city_name": "St Andrews", "ticket_medio": "£29-46"}'::jsonb,
  '[{"q": "How do we create golf-themed wine experiences?", "a": "Pair wines with golf traditions, feature famous golf course regions, and create memorable entertaining packages."}, {"q": "What wines appeal to golf visitors?", "a": "Premium Scottish selections, prestigious Bordeaux and Burgundy, and exclusive imports work particularly well."}, {"q": "Can we support golf group entertaining?", "a": "Yes, group booking features, pre-set wine selections, and coordinated service handle golf group events seamlessly."}]'::jsonb,
  '["wine-list-software-edinburgh", "wine-list-software-perth", "wine-list-software-dundee"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'wine-list-software-windsor',
  'city',
  'en',
  'Wine List Software in Windsor | Winerim',
  'Intelligent wine management for Windsor''s royal town restaurants and historic venues.',
  'Windsor, United Kingdom',
  'Wine list software for restaurants in Windsor',
  'Elevate wine service in England''s royal residence town',
  'Request demo',
  '/demo',
  'Analyse my wine list',
  '/analisis-carta',
  '{"intro": "Windsor''s royal heritage and proximity to London create a premium market for sophisticated dining experiences with curated wine programs. The town attracts affluent tourists interested in authentic royal England experiences. Restaurants here serve international visitors and wealthy residents seeking elegant wine-focused dining.", "stats": [{"label": "Increase in wine sales", "value": "+29%"}, {"label": "Average ticket improvement", "value": "+24%"}, {"label": "Premium visitor satisfaction", "value": "+79%"}], "country": "United Kingdom", "features": [{"title": "Royal Heritage Theme", "desc": "Create wine narratives that connect to Windsor''s royal history and significance"}, {"title": "Luxury Positioning", "desc": "Tools designed for high-end restaurants serving affluent Windsor clientele"}, {"title": "Tourism Excellence", "desc": "Create memorable experiences for international visitors seeking authentic royal England"}, {"title": "Fine Dining Support", "desc": "Features for Michelin-caliber service and sommelier-led wine programs"}], "problems": ["Creating experiences worthy of Windsor''s royal heritage", "Serving sophisticated international tourists with high expectations", "Justifying premium pricing to discerning visitors", "Sourcing premium wines that match luxury positioning", "Competing with established fine dining venues"], "city_name": "Windsor", "ticket_medio": "£32-48"}'::jsonb,
  '[{"q": "How do we leverage Windsor''s royal heritage?", "a": "Create wine programs highlighting royal suppliers, heritage producers, and wines favored by the royal palate."}, {"q": "What appeals to royal heritage visitors?", "a": "British wines, classic Old World selections, and wines with royal connections resonate particularly well."}, {"q": "Can we create VIP experiences?", "a": "Yes, features for exclusive customer experiences, reserved wines, and personalized service match luxury positioning."}]'::jsonb,
  '["wine-list-software-london", "wine-list-software-oxford", "wine-list-software-chester"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'wine-list-software-guildford',
  'city',
  'en',
  'Wine List Software in Guildford | Winerim',
  'Wine management tools for Guildford''s upscale restaurants and commuter town venues.',
  'Guildford, United Kingdom',
  'Wine list software for restaurants in Guildford',
  'Transform wine service in Surrey''s elegant town center',
  'Request demo',
  '/demo',
  'Analyse my wine list',
  '/analisis-carta',
  '{"intro": "Guildford''s affluent commuter population and location in Surrey wine country create a premium market for wine-focused dining. The town''s upscale character and business entertaining needs support restaurants with sophisticated wine programs. Progressive restaurants are using wine to differentiate and capture affluent customer spending.", "stats": [{"label": "Increase in wine sales", "value": "+26%"}, {"label": "Average ticket improvement", "value": "+21%"}, {"label": "Business entertaining revenue", "value": "+134%"}], "country": "United Kingdom", "features": [{"title": "Commuter Appeal", "desc": "Create wine programs that appeal to affluent professionals seeking after-work entertaining"}, {"title": "Business Dining", "desc": "Tools for facilitating impressive business entertaining and client dinners"}, {"title": "Local Vineyard Partnerships", "desc": "Feature Surrey vineyards and local producers prominently in your program"}, {"title": "Premium Entertaining", "desc": "Create memorable wine experiences that strengthen business relationships"}], "problems": ["Capturing affluent commuter wine spending and business entertaining budgets", "Creating impressive wine experiences for client entertaining", "Sourcing quality local Surrey wines for prominent positioning", "Managing expense account entertaining preferences", "Competing with London restaurants for business entertaining"], "city_name": "Guildford", "ticket_medio": "£25-40"}'::jsonb,
  '[{"q": "How do we appeal to business entertaining?", "a": "Offer impressive wine selections, professional service, and private dining spaces that enhance client relationships."}, {"q": "Which Surrey vineyards should we feature?", "a": "Focus on quality producers with established reputations. We can help identify local wines that impress."}, {"q": "Can we support expense account dining?", "a": "Yes, premium selections and professional service appeal specifically to business entertaining customers."}]'::jsonb,
  '["wine-list-software-london", "wine-list-software-reading", "wine-list-software-windsor"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'wine-list-software-reading',
  'city',
  'en',
  'Wine List Software in Reading | Winerim',
  'Comprehensive wine management for Reading restaurants and business dining venues.',
  'Reading, United Kingdom',
  'Wine list software for restaurants in Reading',
  'Enhance wine programs in the Thames Valley''s business center',
  'Request demo',
  '/demo',
  'Analyse my wine list',
  '/analisis-carta',
  '{"intro": "Reading''s role as a major UK business hub creates demand for sophisticated restaurants supporting corporate entertaining and business dining. The town''s affluent professional population appreciates quality wine service. Restaurants are increasingly leveraging wine programs to attract business diners willing to spend on quality experiences.", "stats": [{"label": "Increase in wine sales", "value": "+24%"}, {"label": "Average ticket improvement", "value": "+19%"}, {"label": "Business account revenue", "value": "+128%"}], "country": "United Kingdom", "features": [{"title": "Corporate Entertaining", "desc": "Tools designed for business group entertaining and corporate wine experiences"}, {"title": "Account Management", "desc": "Features for managing corporate accounts and business entertaining budgets"}, {"title": "Private Dining", "desc": "Support for corporate events and exclusive private wine experiences"}, {"title": "Market Analytics", "desc": "Understand Reading''s business dining wine preferences and trends"}], "problems": ["Competing for business entertaining spending with larger cities", "Creating impressive wine programs for corporate events", "Managing corporate account preferences and budgets", "Sourcing wines that impress business clients", "Coordinating service for large corporate entertaining events"], "city_name": "Reading", "ticket_medio": "£24-39"}'::jsonb,
  '[{"q": "How do we win corporate entertaining business?", "a": "Professional wine programs, business-friendly service, and impressive wine selections differentiate you in the corporate market."}, {"q": "Can we manage corporate accounts?", "a": "Yes, dedicated account management and invoicing features support ongoing corporate entertaining relationships."}, {"q": "What wines work for business entertaining?", "a": "Prestigious labels, proven bestsellers, and impressive selections that don''t require extensive explanation work best."}]'::jsonb,
  '["wine-list-software-london", "wine-list-software-guildford", "wine-list-software-oxford"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'wine-list-software-bournemouth',
  'city',
  'en',
  'Wine List Software in Bournemouth | Winerim',
  'Smart wine management for Bournemouth''s coastal restaurants and beach town venues.',
  'Bournemouth, United Kingdom',
  'Wine list software for restaurants in Bournemouth',
  'Transform wine service in Dorset''s premier seaside destination',
  'Request demo',
  '/demo',
  'Analyse my wine list',
  '/analisis-carta',
  '{"intro": "Bournemouth''s iconic beach location and year-round tourism create strong demand for wine-focused dining experiences. The town''s mix of tourists and affluent residents supports restaurants with sophisticated wine programs. Seafood-focused restaurants especially benefit from strategic wine pairings and sommelier service.", "stats": [{"label": "Increase in wine sales", "value": "+27%"}, {"label": "Average ticket improvement", "value": "+22%"}, {"label": "Seasonal tourist spending", "value": "+152%"}], "country": "United Kingdom", "features": [{"title": "Seafood Pairing", "desc": "Specialized tools for pairing wines with fresh seafood that dominates Bournemouth menus"}, {"title": "Tourism Optimization", "desc": "Flexible seasonal wine programs that adjust for peak summer tourist seasons"}, {"title": "Beachfront Positioning", "desc": "Create wine programs that match the relaxed elegance of coastal dining"}, {"title": "Visitor Experience", "desc": "Tools for creating memorable seaside wine experiences that tourists recommend"}], "problems": ["Managing extreme seasonal variations in customer volume and demographics", "Creating appealing wine pairings for seafood-focused restaurants", "Balancing casual beach atmosphere with sophisticated wine service", "Managing inventory for unpredictable seasonal tourism", "Creating memorable experiences for diverse tourist preferences"], "city_name": "Bournemouth", "ticket_medio": "£26-42"}'::jsonb,
  '[{"q": "How do we pair wines with Bournemouth seafood?", "a": "Our seafood pairing guides help staff recommend perfect wine matches for fish, shellfish, and seafood dishes."}, {"q": "What wines appeal to beach tourists?", "a": "Crisp whites, light reds, and refreshing selections work well in a casual coastal setting."}, {"q": "Can we manage seasonal swings?", "a": "Yes, inventory forecasting and flexible menus help you adjust purchasing for peak and off-season periods."}]'::jsonb,
  '["wine-list-software-southampton", "wine-list-software-plymouth", "wine-list-software-brighton"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'wine-list-software-portsmouth',
  'city',
  'en',
  'Wine List Software in Portsmouth | Winerim',
  'Wine management software for Portsmouth''s waterfront restaurants and maritime heritage venues.',
  'Portsmouth, United Kingdom',
  'Wine list software for restaurants in Portsmouth',
  'Elevate wine service in Hampshire''s historic naval port',
  'Request demo',
  '/demo',
  'Analyse my wine list',
  '/analisis-carta',
  '{"intro": "Portsmouth''s maritime heritage and naval history create a unique market for historic-themed dining with sophisticated wine programs. The port city attracts tourists and naval visitors seeking quality dining experiences. Waterfront restaurants are leveraging wine programs to enhance heritage-focused dining narratives.", "stats": [{"label": "Increase in wine sales", "value": "+25%"}, {"label": "Average ticket improvement", "value": "+20%"}, {"label": "Tourist heritage experience premium", "value": "+64%"}], "country": "United Kingdom", "features": [{"title": "Maritime Heritage", "desc": "Create wine programs that celebrate naval history and maritime traditions"}, {"title": "Waterfront Positioning", "desc": "Tools for upscale waterfront dining experiences overlooking historic ports"}, {"title": "Naval Visitor Appeal", "desc": "Wine programs that appeal to naval personnel and maritime heritage tourists"}, {"title": "Group Naval Events", "desc": "Support for military and naval group entertaining and special events"}], "problems": ["Creating maritime-themed wine experiences and narratives", "Balancing historic heritage storytelling with contemporary dining", "Appealing to diverse military and civilian visitors", "Managing wine pricing for varied customer demographics", "Competing with established waterfront venues"], "city_name": "Portsmouth", "ticket_medio": "£23-38"}'::jsonb,
  '[{"q": "How do we create maritime wine themes?", "a": "Highlight wines from naval-connected regions, feature historic producers, and tell stories connecting wine to maritime heritage."}, {"q": "What appeals to naval visitors?", "a": "Prestigious selections, wines with ship or explorer names, and professional service resonate with naval visitors."}, {"q": "Can we host naval group events?", "a": "Yes, group management features and custom wine menus support military and naval group entertaining."}]'::jsonb,
  '["wine-list-software-southampton", "wine-list-software-brighton", "wine-list-software-london"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'wine-list-software-ipswich',
  'city',
  'en',
  'Wine List Software in Ipswich | Winerim',
  'Intelligent wine management for Ipswich restaurants and Suffolk dining venues.',
  'Ipswich, United Kingdom',
  'Wine list software for restaurants in Ipswich',
  'Transform wine service in Suffolk''s county town',
  'Request demo',
  '/demo',
  'Analyse my wine list',
  '/analisis-carta',
  '{"intro": "Ipswich''s historic waterfront heritage and growing food scene create opportunities for wine-focused restaurants to differentiate. The county town attracts discerning diners interested in quality local produce paired with wines. Suffolk''s agricultural heritage pairs naturally with wine program development.", "stats": [{"label": "Increase in wine sales", "value": "+23%"}, {"label": "Average ticket improvement", "value": "+17%"}, {"label": "Local food & wine partnership revenue", "value": "+98%"}], "country": "United Kingdom", "features": [{"title": "Local Food Partnerships", "desc": "Connect wine programs with Suffolk food producers and local ingredients"}, {"title": "Waterfront Positioning", "desc": "Tools for leveraging Ipswich''s historic waterfront in wine experiences"}, {"title": "Agricultural Connection", "desc": "Highlight natural pairings between local food and wine programs"}, {"title": "Community Building", "desc": "Create local wine events and producer partnerships that build community"}], "problems": ["Building wine program credibility in an emerging wine market", "Sourcing wines that pair with local Suffolk food", "Creating distinctive programs in a small market", "Attracting wine-focused customers to a traditional restaurant town", "Competing with established venues in nearby Norwich"], "city_name": "Ipswich", "ticket_medio": "£20-34"}'::jsonb,
  '[{"q": "How do we connect with Suffolk food producers?", "a": "Build direct relationships with local producers and feature their products alongside paired wines on your menu."}, {"q": "What wines work with local food?", "a": "English wines, regional selections, and natural wines complement Suffolk''s local food movement well."}, {"q": "Can we host local food and wine events?", "a": "Yes, event hosting features make it easy to organize producer collaborations and local food celebrations."}]'::jsonb,
  '["wine-list-software-norwich", "wine-list-software-cambridge", "wine-list-software-london"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'wine-list-software-colchester',
  'city',
  'en',
  'Wine List Software in Colchester | Winerim',
  'Wine management tools for Colchester''s historic restaurants and Essex dining venues.',
  'Colchester, United Kingdom',
  'Wine list software for restaurants in Colchester',
  'Enhance wine service in England''s oldest recorded town',
  'Request demo',
  '/demo',
  'Analyse my wine list',
  '/analisis-carta',
  '{"intro": "Colchester''s position as England''s oldest recorded town and growing food scene create opportunities for historically-themed wine dining experiences. The town''s mix of heritage tourism and local residents supports restaurants seeking to build sophisticated wine programs. Essex''s wine region growth influences local dining trends.", "stats": [{"label": "Increase in wine sales", "value": "+24%"}, {"label": "Average ticket improvement", "value": "+18%"}, {"label": "Heritage experience satisfaction", "value": "+71%"}], "country": "United Kingdom", "features": [{"title": "Historic Narrative", "desc": "Create wine programs that celebrate Colchester''s 2000-year history"}, {"title": "Essex Wine Region", "desc": "Highlight Essex vineyard producers and support local wine growing"}, {"title": "Heritage Tourism", "desc": "Create wine experiences for history-focused tourists visiting Colchester"}, {"title": "Castle Integration", "desc": "Coordinate wine experiences with the castle museum and heritage sites"}], "problems": ["Leveraging historic heritage in contemporary wine programs", "Sourcing quality Essex wines for prominent positioning", "Attracting heritage tourists to wine-focused dining", "Creating distinctive programs in competition with larger nearby cities", "Building wine culture credibility in traditional market"], "city_name": "Colchester", "ticket_medio": "£21-36"}'::jsonb,
  '[{"q": "How do we leverage Colchester''s historic heritage?", "a": "Tell stories connecting wines to Colchester''s 2000-year history and create historically-themed pairing experiences."}, {"q": "Which Essex wines should we feature?", "a": "Focus on quality Essex producers. We can guide you toward established vineyards with strong reputations."}, {"q": "Can we coordinate with castle attractions?", "a": "Yes, we help you develop partnerships with tourism attractions for package deals and cross-promotions."}]'::jsonb,
  '["wine-list-software-london", "wine-list-software-ipswich", "wine-list-software-norwich"]'::jsonb,
  'Article',
  true
);

COMMIT;

-- ============ ITALY (50 cities) ============
BEGIN;

-- Italian Cities Wine Software - Part 1 of 2
-- Generated for seo_pages table

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-roma',
  'city',
  'it',
  'Software per la Carta dei Vini a Roma | Winerim',
  'Gestisci la tua carta dei vini a Roma con il nostro software innovativo. Aumenta le vendite e migliora l''esperienza enogastronomica.',
  'Roma, Italia',
  'Software per la carta dei vini per ristoranti a Roma',
  'Perfetto per le trattorie e i wine bar del centro storico',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "La capitale italiana merita una carta dei vini all''altezza della sua tradizione gastronomica. Winerim ti aiuta a gestire i vini laziali e internazionali con facilità, aumentando le vendite e creando esperienze memorabili per i tuoi clienti.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+28%"}, {"label": "Miglioramento dello scontrino medio", "value": "+22%"}, {"label": "Ordini ricorrenti", "value": "+31%"}], "country": "Italia", "features": [{"title": "Gestione semplificata della carta", "desc": "Organizziamo i tuoi vini Castelli Romani e le prestigiose selezioni laziali in categorie intuitive."}, {"title": "Suggerimenti AI per gli abbinamenti", "desc": "Il nostro sistema consiglia i migliori vini per piatti tipici romani: cacio e pepe, carbonara, amatriciana."}, {"title": "Tracking dell''inventario in tempo reale", "desc": "Monitora le tue scorte di vini locali e importati senza mai rimanere senza stock."}, {"title": "Integrazione con i sistemi POS", "desc": "Sincronizzazione automatica con il tuo gestionale per una gestione seamless della carta."}], "problems": ["Difficoltà a gestire una carta vini complessa e disorganizzata", "Scarsi abbinamenti cibo-vino che deludono i clienti", "Perdita di vendite per vini fuori catalogo o esauriti", "Mancanza di analisi su quali vini vendono meglio", "Impossibilità di aggiornare la carta in tempo reale"], "city_name": "Roma", "ticket_medio": "35-50€"}'::jsonb,
  '[{"q": "Quali sono i migliori vini da offrire a Roma?", "a": "I Castelli Romani rimangono una scelta eccellente per i bianchi freschi. Affianchiamoli con selezioni toscane (Brunello, Chianti) e piemontesi (Barolo, Barbaresco) per una carta completa."}, {"q": "Come aumentare le vendite di vino in un ristorante romano?", "a": "Con abbinamenti intelligenti ai piatti della cucina laziale e una carta ben organizzata. Winerim suggerisce i vini perfetti per ogni piatto, incrementando lo scontrino medio."}, {"q": "Quale software usano i migliori ristoranti di Roma?", "a": "I ristoranti di qualità scelgono Winerim per la facilità di gestione, le analisi dettagliate e il supporto nella selezione dei vini locali."}]'::jsonb,
  '["software-carta-dei-vini-firenze", "software-carta-dei-vini-torino"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-milano',
  'city',
  'it',
  'Software per la Carta dei Vini a Milano | Winerim',
  'Gestisci la carta dei vini nel cuore della moda milanese. Software intelligente per wine bar e ristoranti stellati.',
  'Milano, Italia',
  'Software per la carta dei vini per ristoranti a Milano',
  'Per chi vuole offrire il meglio nella ristorazione milanese',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Milano è il capoluogo dell''innovazione culinaria italiana. Gestisci la tua carta dei vini con un software all''altezza della tua ambizione, scegliendo fra le migliori selezioni piemontesi, lombarde e oltre.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+25%"}, {"label": "Miglioramento dello scontrino medio", "value": "+19%"}, {"label": "Clienti soddisfatti", "value": "96%"}], "country": "Italia", "features": [{"title": "Selezione premium di vini lombardi", "desc": "Accesso ai migliori Franciacorta e vini della Franciacorta per elevare la tua offerta."}, {"title": "Analisi delle tendenze enologiche", "desc": "Scopri quali vini appassionano di più la clientela milanese con dati in tempo reale."}, {"title": "Etichette digitali interattive", "desc": "Mostra le schede tecniche dei tuoi vini sul tablet dei camerieri con abbinamenti professionali."}, {"title": "Gestione menu degustazione", "desc": "Crea facilmente menu abbinamento vino-piatto per esperienze indimenticabili."}], "problems": ["Competizione aggressiva con locali vicini a Milano", "Clienti sofisticati che richiedono conoscenze enologiche approfondite", "Gestione di carte vini molto grandi e complesse", "Difficoltà nell''aggiornare le selezioni in base alle stagioni", "Mancanza di dati su preferenze e feedback dei clienti"], "city_name": "Milano", "ticket_medio": "45-70€"}'::jsonb,
  '[{"q": "Quali vini scegliere per un ristorante stellato a Milano?", "a": "Una selezione che equilibri eccellenze piemontesi (Gavi, Barolo), toscane (Vino Nobile di Montepulciano) e lombarde (Franciacorta). Winerim ti aiuta a curarla."}, {"q": "Come gestire una carta vini molto ampia a Milano?", "a": "Con il nostro software, organizziamo centinaia di etichette in categorie smart, permettendo ai tuoi ospiti di scoprire il vino perfetto in pochi secondi."}, {"q": "Quale strategia di pricing per i vini a Milano?", "a": "Analizzare i dati per comprendere quale margine funziona meglio per la tua clientela. Winerim fornisce tutte le metriche necessarie."}]'::jsonb,
  '["software-carta-dei-vini-torino", "software-carta-dei-vini-bologna"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-napoli',
  'city',
  'it',
  'Software per la Carta dei Vini a Napoli | Winerim',
  'Scopri il software per gestire la carta dei vini a Napoli. Perfetto per pizzerie, trattorie e wine bar del Sud.',
  'Napoli, Italia',
  'Software per la carta dei vini per ristoranti a Napoli',
  'Abbina i vini vulcanici campani alla tua cucina partenopea',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Napoli ha una tradizione vinicola straordinaria: dai bianchi vulcanici del Vesuvio ai rossi eleganti di Taurasi. Winerim ti aiuta a valorizzare questi tesori locali, aumentando le vendite e conquistando gli amanti dei vini campani.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+30%"}, {"label": "Miglioramento dello scontrino medio", "value": "+26%"}, {"label": "Nuovi clienti", "value": "+18%"}], "country": "Italia", "features": [{"title": "Specializzazione nei vini campani", "desc": "Accesso alle migliori etichette di Vesuvio, Taurasi, Greco di Tufo e Fiano di Avellino."}, {"title": "Abbinamenti con la cucina partenopea", "desc": "Suggerimenti intelligenti per marinetti, pezzogna al forno e piatti storici napoletani."}, {"title": "Marketing localizzato", "desc": "Promozioni mirate sui vini della regione per attrarre enofili e turisti esigenti."}, {"title": "Feedback clienti avanzati", "desc": "Raccogli opinioni sui vini e scopri quali creare per il futuro della tua cantina."}], "problems": ["Fama della cucina napoletana che oscura i vini locali", "Clienti non sempre consapevoli della qualità enologica campana", "Difficoltà nel reperire alcuni vini vulcanici particolari", "Gestione di ristoranti piccoli con spazi limitati", "Competizione dai vini più noti di altre regioni"], "city_name": "Napoli", "ticket_medio": "25-45€"}'::jsonb,
  '[{"q": "Quali sono i migliori vini da servire a Napoli?", "a": "Assolutamente i vini vulcanici campani: Vesuvio Bianco, Greco di Tufo, Fiano di Avellino per i bianchi; Taurasi e Aglianico per i rossi. Sono vini che raccontano la storia di Napoli."}, {"q": "Come abbinare i vini campani alla pizza napoletana?", "a": "Un Vesuvio Bianco affumicato si abbina magistralmente a una pizza ricca di mozzarella; per pizze con carni, scegli un Taurasi giovane e fresco."}, {"q": "Come convincere i clienti a provare i vini locali?", "a": "Racconta la storia dei vini vulcanici campani. Winerim ti aiuta con schede tecniche e suggerimenti che rendono ogni bicchiere un''esperienza educativa."}]'::jsonb,
  '["software-carta-dei-vini-salerno", "software-carta-dei-vini-roma"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-torino',
  'city',
  'it',
  'Software per la Carta dei Vini a Torino | Winerim',
  'Gestisci la carta dei vini a Torino con il miglior software enologico. Barolo, Barbaresco e le eccellenze piemontesi.',
  'Torino, Italia',
  'Software per la carta dei vini per ristoranti a Torino',
  'Celebra i vini del Piemonte con una carta curata',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Torino è la porta verso i vini più nobili d''Italia. Il Barolo e il Barbaresco rappresentano il culmine della viticoltura mondiale. Con Winerim, organizza una carta che racconta l''eccellenza piemontese, affascinando ogni ospite con le giuste selezioni.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+32%"}, {"label": "Miglioramento dello scontrino medio", "value": "+29%"}, {"label": "Enofili attratti", "value": "+24%"}], "country": "Italia", "features": [{"title": "Specializzazione Barolo e Barbaresco", "desc": "Gestisci le migliori annate di questi vini leggendari con schede tecniche di degustazione."}, {"title": "Note di tasting professionale", "desc": "Descrizioni sensoriali dettagliate per guidare il cameriere nelle vendite Barolo e Barbaresco."}, {"title": "Gestione annate multiple", "desc": "Organizza una cantina con vini di diverse annate per soddisfare collezionisti e sommelier."}, {"title": "Suggerimenti d''invecchiamento", "desc": "Consigli su quali Barolo hanno ancora potenziale di miglioramento in cantina."}], "problems": ["Prezzi elevati dei Barolo e Barbaresco che spaventano i clienti", "Difficoltà a spiegare le differenze fra le diverse denominazioni piemontesi", "Gestione di una cantina di vini pregiati e fragili", "Rischio di vendere vini non ancora al loro apice di evoluzione", "Competizione con le enotecche specializzate"], "city_name": "Torino", "ticket_medio": "50-90€"}'::jsonb,
  '[{"q": "Quali sono le migliori annate di Barolo e Barbaresco da offrire?", "a": "Dipende dal profilo di invecchiamento: le annate più vecchie (2008-2010) sono già pronte, mentre 2014-2016 promettono ancora grande evoluzione. Winerim ti aiuta a consigliare bene."}, {"q": "Come spiegare la differenza fra Barolo e Barbaresco ai clienti?", "a": "Il Barolo ha struttura e potenza superiori, richiede più tempo d''affinamento. Il Barbaresco è più elegante e sfumato. Entrambi sono capolavori del Piemonte."}, {"q": "Quale margine applicare ai Barolo di lusso?", "a": "Per i Barolo d''annate nobili, un margine del 40-50% è appropriato. Winerim analizza i tuoi prezzi per ottimizzare profittabilità e competitività."}]'::jsonb,
  '["software-carta-dei-vini-alba", "software-carta-dei-vini-milano"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-firenze',
  'city',
  'it',
  'Software per la Carta dei Vini a Firenze | Winerim',
  'Software per gestire la carta dei vini a Firenze. Chianti, Vino Nobile e le eccellenze toscane.',
  'Firenze, Italia',
  'Software per la carta dei vini per ristoranti a Firenze',
  'Dal Chianti al Brunello, governa i vini della Toscana',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Firenze è il cuore della Toscana vinicola. Il Chianti Classico, il Vino Nobile di Montepulciano e il Brunello di Montalcino sono tesori a pochi chilometri. Winerim trasforma questi vini in alleati del tuo ristorante, aumentando fatturato e reputazione enologica.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+27%"}, {"label": "Miglioramento dello scontrino medio", "value": "+23%"}, {"label": "Turisti enofili", "value": "+21%"}], "country": "Italia", "features": [{"title": "Specializzazione Chianti e Brunello", "desc": "Accesso alle migliori cantine toscane e gestione della loro complessità con semplicità."}, {"title": "Carta con territorio toscano", "desc": "Mostra la provenienza geografica esatta di ogni vino, affascinando i clienti con la storia del territorio."}, {"title": "Suggerimenti per piatti toscani", "desc": "Abbinamenti intelligenti per bistecca alla fiorentina, ribollita e altri classici fiorentini."}, {"title": "Promozioni stagionali", "desc": "Gestisci vendite speciali per le nuove annate toscane e le selezioni di fine vendemmia."}], "problems": ["Troppi Chianti disponibili, difficile orientarsi nella scelta", "Clienti che confondono Chianti semplice con Chianti Classico Riserva", "Gestione di cantine storiche con regole DOCG complesse", "Difficoltà nel far comprendere il valore dei vini toscani superiori", "Competizione fra i tanti ristoranti wine-focused di Firenze"], "city_name": "Firenze", "ticket_medio": "40-65€"}'::jsonb,
  '[{"q": "Quale differenza fra Chianti, Chianti Classico e Chianti Classico Riserva?", "a": "Il Chianti è il base. Il Chianti Classico proviene da una zona precisa fra Firenze e Siena. La Riserva è invecchiata più a lungo (min. 3 anni). Winerim semplifica queste distinzioni."}, {"q": "Come abbinare i vini toscani ai piatti fiorentini?", "a": "Chianti vivace con piatti leggeri; Vino Nobile con formaggi; Brunello con carni grigliate. Ogni vino toscano ha il suo abbinamento perfetto."}, {"q": "Quali Brunello scegliere per la carta di un ristorante fiorentino?", "a": "Dai Brunello accessibili (12-15 anni di elevazione) ai Riserva più complessi (20+ anni). Winerim ti aiuta a curare una selezione che piace a tutti i palati."}]'::jsonb,
  '["software-carta-dei-vini-siena", "software-carta-dei-vini-roma"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-bologna',
  'city',
  'it',
  'Software per la Carta dei Vini a Bologna | Winerim',
  'Gestisci la carta vini a Bologna per trattorie e ristoranti. Piacevoli, Lambrusco e eccellenze dell''Emilia.',
  'Bologna, Italia',
  'Software per la carta dei vini per ristoranti a Bologna',
  'I vini dell''Emilia Romagna nella tua trattoria',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Bologna merita una carta vini all''altezza della sua gastronomia leggendaria. I Piacevoli, il Lambrusco e il Trebbiano dell''Emilia Romagna sono perfetti abbinamenti per la pasta fresca, i salumi DOP e i formaggi locali. Winerim organizza questa ricchezza con facilità e stile.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+26%"}, {"label": "Miglioramento dello scontrino medio", "value": "+20%"}, {"label": "Soddisfazione clienti", "value": "+33%"}], "country": "Italia", "features": [{"title": "Specializzazione vini emiliani", "desc": "Accesso a Piacevoli, Lambrusco, Trebbiano e vini naturali dell''Emilia Romagna."}, {"title": "Abbinamenti con la cucina locale", "desc": "Suggerimenti per tagliatelle al ragù, tortellini, mortadella e altri piatti bolognesi iconici."}, {"title": "Gestione di vini frizzanti", "desc": "Specializzazione nella conservazione e servizio di vini naturali e frizzanti emiliani."}, {"title": "Schede tecniche multilingue", "desc": "Attrai turisti internazionali con descrizioni dei vini in italiano, inglese e tedesco."}], "problems": ["Percezione che i vini emiliani siano ''semplici'' o secondari", "Difficoltà nell''abbinare il Lambrusco ai piatti moderni", "Gestione di vini frizzanti che richiedono condizioni di conservazione particolari", "Competizione da cantine storiche con molti anni di reputazione", "Clienti che preferiscono vini toscani o piemontesi ai locali"], "city_name": "Bologna", "ticket_medio": "30-50€"}'::jsonb,
  '[{"q": "Come aumentare le vendite di Lambrusco nel mio ristorante?", "a": "Spiega che il Lambrusco moderno non è il Lambrusco dolce anni ''80. Oggi sono vini secchi, eleganti e versatili. Abbinali con piatti inaspettati: sushi, carni rosse."}, {"q": "Quali vini scegliere per una carta ''made in Emilia''?", "a": "Piacevoli bianchi, Lambrusco rosato, Trebbiano dell''Emilia, e almeno un rosso secco come il Barbera. Una carta emiliana autentica valorizza la cucina locale."}, {"q": "Come gestire vini frizzanti e naturali nella mia carta?", "a": "Con il nostro software, organizziamo le condizioni di conservazione, le date di apertura e i tempi di consumo consigliati per vini delicati."}]'::jsonb,
  '["software-carta-dei-vini-modena", "software-carta-dei-vini-parma"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-palermo',
  'city',
  'it',
  'Software per la Carta dei Vini a Palermo | Winerim',
  'Software per la carta vini a Palermo. Nero d''Avola, Marsala e i vini della Sicilia nel tuo ristorante.',
  'Palermo, Italia',
  'Software per la carta dei vini per ristoranti a Palermo',
  'I vini siciliani che conquistano il mondo, ora nel tuo locale',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Palermo è la porta ai vini magnifici della Sicilia: Nero d''Avola, Grillo, Nerello Mascalese e il leggendario Marsala. Questi vini raccontano la storia di un''isola affascinante. Con Winerim, governa questa ricchezza, attraendo enofili da tutta Italia e dal mondo.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+29%"}, {"label": "Miglioramento dello scontrino medio", "value": "+25%"}, {"label": "Clienti internazionali", "value": "+35%"}], "country": "Italia", "features": [{"title": "Specializzazione vini siciliani", "desc": "Accesso ai migliori produttori di Nero d''Avola, Grillo, Nerello Mascalese e Marsala."}, {"title": "Descrizioni affascinanti", "desc": "Storie dei vini siciliani che affascinano turisti e appassionati, trasformando ogni bicchiere in un''esperienza."}, {"title": "Abbinamenti con cucina palermitana", "desc": "Suggerimenti per arancini, pasta alla Norma, pesce spada e piatti tipici siciliani."}, {"title": "Gestione Marsala e fortificati", "desc": "Conservazione e servizio perfetti per Marsala, Vermouth e altri vini fortificati siciliani."}], "problems": ["Scarsa conoscenza internazionale dei vini siciliani rispetto a toscani/piemontesi", "Difficoltà nel reperire produttori siciliani autentici e di qualità", "Gestione di vini dalle note olfattive complesse e diverse", "Clienti che associano la Sicilia solo al Marsala dolce", "Concorrenza dai grandi brand storici di vini siciliani"], "city_name": "Palermo", "ticket_medio": "28-48€"}'::jsonb,
  '[{"q": "Quali sono i migliori vini della Sicilia da offrire?", "a": "Nero d''Avola per i rossi eleganti, Grillo per i bianchi freschi, Nerello Mascalese dell''Etna per la complessità. Aggiungi un Marsala secco e avrai una carta siciliana completa."}, {"q": "Come abbinare i vini siciliani al arancino e ai piatti palermitani?", "a": "Un Grillo fresco con arancini; Nero d''Avola con caponata e pesce; Marsala secco con cannoli. La Sicilia ha vini per ogni abbinamento."}, {"q": "Perché i vini siciliani sono sottovalutati rispetto ai toscani?", "a": "Questione di marketing storico. Ma oggi i vini siciliani conquistano i migliori sommelier mondiali. Raccontare questa storia attira clientela consapevole."}]'::jsonb,
  '["software-carta-dei-vini-messina", "software-carta-dei-vini-napoli"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-genova',
  'city',
  'it',
  'Software per la Carta dei Vini a Genova | Winerim',
  'Gestisci la carta vini a Genova per ristoranti di pesce. Vermentino, Pigato e i bianchi liguri.',
  'Genova, Italia',
  'Software per la carta dei vini per ristoranti a Genova',
  'Bianchi liguri freschi per la cucina del mare',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Genova è il porto del Mediterraneo, la capitale della cucina marinara. I vini liguri - Vermentino, Pigato, Cinque Terre - sono i compagni perfetti per il pesce fresco e il pesto. Winerim ti aiuta a costruire una carta che celebra il mare e la Liguria.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+23%"}, {"label": "Miglioramento dello scontrino medio", "value": "+18%"}, {"label": "Clienti fidelizzati", "value": "+28%"}], "country": "Italia", "features": [{"title": "Specializzazione bianchi liguri", "desc": "Accesso ai migliori Vermentino, Pigato e vini del Cinque Terre, perfetti con il pesce."}, {"title": "Abbinamenti pesce-vino", "desc": "Suggeri il vino ligure perfetto per ogni piatto di pesce della tua cucina."}, {"title": "Gestione vini freschi e delicati", "desc": "Conservazione ottimale per bianchi delicati che richiedono cure particolari."}, {"title": "Storie di territorio", "desc": "Racconta le teorie di vigneti su scogliere a picco sul mare che producono questi vini unici."}], "problems": ["Dominanza della cucina di pesce che richiede specifiche di vino", "Difficoltà nel conservare bianchi delicati alle giuste temperature", "Clienti che preferiscono vini più importanti e strutturati", "Limitata reperibilità di alcuni vini liguri particolari", "Necessità di spiegare frequentemente l''abbinamento con piatti marinari"], "city_name": "Genova", "ticket_medio": "32-52€"}'::jsonb,
  '[{"q": "Quali vini liguri scegliere per un ristorante di pesce?", "a": "Vermentino e Pigato sono i classici. Aggiungi un Cinque Terre Bianco per i turisti, e un rosato secco per versatilità. Evita rossi pesanti che soffocano il pesce."}, {"q": "Come abbinare il Vermentino ai piatti di pesce?", "a": "Il Vermentino è leggero e sapido: perfetto con branzino al forno, orata, muscoli. La sua salinità amplifica i sapori del mare."}, {"q": "Come conservare i bianchi liguri nel mio ristorante?", "a": "Temperature fra 8-10°C costanti, lontano dalla luce. Winerim monitora i parametri di conservazione per garantire qualità ottimale."}]'::jsonb,
  '["software-carta-dei-vini-cinque-terre", "software-carta-dei-vini-porto-venere"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-venezia',
  'city',
  'it',
  'Software per la Carta dei Vini a Venezia | Winerim',
  'Software per gestire la carta vini a Venezia. Prosecco, vini veneti e le bollicine del Nordest.',
  'Venezia, Italia',
  'Software per la carta dei vini per ristoranti a Venezia',
  'Prosecco e vini veneti nel cuore della laguna',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Venezia è sinonimo di Prosecco, di aperitivi che risuonano fra i canali, di celebrazioni effervescenti. Ma il Veneto offre anche vini fermi straordinari: Amarone, Bardolino, Soave. Con Winerim, governa questa ricchezza, trasformando ogni tavolo in un''occasione di scoperta enologica.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+31%"}, {"label": "Miglioramento dello scontrino medio", "value": "+27%"}, {"label": "Prosecco venduti", "value": "+45%"}], "country": "Italia", "features": [{"title": "Specializzazione Prosecco", "desc": "Gestisci diverse DOCG di Prosecco (Valdobbiadene, Asolo) e le loro sfumature."}, {"title": "Proposte di upgrade", "desc": "Suggerisci Prosecco premium, Amarone e altri vini quando i clienti ordinano aperitivi."}, {"title": "Gestione bollicine", "desc": "Temperature, pressione, modalità di servizio perfetti per Prosecco e spumanti veneti."}, {"title": "Storie di terroir veneto", "desc": "Racconta le colline turchine del Prosecco e le valli dove nasce il grande Amarone."}], "problems": ["Percezione che il Prosecco sia ''vino semplice'' o inferiore allo Champagne", "Difficoltà nel gestire l''esplosione di ordini di Prosecco in alta stagione", "Clienti che non conoscono i vini fermi veneti di qualità", "Margini bassi su Prosecco venduto in quantità", "Gestione della catena del freddo per bollicine in una città umida"], "city_name": "Venezia", "ticket_medio": "35-55€"}'::jsonb,
  '[{"q": "Quale Prosecco scegliere per la mia carta veneziana?", "a": "Prosecco di Valdobbiadene DOCG per bianchi freschi; Asolo DOCG per maggiore complessità. Almeno un Prosecco Superiore Riserva per clienti esigenti."}, {"q": "Come insegnare ai clienti la qualità del Prosecco italiano?", "a": "Il Prosecco non compete con lo Champagne, ha il suo fascino: fresco, festoso, facile. I turisti amano questa autenticità veneziana."}, {"q": "Quali altri vini veneti offrire oltre al Prosecco?", "a": "Amarone della Valpolicella per i rossi potenti, Soave per i bianchi eleganti, Bardolino per versatilità. Una carta veneta completa sedurrà ogni palato."}]'::jsonb,
  '["software-carta-dei-vini-verona", "software-carta-dei-vini-treviso"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-verona',
  'city',
  'it',
  'Software per la Carta dei Vini a Verona | Winerim',
  'Gestisci la carta vini a Verona. Amarone, Valpolicella e i grandi rossi del Veneto nel tuo ristorante.',
  'Verona, Italia',
  'Software per la carta dei vini per ristoranti a Verona',
  'Amarone della Valpolicella: il cuore della viticoltura veneta',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Verona è la culla dell''Amarone della Valpolicella, uno dei grandi rossi italiani. Qui i vini non sono semplici bevande, ma protagonisti di ogni pasto. Con Winerim, governa una carta che celebra l''Amarone e i suoi vini fratelli (Valpolicella, Recioto), aumentando fatturato e reputazione enologica.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+34%"}, {"label": "Miglioramento dello scontrino medio", "value": "+31%"}, {"label": "Clienti sommelier-friendly", "value": "+26%"}], "country": "Italia", "features": [{"title": "Specializzazione Amarone", "desc": "Accesso alle migliori cantine Amarone, con dettagli su uvaggio, invecchiamento e potenziale."}, {"title": "Gestione vini di lusso", "desc": "Conservazione in cantina a temperatura costante per Amarone che possono valere centinaia di euro."}, {"title": "Note di tasting dettagliate", "desc": "Descrizioni sensoriali che guidano il cameriere nelle vendite di vini complessi e ricchi."}, {"title": "Suggerimenti d''abbinamento", "desc": "Amarone con carni arrostite, formaggi stagionati, piatti della cucina veronese."}], "problems": ["Prezzi elevati dell''Amarone che intimoriscono clienti casual", "Difficoltà a spiegare le sfumature fra Valpolicella, Valpolicella Superiore e Amarone", "Gestione di una cantina con vini di lusso ad alto valore", "Rischio di versare Amarone a temperature non corrette", "Competizione da wine bar specializzati storici di Verona"], "city_name": "Verona", "ticket_medio": "45-75€"}'::jsonb,
  '[{"q": "Qual è la differenza fra Amarone, Valpolicella e Recioto?", "a": "Valpolicella è il rosso base fresco. Amarone è fatto con uva appassita, più concentrato e potente. Recioto è dolce. Tutti nati dalla stessa zona, ma vini completamente diversi."}, {"q": "Quale prezzo applicare all''Amarone?", "a": "Un margine del 50-60% è standard per Amarone di qualità. Clienti che cercano Amarone sa che è investimento. Winerim ottimizza il pricing in base a scarsità e domanda."}, {"q": "Come servire al meglio un grande Amarone?", "a": "In bicchieri ampi, a temperatura 16-18°C, decantato 30 minuti prima. Il nostro software ricorda al cameriere i parametri di servizio per ogni vino."}]'::jsonb,
  '["software-carta-dei-vini-bolzano", "software-carta-dei-vini-trento"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-bari',
  'city',
  'it',
  'Software per la Carta dei Vini a Bari | Winerim',
  'Software per gestire la carta vini a Bari. Primitivo, Nero di Troia e i vini della Puglia nel tuo ristorante.',
  'Bari, Italia',
  'Software per la carta dei vini per ristoranti a Bari',
  'I vini del Salento e dell''Itria nel tuo bicchiere',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Bari è la porta ai vini meravigliosi della Puglia: Primitivo, Nero di Troia, Negroamaro. Questi vini robusti e generosi raccontano il caldo sole del Sud. Con Winerim, costruisci una carta che celebra la Puglia, conquistando enofili che scoprono il Sud italiano attraverso il vino.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+28%"}, {"label": "Miglioramento dello scontrino medio", "value": "+24%"}, {"label": "Discoverers di vini pugliesi", "value": "+32%"}], "country": "Italia", "features": [{"title": "Specializzazione vini pugliesi", "desc": "Accesso ai migliori Primitivo, Nero di Troia, Negroamaro e vini naturali della Puglia."}, {"title": "Abbinamenti con cucina barese", "desc": "Suggerimenti per orecchiette alle cime di rapa, tiella, caponata e piatti tipici pugliesi."}, {"title": "Gestione di vini ad alta gradazione", "desc": "Consigli su conservazione e servizio di vini robusti del Sud che raggiungono 15-16% alc."}, {"title": "Promozioni su vini emergenti", "desc": "Scopri nuovi produttori pugliesi e proponi loro vini a prezzi vantaggiosi per creare fedeltà."}], "problems": ["Scarsa reputazione internazionale dei vini pugliesi rispetto al Nord", "Clienti che non conoscono la qualità del Primitivo e Nero di Troia", "Difficoltà nel reperire piccoli produttori di qualità in Puglia", "Gestione di vini molto caldi (gradazione alta) che richiedono accortezza nel servizio", "Competizione da nuovi wine bar che scoprono la Puglia"], "city_name": "Bari", "ticket_medio": "24-44€"}'::jsonb,
  '[{"q": "Quali sono i migliori vini della Puglia da offrire?", "a": "Primitivo di Manduria per i rossi generosi, Nero di Troia per eleganza, Negroamaro per versatilità. Aggiungi un bianco come Verdica per completezza."}, {"q": "Come abbinare i vini pugliesi ai piatti barese?", "a": "Primitivo con orecchiette e salsiccia; Nero di Troia con pesce spada; Negroamaro con caponata. Ogni vino pugliese trova il suo piatto ideale."}, {"q": "Perché i vini della Puglia sono più economici?", "a": "Non è inferiore qualità, ma minor riconoscimento storico. Oggi sommelier di tutta Italia scelgono Primitivo e Nero di Troia. Proporzionalmente, offrono il miglior rapporto qualità-prezzo."}]'::jsonb,
  '["software-carta-dei-vini-lecce", "software-carta-dei-vini-brindisi"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-catania',
  'city',
  'it',
  'Software per la Carta dei Vini a Catania | Winerim',
  'Gestisci la carta vini a Catania. Nero d''Avola, Nerello Mascalese e i vini vulcanici dell''Etna.',
  'Catania, Italia',
  'Software per la carta dei vini per ristoranti a Catania',
  'Vini vulcanici dell''Etna: il terroir più interessante d''Italia',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Catania è alle pendici dell''Etna, il vulcano che produce alcuni dei vini più affascinanti d''Italia. Il Nerello Mascalese è eleganza vulcanica. Con Winerim, governa una carta che celebra l''unicità dell''Etna, attraendo sommelier e enofili che ricercano vini memorabili.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+30%"}, {"label": "Miglioramento dello scontrino medio", "value": "+26%"}, {"label": "Clienti sommelier", "value": "+29%"}], "country": "Italia", "features": [{"title": "Specializzazione vini dell''Etna", "desc": "Accesso ai migliori Nerello Mascalese e vini vulcanici da cantine etneane storiche."}, {"title": "Storie di terroir vulcanico", "desc": "Racconta come le ceneri dell''Etna danno mineralità unica ai vini, affascinando ogni ospite."}, {"title": "Abbinamenti con cucina siciliana", "desc": "Nerello Mascalese con piatti di pesce; Grillo vulcanico con caponatina; Nero d''Avola con carni."}, {"title": "Gestione di piccoli produttori", "desc": "Supporto nella ricerca di nuove microvinificazioni etneane da proporre in esclusiva."}], "problems": ["Difficoltà nel reperire i migliori vini Etna da piccoli produttori", "Clienti confondono Etna con il rest della Sicilia", "Prezzi elevati per i Nerello Mascalese top che intimoriscono", "Concorrenza da wine bar storici che controllano i migliori viticoltori", "Necessità di spiegare la vulcanicità come elemento di stile vini"], "city_name": "Catania", "ticket_medio": "32-52€"}'::jsonb,
  '[{"q": "Quale vino dell''Etna scegliere per un ristorante siciliano?", "a": "Nerello Mascalese rosso per eleganza, Grillo vulcanico bianco per freschezza. Se vuoi sorprendere, scegli un rosato Etna o un''anfora naturale di un piccolo produttore."}, {"q": "Come spiegare l''unicità dei vini vulcanici dell''Etna?", "a": "Il suolo lavico dell''Etna dona mineralità e salinità uniche. Ogni sorso trasporta il cliente sul vulcano. È terroir che racchiude tutta la Sicilia."}, {"q": "Quale margine applicare ai vini Etna prestigiosi?", "a": "Per i Nerello Mascalese di eccellenti cantine, un margine del 45-55% è appropriato. Clienti che cercano Etna capiscono il valore e investono volentieri."}]'::jsonb,
  '["software-carta-dei-vini-acireale", "software-carta-dei-vini-palermo"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-padova',
  'city',
  'it',
  'Software per la Carta dei Vini a Padova | Winerim',
  'Software per gestire la carta vini a Padova. Vini veneti e prosecco nel cuore del Nordest.',
  'Padova, Italia',
  'Software per la carta dei vini per ristoranti a Padova',
  'I vini del Veneto nella città della ricerca e dell''innovazione',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Padova è città di studenti e di innovazione, meta di foodies che cercano i migliori vini veneti. Prosecco, Amarone, Soave meritano una carta curata e moderna. Con Winerim, costruisci una selezione che attrae quella clientela consapevole e giovane che apprezza i vini di qualità.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+25%"}, {"label": "Miglioramento dello scontrino medio", "value": "+21%"}, {"label": "Clienti giovani", "value": "+28%"}], "country": "Italia", "features": [{"title": "Specializzazione vini veneti", "desc": "Prosecco DOCG Valdobbiadene, Amarone, Soave Classico - i migliori vini della regione."}, {"title": "Interfaccia moderna e user-friendly", "desc": "Carta digitale con foto e descrizioni attraenti per clientela giovane e tech-savvy."}, {"title": "Abbinamenti innovativi", "desc": "Suggerimenti che spaziano da abbinamenti classici a match moderni e inaspettati."}, {"title": "Gestione di menu tasting", "desc": "Crea esperienze enologiche multi-calice perfette per aprire i palati giovani ai grandi vini."}], "problems": ["Clientela giovane meno consapevole enologicamente rispetto ai turisti maturi", "Difficoltà nel trasferire conoscenza vini ad ospiti inesperti", "Prezzi elevati su Amarone che spaventano fascia giovane", "Competizione da bar aperitivo e locali più casual", "Necessità di rendere i vini attraenti e divertenti, non solo seri"], "city_name": "Padova", "ticket_medio": "28-48€"}'::jsonb,
  '[{"q": "Quale carta vini per attrarre clientela giovane a Padova?", "a": "Prosecco fresco per aperitivo, Soave per piatti leggeri, Amarone per chi vuol scoprire i grandi vini. Una carta che equilibra accessibilità e scoperta."}, {"q": "Come insegnare ai giovani clienti ad apprezzare i vini veneti?", "a": "Storie affascinanti dietro ogni vino. Il Prosecco è celebrazione; l''Amarone è sfida per il palato; il Soave è eleganza. Ogni vino ha una narrazione emozionante."}, {"q": "Come gestire i prezzi di vini prestigiosi con fascia giovane?", "a": "Offri opzioni diverse: calici piccoli di Amarone per assaggiare, bottiglie di Prosecco per condividere, Soave a prezzi ragionevoli. Democrazia enologica."}]'::jsonb,
  '["software-carta-dei-vini-vicenza", "software-carta-dei-vini-venezia"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-trieste',
  'city',
  'it',
  'Software per la Carta dei Vini a Trieste | Winerim',
  'Gestisci la carta vini a Trieste. Terrano, Vitovska e i vini del Carso tra Italia e Slovenia.',
  'Trieste, Italia',
  'Software per la carta dei vini per ristoranti a Trieste',
  'I vini particolari del Carso nel porto di Trieste',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Trieste è città di confini, dove l''Italia incontra il Carso e la Slovenia. I vini qui sono particolari: Terrano rosso elegante, Vitovska bianca minerale. Con Winerim, costruisci una carta che celebra questa identità geografica unica, attraendo clientela curiosa e sofisticata.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+22%"}, {"label": "Miglioramento dello scontrino medio", "value": "+17%"}, {"label": "Clientela internazionale", "value": "+31%"}], "country": "Italia", "features": [{"title": "Specializzazione vini del Carso", "desc": "Terrano, Vitovska, Refosco - vini unici che meritano una narrazione specializzata."}, {"title": "Storie di confine", "desc": "Racconta come il Carso pietroso e il clima carsico creano vini unici fra Italia e Slovenia."}, {"title": "Abbinamenti con cucina triestina", "desc": "Terrano con gulasch, Vitovska con brodetto triestino e piatti di mare."}, {"title": "Connessione con vini sloveni", "desc": "Includi selezioni slovene nel Carso per clientela internazionale e amanti dei confini."}], "problems": ["Scarsa conoscenza dei vini del Carso anche fra appassionati", "Difficoltà nel reperire selezioni qualitative di Terrano e Vitovska", "Clientela che non sa come avvicinarsi a vini così particolari", "Posizionamento del Carso fra regioni vini più famose", "Necessità di educare su terroir carsico e peculiarità geologica"], "city_name": "Trieste", "ticket_medio": "30-50€"}'::jsonb,
  '[{"q": "Quali sono i migliori vini del Carso da offrire a Trieste?", "a": "Terrano per i rossi minerali, Vitovska per i bianchi ricchi. Aggiungi un Refosco per completezza. Questi tre vini rappresentano il cuore enologico triestino."}, {"q": "Come spiegare l''unicità del Terrano ai clienti?", "a": "Il Carso è pietraia carsica che crea acidità e mineralità uniche. Il Terrano è vino difficile, nobile, riflette il territorio selvaggio e affascinante."}, {"q": "Dovrei includere vini sloveni nella mia carta triestina?", "a": "Assolutamente sì. Il Carso non ha confini enologici. Vini sloveni affini arricchiscono la narrazione di Trieste come porto di culture."}]'::jsonb,
  '["software-carta-dei-vini-aquileia", "software-carta-dei-vini-monfalcone"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-brescia',
  'city',
  'it',
  'Software per la Carta dei Vini a Brescia | Winerim',
  'Software per gestire la carta vini a Brescia. Franciacorta, Oltrepò Pavese e i vini lombardi.',
  'Brescia, Italia',
  'Software per la carta dei vini per ristoranti a Brescia',
  'Franciacorta: le bollicine di lusso della Lombardia',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Brescia è porta alla Franciacorta, le bollicine italiane più sofisticate e premiate. Con Winerim, governa una carta che celebra il metodo classico italiano, attirando clientela sofisticata che sa riconoscere la qualità e investe nei grandi spumanti.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+29%"}, {"label": "Miglioramento dello scontrino medio", "value": "+28%"}, {"label": "Clienti VIP", "value": "+24%"}], "country": "Italia", "features": [{"title": "Specializzazione Franciacorta", "desc": "Accesso ai migliori produttori di Franciacorta Satèn, Rosé e Riserva, con annate rare."}, {"title": "Gestione spumanti di lusso", "desc": "Conservazione in cantina a temperatura precisa, servizio impeccabile per Franciacorta da 30-100€."}, {"title": "Descrizioni affascinanti", "desc": "Note tasting che trasportano il cliente nel metodo classico e nella eleganza franciacortina."}, {"title": "Abbinamenti aperitivo e piatto", "desc": "Franciacorta per aperitivo; Rosé per piatti delicati; Riserva per fine pasto."}], "problems": ["Percezione che Franciacorta sia cara rispetto a Prosecco", "Difficoltà nel gestire una cantina con spumanti di lusso ad alto valore", "Clientela casuale che non apprezza la differenza fra Franciacorta e Prosecco", "Margini che richiedono prezzi elevati che spaventano", "Concorrenza da enotecche storiche bresciane specializzate"], "city_name": "Brescia", "ticket_medio": "40-65€"}'::jsonb,
  '[{"q": "Quale differenza fra Franciacorta e Prosecco?", "a": "Franciacorta è metodo classico (rifermentazione in bottiglia), Prosecco è metodo Charmat (in acciaio). Franciacorta è più complessa, invecchiata più a lungo, prezzo più elevato."}, {"q": "Come posizionare Franciacorta in carta per clientela eterogenea?", "a": "Offri Franciacorta Entry-level per aperitivo; Satèn e Rosé per piatti; Riserva per cliente che vuol investire. Una proposta sfumata che soddisfa tutti."}, {"q": "Quale margine applicare a Franciacorta di lusso?", "a": "Per Franciacorta Riserva, un margine del 50-65% è standard. Clientela che sceglie Franciacorta sa che investe in qualità e capisce il valore."}]'::jsonb,
  '["software-carta-dei-vini-como", "software-carta-dei-vini-bergamo"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-parma',
  'city',
  'it',
  'Software per la Carta dei Vini a Parma | Winerim',
  'Software per la carta vini a Parma. Piacevoli, Lambrusco e vini dell''Emilia nel tuo ristorante.',
  'Parma, Italia',
  'Software per la carta dei vini per ristoranti a Parma',
  'Vini emiliani per la cucina del Ducato',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Parma è città di eccellenze gastronomiche: prosciutto, Parmigiano Reggiano, tortelli, culatello. I vini devono essere all''altezza. Piacevoli e Lambrusco sono i compagni ideali. Con Winerim, costruisci una carta che celebra l''armonia fra vini e cucina parmense.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+24%"}, {"label": "Miglioramento dello scontrino medio", "value": "+19%"}, {"label": "Food pairing", "value": "+36%"}], "country": "Italia", "features": [{"title": "Specializzazione vini parmigiani", "desc": "Accesso ai migliori Piacevoli, Lambrusco, Trebbiano e vini naturali emiliani."}, {"title": "Abbinamenti con DOP parmense", "desc": "Suggerimenti per prosciutto, Parmigiano, culatello, tortelli - piatti iconici di Parma."}, {"title": "Gestione vini frizzanti e naturali", "desc": "Conservazione e servizio perfetti per vini delicati e frizzanti caratteristici dell''Emilia."}, {"title": "Narrazione di territorio", "desc": "Racconta come i vini riflettono l''Emilia agricola, l''arte culinaria, la storia della Città Ducale."}], "problems": ["Vini emiliani percepiti come ''secondari'' rispetto a toscani/piemontesi", "Difficoltà a far comprendere il valore del Lambrusco secco moderno", "Clientela che preferisce vini più ''strutturati'' e importanti", "Scarsità di terroir riconoscibile fra tanti vini emiliani", "Competizione da ristoranti storici già affermati gastronomicamente"], "city_name": "Parma", "ticket_medio": "28-48€"}'::jsonb,
  '[{"q": "Quali vini scegliere per un ristorante gourmet a Parma?", "a": "Piacevoli freschi per aperitivo; Lambrusco secco per piatti di carne; Trebbiano per formaggi. Una carta emiliana autentica valorizza la cucina parmigiana."}, {"q": "Come abbinare il Lambrusco ai piatti di Parma?", "a": "Lambrusco rosso frizzante con culatello e mortadella; Lambrusco rosato con pasta fresca; Lambrusco secco con carni arrostite. Versatilità è il suo dono."}, {"q": "Perché i vini dell''Emilia sono meno costosi?", "a": "Non per qualità inferiore, ma per posizionamento storico. Oggi sommelier scelgono Lambrusco e Piacevoli per autenticità. Offrono il miglior rapporto qualità-prezzo."}]'::jsonb,
  '["software-carta-dei-vini-modena", "software-carta-dei-vini-bologna"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-modena',
  'city',
  'it',
  'Software per la Carta dei Vini a Modena | Winerim',
  'Gestisci la carta vini a Modena. Lambrusco di Modena e i vini dell''Emilia-Romagna nel tuo ristorante.',
  'Modena, Italia',
  'Software per la carta dei vini per ristoranti a Modena',
  'Lambrusco di Modena: il vino del Duca Ercole',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Modena è patria del Lambrusco, vino storico della corte estense. Oggi Lambrusco di Modena ha ottenuto il riconoscimento internazionale come vino frizzante di qualità. Con Winerim, valorizza questo patrimonio storico-enologico, aumentando vendite e reputazione fra clientela sofisticata.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+26%"}, {"label": "Miglioramento dello scontrino medio", "value": "+20%"}, {"label": "Clienti enofili", "value": "+25%"}], "country": "Italia", "features": [{"title": "Specializzazione Lambrusco di Modena", "desc": "Accesso ai migliori produttori di Lambrusco, dalle versioni secche a quelle frizzanti."}, {"title": "Abbinamenti con piatti modenesi", "desc": "Lambrusco con zampone, cotechino, tortellini, Parmigiano Reggiano modenese e aceto balsamico."}, {"title": "Gestione di vini frizzanti naturali", "desc": "Conservazione e servizio ideali per Lambrusco con perlage naturale e caratteristico."}, {"title": "Storie di storia estense", "desc": "Racconta come Lambrusco era bevanda della corte estense, oggi riqualificato come vino serio."}], "problems": ["Reputazione negativa del Lambrusco dolce anni ''80 ancora radicata", "Difficoltà a cambiare percezione verso Lambrusco secco moderno", "Vini frizzanti naturali che richiedono gestione tecnica attenta", "Competizione da centri storici già affermati enologicamente", "Sfida di educare su Lambrusco come vino di qualità, non bevanda popolare"], "city_name": "Modena", "ticket_medio": "26-46€"}'::jsonb,
  '[{"q": "Quale Lambrusco di Modena scegliere per il mio ristorante?", "a": "Lambrusco Secco di Modena DOC per eleganza; Lambrusco vivace per versatilità; almeno uno Lambrusco Riserva invecchiato per sorprendere clienti esigenti."}, {"q": "Come insegnare ai clienti che Lambrusco secco è vino serio?", "a": "Racconta la storia: Lambrusco di corte estense riqualificato. Oggi sommeliers di alto livello scelgono Lambrusco secco. È riscoperta, non novità."}, {"q": "Come abbinare Lambrusco ai piatti modenesi?", "a": "Zampone e cotechino trovano il loro compagno nel Lambrusco frizzante; tortellini e aceto balsamico nel Lambrusco secco più complesso. Varietà garantisce abbinamenti."}]'::jsonb,
  '["software-carta-dei-vini-reggio-emilia", "software-carta-dei-vini-parma"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-bergamo',
  'city',
  'it',
  'Software per la Carta dei Vini a Bergamo | Winerim',
  'Software per gestire la carta vini a Bergamo. Franciacorta, vini bergamaschi e della Lombardia.',
  'Bergamo, Italia',
  'Software per la carta dei vini per ristoranti a Bergamo',
  'Vini lombardi fra tradizione e innovazione',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Bergamo è città di storia, fra la Città Alta medievale e la moderna Città Bassa. I suoi vini riflettono questa dualità: Franciacorta sofisticata, ma anche vini naturali locali innovativi. Con Winerim, crea una carta che celebra la ricchezza vinicola bergamasca.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+23%"}, {"label": "Miglioramento dello scontrino medio", "value": "+18%"}, {"label": "Clientela giovane", "value": "+27%"}], "country": "Italia", "features": [{"title": "Specializzazione vini bergamaschi e lombardi", "desc": "Franciacorta, vini naturali da piccoli produttori, vini della Valle Imagna e Orobie."}, {"title": "Equilibrio fra tradizione e innovazione", "desc": "Carte che includono sia Franciacorta storica che vini naturali trendy per clientele varie."}, {"title": "Abbinamenti con gastronomia locale", "desc": "Cassoeula, polenta, formaggi bergamaschi, casoncelli - piatti che richiedono vini versatili."}, {"title": "Community wine tasting", "desc": "Organizza degustazioni per coinvolgere clientela locale e creare fedeltà alla carta."}], "problems": ["Percezione di Bergamo come secondaria rispetto a Milano", "Difficoltà nel comunicare identità vinicola chiara fra molte opzioni", "Clientela giovane con budget limitato preferisce Prosecco a Franciacorta", "Competizione da wine bar moderni molto agguerriti", "Sfida di posizionare vini naturali in carta accanto a Franciacorta tradizionale"], "city_name": "Bergamo", "ticket_medio": "30-50€"}'::jsonb,
  '[{"q": "Quale carta vini per un ristorante a Bergamo?", "a": "Franciacorta per eleganza, vini naturali da piccoli bergamaschi per carattere, Prosecco per accessibilità. Una carta che racconta la diversità lombarda."}, {"q": "Come attirare clientela giovane a Bergamo con la carta vini?", "a": "Vini naturali frizzanti, piccoli produttori con storie affascinanti, calici a prezzo accessibile. Per giovani, l''esperienza conta più del grande nome."}, {"q": "Quali piccoli produttori bergamaschi emergenti consigli?", "a": "La Valle Imagna e le Orobie producono vini naturali innovativi. Scopri questi micro-produttori e proposte in esclusiva: clientela apprezza autenticità."}]'::jsonb,
  '["software-carta-dei-vini-lecco", "software-carta-dei-vini-brescia"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-perugia',
  'city',
  'it',
  'Software per la Carta dei Vini a Perugia | Winerim',
  'Gestisci la carta vini a Perugia. Sagrantino, Grechetto e i vini dell''Umbria nel tuo ristorante.',
  'Perugia, Italia',
  'Software per la carta dei vini per ristoranti a Perugia',
  'Sagrantino: il vino nobile dell''Umbria',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Perugia è cuore dell''Umbria, terra di tradizioni e vini ignorati finora. Il Sagrantino di Montefalco è uno dei grandi rossi italiani. Il Grechetto è bianco minerale e elegante. Con Winerim, scopri e valorizza l''Umbria enologica, attraendo sommelier e appassionati che ricercano eccellenze meno note.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+27%"}, {"label": "Miglioramento dello scontrino medio", "value": "+23%"}, {"label": "Enofili specializzati", "value": "+30%"}], "country": "Italia", "features": [{"title": "Specializzazione Sagrantino di Montefalco", "desc": "Accesso ai migliori Sagrantino, da giovani fruttati a Passito dolce e Riserva complesse."}, {"title": "Vini umbri completi", "desc": "Grechetto, Trebbiano, Orvieto per i bianchi; Rosso di Montefalco per versatilità."}, {"title": "Note tasting dettagliate", "desc": "Descrizioni che guidano camerieri e clienti fra le sfumature di Sagrantino di diverse annate."}, {"title": "Promozioni su vini emergenti", "desc": "Scopri piccoli produttori umbri di qualità e proponili con margini interessanti."}], "problems": ["Scarsissima conoscenza del Sagrantino al di fuori dell''Umbria", "Difficoltà nel reperire Sagrantino di qualità dai piccoli produttori", "Prezzi elevati per Sagrantino che intimoriscono clientela non esperta", "Competizione da vini toscani e piemontesi molto più conosciuti", "Sfida di educare su Sagrantino come vino nobile al pari di Barolo"], "city_name": "Perugia", "ticket_medio": "35-55€"}'::jsonb,
  '[{"q": "Quale Sagrantino di Montefalco scegliere per un ristorante perugino?", "a": "Un Sagrantino giovane (2-3 anni) per freschezza; un Sagrantino Riserva (5+ anni) per struttura; il Passito dolce per fine pasto. Varietà di stili permette di sedurre palati diversi."}, {"q": "Come posizionare Sagrantino contro Barolo e Brunello?", "a": "Sagrantino è nobile come loro, con carattere unico: tannini morbidi ma presenti, frutto intenso. È vino da scoperta, per clientela curiosa di eccellenze meno conosciute."}, {"q": "Quale margine applicare a Sagrantino di lusso?", "a": "Un margine del 45-55% è standard per Sagrantino Riserva. Clientela che sceglie Sagrantino sa il valore e investe nella riscoperta enologica."}]'::jsonb,
  '["software-carta-dei-vini-montefalco", "software-carta-dei-vini-assisi"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-cagliari',
  'city',
  'it',
  'Software per la Carta dei Vini a Cagliari | Winerim',
  'Software per gestire la carta vini a Cagliari. Cannonau, Vermentino e i vini della Sardegna.',
  'Cagliari, Italia',
  'Software per la carta dei vini per ristoranti a Cagliari',
  'I vini della Sardegna nel cuore del Mediterraneo',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Cagliari è porta ai vini meravigliosi della Sardegna: Cannonau robusto e generoso, Vermentino bianco salato e minerale. Questi vini raccontano l''isola, il mare, la tradizione nuragica. Con Winerim, costruisci una carta che celebra la Sardegna, conquistando turisti e enofili che ricercano autenticità mediterranea.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+24%"}, {"label": "Miglioramento dello scontrino medio", "value": "+19%"}, {"label": "Turisti esigenti", "value": "+29%"}], "country": "Italia", "features": [{"title": "Specializzazione vini sardi", "desc": "Cannonau Classico e di montagna, Vermentino, Nuragus, Moscato - tutta la ricchezza sarda."}, {"title": "Storie di terroir mediterraneo", "desc": "Racconta come viti antichissime in suoli vulcanici creano vini unicamente sardi."}, {"title": "Abbinamenti con cucina isolana", "desc": "Cannonau con porceddu; Vermentino con bottarga; Moscato con seadas - piatti che racontano l''isola."}, {"title": "Connessione con turismo", "desc": "Proponi vini sardi come souvenir da portare a casa, creando fedeltà anche dopo la visita."}], "problems": ["Scarsa conoscenza internazionale dei vini sardi", "Difficoltà nel reperire etichette di qualità da piccoli produttori sardi", "Percepzione che vini sardi siano ''semplici'' o ''periferici''", "Stagionalità turistica che crea sfide nella gestione della cantina", "Competizione da vini italiani più conosciuti"], "city_name": "Cagliari", "ticket_medio": "25-45€"}'::jsonb,
  '[{"q": "Quali vini sardi da offrire a Cagliari?", "a": "Cannonau Classico per i rossi robusti, Vermentino per i bianchi minerali, Moscato per il dolce. Una carta sarda completa racconta l''isola in tre bicchieri."}, {"q": "Come abbinare il Vermentino ai piatti cagliaritani?", "a": "Vermentino fresco con bottarga, pasta di ricci di mare, aragosta. La salinità di Vermentino amplifica i sapori marini della Sardegna."}, {"q": "Perché i vini sardi costano meno di toscani/piemontesi?", "a": "Non per qualità inferiore, ma per minore reputazione storica. Oggi enologi seri scelgono Cannonau e Vermentino sardi per autenticità e rapporto qualità-prezzo."}]'::jsonb,
  '["software-carta-dei-vini-oristano", "software-carta-dei-vini-sassari"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-siena',
  'city',
  'it',
  'Software per la Carta dei Vini a Siena | Winerim',
  'Gestisci la carta vini a Siena. Brunello di Montalcino, Vino Nobile e la Toscana nel tuo ristorante.',
  'Siena, Italia',
  'Software per la carta dei vini per ristoranti a Siena',
  'Brunello e Vino Nobile: i capolavori di Siena',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Siena è circondata da due denominazioni fra le più nobili d''Italia: il Brunello di Montalcino e il Vino Nobile di Montepulciano. Con Winerim, organizza una carta che celebra questi capolavori, trasformando ogni tavolo in un''esperienza enologica memorabile che valorizza la Toscana meridionale.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+31%"}, {"label": "Miglioramento dello scontrino medio", "value": "+29%"}, {"label": "Enofili attirati", "value": "+35%"}], "country": "Italia", "features": [{"title": "Specializzazione Brunello e Vino Nobile", "desc": "Accesso ai migliori produttori di Brunello di Montalcino e Vino Nobile di Montepulciano."}, {"title": "Gestione annate multiple", "desc": "Organizza una cantina con Brunello e Vino Nobile di diverse annate per soddisfare collezionisti."}, {"title": "Note di invecchiamento", "desc": "Consigli su quali Brunello e Vino Nobile sono pronti da bere vs quali hanno ancora potenziale."}, {"title": "Abbinamenti con carne toscana", "desc": "Brunello e Vino Nobile con bistecca alla fiorentina, carni rosse, selvaggina della Toscana."}], "problems": ["Prezzi elevati di Brunello e Vino Nobile intimidiscono clientela", "Difficoltà nel gestire una cantina di vini pregiati e fragili", "Distinguere fra Brunello e Vino Nobile per clientela non esperta", "Rischio di versare vini pregiati a temperature non corrette", "Competizione da enotecche e wine bar storici di Siena e Montalcino"], "city_name": "Siena", "ticket_medio": "50-80€"}'::jsonb,
  '[{"q": "Quale differenza fra Brunello di Montalcino e Vino Nobile di Montepulciano?", "a": "Brunello (100% Sangiovese) è più strutturato e potente; Vino Nobile (Sangiovese + altre varietà) è più elegante e sfumato. Entrambi sono capolavori, solo diverse espressioni toscane."}, {"q": "Come posizionare Brunello e Vino Nobile per clientela eterogenea?", "a": "Offri accesso a entrambi: Brunello per chi ama potenza; Vino Nobile per chi preferisce eleganza. Permettere confronto diretto affascina e aumenta vendite."}, {"q": "Quale margine applicare a Brunello di lusso?", "a": "Per Brunello d''annate nobili, un margine del 50-60% è appropriato. Clientela che investe in Brunello sa il valore e accetta prezzi elevati."}]'::jsonb,
  '["software-carta-dei-vini-montepulciano", "software-carta-dei-vini-montalcino"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-lucca',
  'city',
  'it',
  'Software per la Carta dei Vini a Lucca | Winerim',
  'Software per gestire la carta vini a Lucca. Chianti e vini della Toscana nel cuore toscano.',
  'Lucca, Italia',
  'Software per la carta dei vini per ristoranti a Lucca',
  'Chianti e tradizione enologica nel cuore toscano',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Lucca è città affascinante circondata da mura rinascimentali, nel cuore della Toscana vinicola. Il Chianti Classico, il Chianti Colli Lucchesi, il Vermentino sono vini che raccontano questa terra. Con Winerim, costruisci una carta che combina tradizione e scoperta, attrarre turisti consapevoli che visitano questa città storica.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+22%"}, {"label": "Miglioramento dello scontrino medio", "value": "+17%"}, {"label": "Turisti fedeli", "value": "+24%"}], "country": "Italia", "features": [{"title": "Specializzazione Chianti Colli Lucchesi", "desc": "Accesso ai migliori vini della zona Lucca: Chianti Colli Lucchesi, Doc Lucca Bianco, Vermentino."}, {"title": "Storie di territorio", "desc": "Racconta come le colline lucchesi creano vini con personalità unica fra i tanti Chianti."}, {"title": "Abbinamenti con piatti lucchesi", "desc": "Chianti con cecina e ribollita; Vermentino con minestra di farro; vini per scoperta enologica."}, {"title": "Appeal turistico", "desc": "Carte attraenti per turisti che cercano esperienze autentiche durante visita di Lucca."}], "problems": ["Difficoltà nel distinguere Chianti Colli Lucchesi dal generico Chianti", "Clientela turistica con budget limitato che preferisce vini meno costosi", "Concorrenza da ristoranti con tradizione consolidata", "Necessità di educare turisti sulla specificità geografica lucchese", "Stagionalità turistica che crea sfide nella gestione inventario"], "city_name": "Lucca", "ticket_medio": "28-48€"}'::jsonb,
  '[{"q": "Quali vini lucchesi scegliere per un ristorante storico?", "a": "Chianti Colli Lucchesi per identificare zona; Vermentino per bianchi; almeno un Chianti Classico toscano affine per versatilità. Una carta che racconta Lucca e la Toscana."}, {"q": "Come spiegare ai turisti la specificità del Chianti Colli Lucchesi?", "a": "È Chianti che nasce dalle colline intorno a Lucca, con carattere unico. Non è Classico come quello fra Firenze e Siena. Scoperta di eccellenza geografica affascina turisti."}, {"q": "Come gestire stagionalità turistica con carta vini?", "a": "Stock vini versatili (Chianti, Vermentino) che vendono al maggior numero di ospiti. In alta stagione, proponi anche assaggi di vini locali minori per educazione a costo contenuto."}]'::jsonb,
  '["software-carta-dei-vini-pisa", "software-carta-dei-vini-firenze"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-pisa',
  'city',
  'it',
  'Software per la Carta dei Vini a Pisa | Winerim',
  'Gestisci la carta vini a Pisa. Chianti, vini toscani e bianchi freschi per il tuo ristorante pisano.',
  'Pisa, Italia',
  'Software per la carta dei vini per ristoranti a Pisa',
  'Chianti e vini toscani nel porto di Pisa',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Pisa è città di storia e di mari: la Torre Pendente attrae milioni di turisti che cercano esperienze autentiche. Una carta vini curata di Chianti, vini bianchi freschi toscani, e selezioni locali trasforma il tuo ristorante in mèta enologica. Con Winerim, gestisci facilmente e aumenti vendite fra turisti consapevoli.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+20%"}, {"label": "Miglioramento dello scontrino medio", "value": "+15%"}, {"label": "Clientela internazionale", "value": "+32%"}], "country": "Italia", "features": [{"title": "Specializzazione vini toscani", "desc": "Chianti, Vernaccia di San Gimignano, vini bianchi locali per menu diversificato."}, {"title": "Interfaccia multilingue", "desc": "Menu vini in italiano, inglese, tedesco, francese - attrae turisti da tutto il mondo."}, {"title": "Abbinamenti con piatti pisani", "desc": "Chianti con cacciucco; vini bianchi freschi con branzino al forno e piatti di pesce."}, {"title": "Facilità di aggiornamento", "desc": "Aggiorna carta velocemente quando cambiano preferenze stagionali di turisti."}], "problems": ["Clientela principalmente turistica con scarsa fedeltà", "Budget turisti limitati che spaventano da vini costosi", "Difficoltà nel gestire carte multilingue efficacemente", "Competizione aggressiva da tanti ristoranti turistici", "Velocità di servizio bassa per elevato volume di clientela estiva"], "city_name": "Pisa", "ticket_medio": "26-46€"}'::jsonb,
  '[{"q": "Quale carta vini per ristorante turistico a Pisa?", "a": "Chianti accessibile, vini bianchi freschi toscani, almeno un rosso più strutturato per chi vuol scoprire. Varietà di prezzo e stile per turisti eterogenei."}, {"q": "Come attrarre turisti a ordinare vino in un ristorante pisano?", "a": "Descrizioni affascinanti in più lingue. Storie che collegano vini a piatti e territorio. Suggerimenti del cameriere basati su provenienza ospiti (francesi con Chianti franciacortina, tedeschi con bianchi)."}, {"q": "Come gestire ordini in alta stagione con carta vini complessa?", "a": "Semplifica stock a bestseller. Winerim suggerisce quali vini proporre a quali turisti, velocizzando servizio e aumentando soddisfazione."}]'::jsonb,
  '["software-carta-dei-vini-volterra", "software-carta-dei-vini-lucca"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-aosta',
  'city',
  'it',
  'Software per la Carta dei Vini a Aosta | Winerim',
  'Software per gestire la carta vini a Aosta. Vini valdostani, piemontesi e alpini nel tuo ristorante.',
  'Aosta, Italia',
  'Software per la carta dei vini per ristoranti a Aosta',
  'Vini alpini e valdostani: terroir di montagna',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Aosta è porta alle Alpi e ai vini particolari della Valle d''Aosta. Questi vini crescono in altitudine, creando equilibri unici fra acidità e frutto. Con Winerim, costruisci una carta che celebra i vini alpini, attirando turisti montani e sommelier che ricercano terroir rari e affascinanti.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+19%"}, {"label": "Miglioramento dello scontrino medio", "value": "+14%"}, {"label": "Turisti alpini", "value": "+23%"}], "country": "Italia", "features": [{"title": "Specializzazione vini valdostani", "desc": "Accesso ai vini rari della Valle d''Aosta: Chambave, Torrette, Enfer d''Arvier, Blanc de Morgex."}, {"title": "Storie di altitudine", "desc": "Racconta come viti a 1000+ metri creano vini con acidità e mineralità uniche."}, {"title": "Abbinamenti con cucina alpina", "desc": "Vini valdostani con fonduta, polenta, casunziei, piatti montani che richiedono vini freschi."}, {"title": "Connessione con turismo escursionistico", "desc": "Attrai escursionisti cercano vini che raccontano montagna dove hanno passato la giornata."}], "problems": ["Scarsissima conoscenza dei vini valdostani fra clientela non specializzata", "Difficoltà nel reperire vini rari da piccoli produttori valdostani", "Competizione da vini piemontesi e francesi più conosciuti", "Clientela stagionale che limita fedeltà e prevedibilità", "Necessità di educazione completa su terroir d''altitudine"], "city_name": "Aosta", "ticket_medio": "24-42€"}'::jsonb,
  '[{"q": "Quali vini valdostani scegliere per un ristorante d''Aosta?", "a": "Chambave Muscat per freschezza, Torrette per rosso alpino, Blanc de Morgex per mineralità. Vini rari che affascinano chi vuol scoprire."}, {"q": "Come spiegare ai turisti l''unicità dei vini d''altitudine?", "a": "Viti a 1000+ metri maturano lentamente, creando equilibrio fra acidità e frutto unico. Sono vini che raccontano la montagna dove appena son stati."}, {"q": "Come abbinare vini valdostani ai piatti montani?", "a": "Chambave con fonduta; Torrette con carni rosse; Blanc di Morgex con pesce di montagna. Ogni vino valdostano ha abbinamento perfetto."}]'::jsonb,
  '["software-carta-dei-vini-courmayeur", "software-carta-dei-vini-torino"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-trento',
  'city',
  'it',
  'Software per la Carta dei Vini a Trento | Winerim',
  'Gestisci la carta vini a Trento. Spumanti, vini trentini e la ricchezza del Trentino-Alto Adige.',
  'Trento, Italia',
  'Software per la carta dei vini per ristoranti a Trento',
  'Spumanti trentini e vini di montagna in Trentino',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Trento è capitale degli spumanti metodo classico italiano. Nel Trentino crescono vini eleganti e freschi. Con Winerim, governa una carta che celebra gli spumanti trentini, gli Insolia, i Muller Thurgau, trasformando il tuo ristorante in mèta per enofili che ricercano bolle nobili e vini montani autentici.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+28%"}, {"label": "Miglioramento dello scontrino medio", "value": "+25%"}, {"label": "Clientela sommelier", "value": "+22%"}], "country": "Italia", "features": [{"title": "Specializzazione spumanti trentini", "desc": "Accesso ai migliori produttori di spumanti metodo classico trentini da Trentodoc."}, {"title": "Gestione spumanti qualità", "desc": "Conservazione perfetta per spumanti che necessitano condizioni precise di temperatura."}, {"title": "Vini fermi trentini", "desc": "Insolia, Muller Thurgau, Lagein - vini freschi che completano offerta oltre spumanti."}, {"title": "Descrizioni affascinanti", "desc": "Note tasting che trasportano cliente fra le montagne trentine dove nascono questi vini."}], "problems": ["Competizione aggressiva da spumanterie storiche di Trento", "Difficoltà nel gestire piccole cantine con selezioni limitate", "Clientela che confonde spumanti trentini con Prosecco", "Prezzi elevati su spumanti Trentodoc che spaventano", "Sfida di posizionare vini fermi trentini fra dominanza spumanti"], "city_name": "Trento", "ticket_medio": "38-60€"}'::jsonb,
  '[{"q": "Quale spumante trentino scegliere per la mia carta?", "a": "Spumante metodo classico Trentodoc per eleganza; almeno due annate diverse per mostrare evoluzione. Aggiungi un Muller Thurgau o Insolia per chi vuol vini fermi."}, {"q": "Quale differenza fra spumanti trentini e Prosecco?", "a": "Spumanti trentini sono metodo classico (come Champagne), con rifermentazione in bottiglia e invecchiamento. Prosecco è metodo Charmat (in acciaio). Trentini sono più complessi e eleganti."}, {"q": "Come spiegare il valore degli spumanti Trentodoc?", "a": "Disciplinare rigorosa assicura qualità superiore. Invecchiamento minimo più lungo. Sommelier trentini sanno che Trentodoc = garantia di eccellenza."}]'::jsonb,
  '["software-carta-dei-vini-bolzano", "software-carta-dei-vini-merano"]'::jsonb,
  'Article',
  true
);



-- Bolzano
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-bolzano',
  'city',
  'it',
  'Software per la Carta dei Vini a Bolzano | Winerim',
  'Gestisci la tua carta dei vini a Bolzano con il nostro software. Specializzato in vini Alto Adige: Lagrein, Traminer, Pinot Grigio. Aumenta le vendite di vino del tuo ristorante.',
  'Bolzano, Italia',
  'Software per la carta dei vini per ristoranti a Bolzano',
  'Perfetto per ristoranti del Trentino-Alto Adige',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Bolzano è il cuore della regione vinicola del Trentino-Alto Adige, dove tradizione austriaca e italiana si incontrano nei vini. Il nostro software è progettato specificamente per valorizzare i vini locali come Lagrein, Traminer Aromatico e Pinot Grigio.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+28%"}, {"label": "Miglioramento dello scontrino medio", "value": "+32%"}, {"label": "Clienti che tornano", "value": "+45%"}], "country": "Italia", "features": [{"title": "Catalogo vini Alto Adige", "desc": "Gestisci facilmente i vini tipici di Bolzano con descrizioni e abbinamenti culinari"}, {"title": "Suggerimenti di pairing", "desc": "Sistema intelligente per consigliare i vini migliori con i piatti della cucina trentina"}, {"title": "Gestione giacenze", "desc": "Traccia l''inventario dei vini con notifiche automatiche quando è il momento di riordinare"}, {"title": "Analisi vendite", "desc": "Scopri quali vini sono più richiesti dai tuoi clienti e ottimizza il menu"}], "problems": ["Difficoltà a presentare i vini locali in modo professionale", "Clienti che non conoscono le qualità dei vini Alto Adige", "Gestione complicata dell''inventario vinicolo", "Mancanza di abbinamenti cibi-vini personalizzati", "Perdita di opportunità di vendita su vini pregiati"], "city_name": "Bolzano", "ticket_medio": "45-75€"}'::jsonb,
  '[{"q": "Quali sono i vini più rappresentativi di Bolzano?", "a": "I vini tipici di Bolzano sono il Lagrein rosso robusto, il Traminer Aromatico bianco profumato e il Pinot Grigio. Questi sono perfetti per la cucina locale ricca e saporita."}, {"q": "Come posso presentare al meglio i vini locali ai clienti?", "a": "Il nostro software fornisce descrizioni dettagliate, la storia di ogni vino e i migliori abbinamenti con i piatti del tuo menu, permettendoti di educare i clienti."}, {"q": "Il software supporta i vini austro-ungarici?", "a": "Sì, abbiamo un catalogo completo dei vini del Trentino-Alto Adige con caratteristiche uniche dovute all''influenza austro-ungarica."}]'::jsonb,
  '["software-carta-dei-vini-roma", "software-carta-dei-vini-trento"]'::jsonb,
  'Article',
  true
);

-- Ravenna
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-ravenna',
  'city',
  'it',
  'Software per la Carta dei Vini a Ravenna | Winerim',
  'Gestisci la carta dei vini a Ravenna con specialità dell''Emilia-Romagna. Pignoletto, Sangiovese, Lambrusco. Aumenta le vendite di vino del tuo ristorante della Romagna.',
  'Ravenna, Italia',
  'Software per la carta dei vini per ristoranti a Ravenna',
  'Ideale per la cucina romagnola e marinara',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Ravenna, la città dei mosaici, è circondata da una delle regioni vinicole più ricche d''Italia. I vini emiliani come il Pignoletto, il Sangiovese di Romagna e il Lambrusco sono perfetti per accompagnare la cucina locale ricca e saporita.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+25%"}, {"label": "Miglioramento dello scontrino medio", "value": "+29%"}, {"label": "Nuovi abbinamenti scoperti", "value": "+38%"}], "country": "Italia", "features": [{"title": "Vini Emilia-Romagna", "desc": "Catalogo completo dei vini regionali con enfasi su Pignoletto, Sangiovese e Lambrusco"}, {"title": "Abbinamenti marinari", "desc": "Consigli specifici per pesce e frutti di mare della costa romagnola"}, {"title": "Menu storico", "desc": "Traccia le vendite storiche per identificare i vini più apprezzati dai tuoi clienti"}, {"title": "Gestione fornitori", "desc": "Mantieni i contatti diretti con i produttori locali emiliani"}], "problems": ["I vini locali non sono sufficientemente valorizzati", "Clienti che non conoscono le specialità romagnole", "Difficoltà nell''abbinamento con piatti di mare", "Mancanza di informazioni sulla qualità e provenienza", "Gestione complicata di molte etichette diverse"], "city_name": "Ravenna", "ticket_medio": "40-70€"}'::jsonb,
  '[{"q": "Qual è il miglior vino per l''aragosta romagnola?", "a": "Il Pignoletto Superiore di Colli Bolognesi offre acidità e mineralità perfette per esaltare il sapore dolce dell''aragosta senza sopraffarlo."}, {"q": "Come abbinare il Lambrusco con il cibo moderno?", "a": "Il Lambrusco leggermente frizzante è perfetto con piatti grassi e affumicati, dalla pasta al ragù ai salumi locali, creando contrasti interessanti."}, {"q": "I vini emiliani sono adatti a clienti sofisticati?", "a": "Assolutamente! I Sangiovese di Romagna riserva e i Pignoletto riserva sono vini complessi e eleganti che soddisfano i palati più esigenti."}]'::jsonb,
  '["software-carta-dei-vini-roma", "software-carta-dei-vini-bologna"]'::jsonb,
  'Article',
  true
);

-- Ferrara
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-ferrara',
  'city',
  'it',
  'Software per la Carta dei Vini a Ferrara | Winerim',
  'Software per la carta dei vini a Ferrara, specializzato in vini dell''Emilia. Bosco Eliceo, Sangiovese, vini dolci. Gestisci la tua lista vini con facilità e aumenta i ricavi.',
  'Ferrara, Italia',
  'Software per la carta dei vini per ristoranti a Ferrara',
  'Specializzato in vini dolci e rossi dell''Emilia',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Ferrara, capitale della provincia, è circondata da vigneti che producono eccellenti vini. Il Bosco Eliceo bianco e rosato, insieme ai vini dolci locali, rappresentano la tradizione enologica ferrarese, perfetti per accompagnare l''ottima cucina locale.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+26%"}, {"label": "Miglioramento dello scontrino medio", "value": "+31%"}, {"label": "Clienti soddisfatti", "value": "+42%"}], "country": "Italia", "features": [{"title": "Specializzazione vini dolci", "desc": "Gestisci la selezione di vini dolci locali con descrizioni e momenti di consumo ideali"}, {"title": "Bosco Eliceo integrato", "desc": "Catalogo completo dei vini DOC della zona con suggerimenti di abbinamento"}, {"title": "Note di degustazione", "desc": "Crea e personalizza le note di degustazione per educare i tuoi clienti"}, {"title": "Organizzazione per stile", "desc": "Organizza i vini per tipo (secco, dolce, frizzante) per facilitare la consulenza"}], "problems": ["I vini dolci sono scarsamente valorizzati", "Mancanza di conoscenza sui vini Bosco Eliceo", "Difficoltà nel consigliare abbinamenti insoliti", "Clienti che si aspettano solo vini secchi", "Gestione disorganizzata delle bottiglie speciali"], "city_name": "Ferrara", "ticket_medio": "38-68€"}'::jsonb,
  '[{"q": "Come posso vendere più vini dolci a Ferrara?", "a": "Posiziona i dolci locali al finale dei pasti, crea selezioni di abbinamento con i dessert tipici ferraresi e offri assaggi per educare i clienti."}, {"q": "Quali sono le caratteristiche del Bosco Eliceo?", "a": "Il Bosco Eliceo è un vino bianco leggermente mineralico con buona acidità, perfetto per i piatti di pesce e i risotti locali."}, {"q": "Posso gestire vini rari e collezioni speciali?", "a": "Sì, il nostro software supporta la gestione di bottiglie rare con informazioni dettagliate sulla provenienza e il prezzo di investimento."}]'::jsonb,
  '["software-carta-dei-vini-roma", "software-carta-dei-vini-ravenna"]'::jsonb,
  'Article',
  true
);

-- Rimini
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-rimini',
  'city',
  'it',
  'Software per la Carta dei Vini a Rimini | Winerim',
  'Gestisci la carta dei vini nel tuo ristorante a Rimini. Sangiovese di Romagna, Cagnina, vini locali. Aumenta le vendite di vino e il valore medio dello scontrino in Riviera.',
  'Rimini, Italia',
  'Software per la carta dei vini per ristoranti a Rimini',
  'Perfetto per ristoranti sulla Riviera Adriatica',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Rimini, la regina della Riviera Adriatica, è circondata da una delle zone vinicole più importanti d''Italia. Il Sangiovese di Romagna, la Cagnina dolce e i vini frizzanti locali sono perfetti per accompagnare il pesce fresco e la cucina tipica romagnola.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+27%"}, {"label": "Miglioramento dello scontrino medio", "value": "+30%"}, {"label": "Clienti che consigliano", "value": "+48%"}], "country": "Italia", "features": [{"title": "Sangiovese specialista", "desc": "Gestisci varietà di Sangiovese con profili completi e raccomandazioni di servizio"}, {"title": "Vini della Riviera", "desc": "Catalogo specifico per i vini costieri con enfasi su freschezza e leggerezza"}, {"title": "Abbinamenti pesce", "desc": "Sistema intelligente per pesce azzurro, molluschi e crostacei della Riviera"}, {"title": "Statistiche stagionali", "desc": "Analizza le preferenze dei clienti stagionali (estivi vs invernali)"}], "problems": ["Difficoltà a gestire clienti durante alta stagione", "Clienti di passaggio che vogliono wine list veloce", "Mancanza di specializzazione in pesce", "Prezzi disorganizzati per la stagione turistica", "Vini locali non adeguatamente promossi"], "city_name": "Rimini", "ticket_medio": "42-72€"}'::jsonb,
  '[{"q": "Quale vino abbinare con gli scampi riminesi?", "a": "Il Sangiovese di Romagna in versione leggera o il Cagnina dolce sono scelte classiche che esaltano la dolcezza naturale degli scampi senza sopraffazione."}, {"q": "Come gestire la wine list durante l''estate?", "a": "Evidenzia i vini freschi e leggeri, crea selezioni per il pranzo e la cena, e offri vini al bicchiere per i clienti di passaggio."}, {"q": "I vini frizzanti locali sono apprezzati dai turisti?", "a": "Sì, i vini leggermente frizzanti della Romagna sono amati dai turisti perché rinfrescanti, divertenti e perfetti per le vacanze estive."}]'::jsonb,
  '["software-carta-dei-vini-roma", "software-carta-dei-vini-ravenna"]'::jsonb,
  'Article',
  true
);

-- Pesaro
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-pesaro',
  'city',
  'it',
  'Software per la Carta dei Vini a Pesaro | Winerim',
  'Software per la carta dei vini a Pesaro. Vini Colli Pesaresi, Bianchello del Metauro, specialità marchigiane. Gestisci i vini locali e aumenta le vendite del tuo ristorante.',
  'Pesaro, Italia',
  'Software per la carta dei vini per ristoranti a Pesaro',
  'Specializzato nei vini bianchi marchigiani',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Pesaro, città della musica e della buona cucina, è circondata dai vigneti dei Colli Pesaresi. Il Bianchello del Metauro e i vini bianchi marchigiani sono il cuore della tradizione vinicola locale, perfetti per la cucina di pesce e i piatti leggeri.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+24%"}, {"label": "Miglioramento dello scontrino medio", "value": "+28%"}, {"label": "Ordini frequenti", "value": "+40%"}], "country": "Italia", "features": [{"title": "Bianchello specialista", "desc": "Catalogo completo del Bianchello del Metauro con varietà e denominazioni specifiche"}, {"title": "Vini Colli Pesaresi", "desc": "Gestisci la selezione di vini DOC dei Colli Pesaresi con descrizioni di terroir"}, {"title": "Educazione sensoriale", "desc": "Crea schede di degustazione per insegnare ai clienti le caratteristiche sensoriali"}, {"title": "Integrazione fornitori locali", "desc": "Mantieni database dei produttori locali con contatti e disponibilità"}], "problems": ["Clienti che conoscono poco i vini locali marchigiani", "Difficoltà nel differenziare diverse etichette di Bianchello", "Mancanza di informazioni di qualità sulla provenienza", "Prezzi non competitivi per vini locali", "Gestione disorganizzata dei vini di piccoli produttori"], "city_name": "Pesaro", "ticket_medio": "36-66€"}'::jsonb,
  '[{"q": "Perché il Bianchello del Metauro è ideale a Pesaro?", "a": "Il Bianchello è un vino bianco leggero con ottima acidità, prodotto localmente, che rispecchia il territorio costiero e si abbina perfettamente con il pesce fresco."}, {"q": "Come consigliare i vini marchigiani ai clienti stranieri?", "a": "Descrivi la storia del terroir locale, la freschezza che rispecchia il clima costiero, e offri assaggi per mostrare l''unicità dei vini marchigiani."}, {"q": "Esistono vini rossi locali interessanti?", "a": "Sì, anche se Pesaro è nota per i bianchi, i Rosso Conero e Rosso Piceno offrono eccellenti alternative per piatti più robusti."}]'::jsonb,
  '["software-carta-dei-vini-roma", "software-carta-dei-vini-ancona"]'::jsonb,
  'Article',
  true
);

-- Ancona
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-ancona',
  'city',
  'it',
  'Software per la Carta dei Vini a Ancona | Winerim',
  'Gestisci la carta dei vini a Ancona con specialità marchigiane. Verdicchio, Rosso Conero, vini costieri. Aumenta le vendite di vino nel tuo ristorante adriatico.',
  'Ancona, Italia',
  'Software per la carta dei vini per ristoranti a Ancona',
  'Perfetto per la cucina marchigiana e marinara',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Ancona, il cuore delle Marche, è circondata da una regione vinicola ricca di varietà. Il Verdicchio nei dei Castelli di Jesi, il Rosso Conero robusto e i vini frizzanti locali rappresentano la molteplicità enologica marchigiana, perfetti per la cucina costiera.",stats": [{"label": "Aumento delle vendite di vino", "value": "+29%"}, {"label": "Miglioramento dello scontrino medio", "value": "+33%"}, {"label": "Clienti fedeli", "value": "+46%"}], "country": "Italia", "features": [{"title": "Verdicchio esperto", "desc": "Catalogo completo di Verdicchio Castelli di Jesi con profili di qualità e annate"}, {"title": "Rosso Conero", "desc": "Gestisci la selezione di vini rossi robusti perfetti per piatti di carne e selvaggina"}, {"title": "Sommelier virtuale", "desc": "Sistema di suggerimento intelligente basato su piatto e preferenze del cliente"}, {"title": "Gestione giacenze", "desc": "Traccia automaticamente l''inventario con avvisi di riordinamento per i vini più venduti"}], "problems": ["Clienti che non conoscono la varietà vinicola marchigiana", "Difficoltà nel consigliare vini oltre il Verdicchio", "Mancanza di conoscenza su Rosso Conero e altre specialità", "Gestione complicata di molti produttori piccoli", "Prezzi non ottimizzati per la stagione turistica"], "city_name": "Ancona", "ticket_medio": "44-74€"}'::jsonb,
  '[{"q": "Quale vino scegliere tra Verdicchio e Rosso Conero?", "a": "Il Verdicchio è perfetto per piatti leggeri e pesce, mentre il Rosso Conero è ideale per piatti più robusti. Offri entrambi per massimizzare le scelte del cliente."}, {"q": "Come posso promuovere il Rosso Conero nei miei clienti?", "a": "Crea abbinamenti specifici con piatti di carne locale, sottolinea la complessità e la qualità, e offri assaggi durante l''happy hour per educare i clienti."}, {"q": "Quali sono le migliori annate di Verdicchio?", "a": "Dipende dal tipo: il Verdicchio giovane (2022-2023) è fresco e minerale, mentre le riserve (2018-2020) offrono maggiore corpo e complessità."}]'::jsonb,
  '["software-carta-dei-vini-roma", "software-carta-dei-vini-pesaro"]'::jsonb,
  'Article',
  true
);

-- Lecce
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-lecce',
  'city',
  'it',
  'Software per la Carta dei Vini a Lecce | Winerim',
  'Software per la carta dei vini a Lecce. Primitivo, Negroamaro, vini pugliesi. Gestisci i vini locali del Salento e aumenta le vendite del tuo ristorante in Puglia.',
  'Lecce, Italia',
  'Software per la carta dei vini per ristoranti a Lecce',
  'Specializzato in vini forti e caratteristici del Salento',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Lecce, la Firenze del Sud, è circondata dai vigneti del Salento che producono vini intensi e caratteristici. Il Primitivo di Manduria e il Negroamaro sono i vini rossi più rappresentativi della regione, perfetti per accompagnare la cucina pugliese ricca e saporita.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+31%"}, {"label": "Miglioramento dello scontrino medio", "value": "+36%"}, {"label": "Ordini di wine pairings", "value": "+52%"}], "country": "Italia", "features": [{"title": "Primitivo esperto", "desc": "Catalogo completo di Primitivo di Manduria con distinzione tra versioni giovani e invecchiate"}, {"title": "Negroamaro specialista", "desc": "Gestisci la varietà di Negroamaro con descrizioni di terroir e caratteristiche organolettiche"}, {"title": "Pairing robusti", "desc": "Sistema di abbinamento per piatti forti e speziati della cucina salentina"}, {"title": "Educazione sul vino", "desc": "Crea contenuti educativi sulla storia vinicola del Salento per i clienti"}], "problems": ["Clienti che sottovalutano i vini pugliesi", "Difficoltà nel consigliare vini intensi e complessi", "Mancanza di informazioni sulla qualità del Primitivo", "Gestione disorganizzata di tanti piccoli produttori", "Prezzi non competitivi rispetto ad altre regioni"], "city_name": "Lecce", "ticket_medio": "35-65€"}'::jsonb,
  '[{"q": "Il Primitivo è veramente un grande vino?", "a": "Assolutamente! Il Primitivo di Manduria, con i suoi aromi intensi di frutta nera e spezie, è un vino complesso e strutturato in grado di competere con i migliori vini internazionali."}, {"q": "Come abbinare il Primitivo con la cucina salentina?", "a": "Il Primitivo è perfetto con piatti ricchi di sapore come orecchiette con cime di rapa, tiella e arrosti. La sua struttura regge bene piatti grassi e speziati."}, {"q": "Quali sono le differenze tra Primitivo e Negroamaro?", "a": "Il Primitivo è più alcolico e ricco di frutta nera, mentre il Negroamaro è leggermente più fine e floreale. Entrambi sono eccellenti ma offrono profili sensoriali diversi."}]'::jsonb,
  '["software-carta-dei-vini-roma", "software-carta-dei-vini-bari"]'::jsonb,
  'Article',
  true
);

-- Matera
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-matera',
  'city',
  'it',
  'Software per la Carta dei Vini a Matera | Winerim',
  'Gestisci la carta dei vini a Matera con vini basilicatesi. Aglianico del Vulture, vini locali. Aumenta le vendite di vino del tuo ristorante in Basilicata.',
  'Matera, Italia',
  'Software per la carta dei vini per ristoranti a Matera',
  'Specializzato in vini nobili della Basilicata',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Matera, la città dei Sassi, è circondata dai vigneti vulcanici della Basilicata. L''Aglianico del Vulture è il vino rosso più prestigioso della regione, con caratteristiche uniche dovute al suolo vulcanico, perfetto per accompagnare la cucina locale rustica e sofisticata.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+23%"}, {"label": "Miglioramento dello scontrino medio", "value": "+27%"}, {"label": "Clienti interessati a vini rari", "value": "+41%"}], "country": "Italia", "features": [{"title": "Aglianico del Vulture", "desc": "Catalogo completo di Aglianico con focus su terroir vulcanico e qualità DOCG"}, {"title": "Vini rari e invecchiati", "desc": "Gestisci selezioni di vini rari con informazioni dettagliate su annate e invecchiamento"}, {"title": "Sommelier consigliatore", "desc": "Sistema di raccomandazione per abbinamenti con piatti della cucina lucana"}, {"title": "Note di terroir", "desc": "Crea schede educative sulla vulcanicità e l''influenza del terroir sui vini"}], "problems": ["Clienti che non conoscono i vini basilicatesi", "Difficoltà nel valorizzare l''Aglianico come vino nobile", "Mancanza di conoscenza sul terroir vulcanico", "Gestione complessa di vini da piccoli produttori", "Prezzi non allineati con la qualità percepita"], "city_name": "Matera", "ticket_medio": "40-70€"}'::jsonb,
  '[{"q": "L''Aglianico del Vulture è paragonabile a vini stranieri nobili?", "a": "Sì, l''Aglianico del Vulture DOCG è un vino di classe internazionale con struttura, acidità e potenziale di invecchiamento comparabili ai grandi vini europei."}, {"q": "Come posso educare i clienti sul terroir vulcanico?", "a": "Spiega come la lava e il suolo vulcanico influenzano il vino, conferendo minerali unici e caratteristiche che non si trovano in altre regioni."}, {"q": "Quali piatti lucani abbino con Aglianico?", "a": "L''Aglianico è perfetto con piatti robusti come peperone crusco, pasta alla lucana, formaggi pecorini e carni alla brace."}]'::jsonb,
  '["software-carta-dei-vini-roma", "software-carta-dei-vini-lecce"]'::jsonb,
  'Article',
  true
);

-- Cosenza
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-cosenza',
  'city',
  'it',
  'Software per la Carta dei Vini a Cosenza | Winerim',
  'Software per la carta dei vini a Cosenza. Vini calabresi, Gaglioppo, Greco, Mantonico. Gestisci i vini locali e aumenta le vendite del tuo ristorante in Calabria.',
  'Cosenza, Italia',
  'Software per la carta dei vini per ristoranti a Cosenza',
  'Specializzato in vini autoctoni calabresi',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Cosenza, città di cultura e tradizione, è circondata dai vigneti calabresi che producono vini autoctoni e caratteristici. Il Gaglioppo, il Greco e il Mantonico rappresentano l''eccellenza enologica calabrese, perfetti per accompagnare la cucina locale ricca di sapori antichi.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+22%"}, {"label": "Miglioramento dello scontrino medio", "value": "+26%"}, {"label": "Scoperte enologiche", "value": "+39%"}], "country": "Italia", "features": [{"title": "Gaglioppo specialista", "desc": "Catalogo di Gaglioppo, il vitigno più nobile della Calabria, con profili completi"}, {"title": "Vini autoctoni", "desc": "Gestisci la varietà di vini autoctoni calabresi con storie e provenienza dettagliata"}, {"title": "Educazione regionale", "desc": "Crea contenuti su storia e tradizione vinicola calabrese per educare i clienti"}, {"title": "Piccoli produttori", "desc": "Database di piccoli vignaioli calabresi con contatti e disponibilità"}], "problems": ["Clienti sconosciuti ai vini calabresi", "Difficoltà nel valorizzare vitigni autoctoni", "Mancanza di informazioni sulla qualità regionale", "Gestione disorganizzata di tanti piccoli produttori", "Percezione di vini inferiori rispetto ad altre regioni"], "city_name": "Cosenza", "ticket_medio": "32-62€"}'::jsonb,
  '[{"q": "Il Gaglioppo è paragonabile a Barbera o Nebbiolo?", "a": "Il Gaglioppo ha caratteristiche uniche: è un vino robusto e tannico come il Nebbiolo ma con aromi più meridionali, offrendo un''esperienza sensoriale completamente diversa."}, {"q": "Come consigliare vini calabresi ai clienti scettici?", "a": "Offri assaggi per mostrare la qualità, spiega la storia e l''unicità dei vitigni autoctoni, sottolinea il rapporto qualità-prezzo eccellente rispetto a vini più famosi."}, {"q": "Quali sono i migliori vini bianchi calabresi?", "a": "Il Greco Bianco di Castrovillari e il Mantonico offrono freschezza e mineralità interessanti, perfetti per pesce e piatti leggeri della costa calabrese."}]'::jsonb,
  '["software-carta-dei-vini-roma", "software-carta-dei-vini-reggio-calabria"]'::jsonb,
  'Article',
  true
);

-- Reggio Calabria
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-reggio-calabria',
  'city',
  'it',
  'Software per la Carta dei Vini a Reggio Calabria | Winerim',
  'Gestisci la carta dei vini a Reggio Calabria con vini dello Stretto. Faro, vini locali calabresi. Aumenta le vendite di vino del tuo ristorante nella Calabria meridionale.',
  'Reggio Calabria, Italia',
  'Software per la carta dei vini per ristoranti a Reggio Calabria',
  'Perfetto per i vini dello Stretto di Messina',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Reggio Calabria, porta della Sicilia, è circondata dai vigneti dello Stretto che producono il celebre vino Faro. Questo vino rosso robusto e caratteristico è perfetto per accompagnare la cucina locale ricca di pesce fresco e sapori meridionali.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+25%"}, {"label": "Miglioramento dello scontrino medio", "value": "+29%"}, {"label": "Clienti che tornano", "value": "+44%"}], "country": "Italia", "features": [{"title": "Faro specialista", "desc": "Catalogo completo del vino Faro con varietà storiche e produttori più importanti"}, {"title": "Vini dello Stretto", "desc": "Gestisci selezioni di vini prodotti nella zona dello Stretto di Messina"}, {"title": "Pairing marittimi", "desc": "Sistema di abbinamento per pesce, frutti di mare e specialità dello Stretto"}, {"title": "Integrazione Sicilia", "desc": "Collega ai vini siciliani limitrofi per ampliare l''offerta regionale"}], "problems": ["Il vino Faro è poco conosciuto dai clienti", "Difficoltà nel reperire bottiglie autentiche", "Mancanza di informazioni sulla qualità e storia", "Gestione di pochi produttori locali", "Prezzi non allineati con la tradizione"], "city_name": "Reggio Calabria", "ticket_medio": "38-68€"}'::jsonb,
  '[{"q": "Qual è l''importanza storica del vino Faro?", "a": "Il Faro è un vino con radici antiche che i greci definivano ''Vino della Fortezza''. È un vino rosso robusto che rappresenta la tradizione vinicola dello Stretto."}, {"q": "Come abbinare il Faro con il pesce dello Stretto?", "a": "Il Faro robusto e tannico è perfetto con pesce alla brace, spada, alici e altri pesci grassi e saporiti tipici dello Stretto di Messina."}, {"q": "Il Faro ha potenziale di invecchiamento?", "a": "Sì, il Faro di qualità superiore può invecchiare 10-15 anni sviluppando complessità e terziarietà affascinanti."}]'::jsonb,
  '["software-carta-dei-vini-roma", "software-carta-dei-vini-messina"]'::jsonb,
  'Article',
  true
);

-- Messina
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-messina',
  'city',
  'it',
  'Software per la Carta dei Vini a Messina | Winerim',
  'Software per la carta dei vini a Messina. Vini siciliani, Nero d''Avola, vini locali. Gestisci i vini dello Stretto e aumenta le vendite del tuo ristorante in Sicilia.',
  'Messina, Italia',
  'Software per la carta dei vini per ristoranti a Messina',
  'Specializzato in vini siciliani e dello Stretto',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Messina, città affacciata sullo Stretto, è circondata dai vigneti siciliani che producono vini nobili e caratteristici. Il Nero d''Avola, il Nerello Mascalese e i vini bianchi siciliani offrono una varietà straordinaria di sapori, perfetti per la cucina siciliana ricca e diversificata.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+28%"}, {"label": "Miglioramento dello scontrino medio", "value": "+32%"}, {"label": "Clienti affascinati", "value": "+47%"}], "country": "Italia", "features": [{"title": "Nero d''Avola esperto", "desc": "Catalogo completo di Nero d''Avola con varietà regionali e denominazioni specifiche"}, {"title": "Vini siciliani", "desc": "Gestisci la varietà di vini siciliani dai bianchi leggeri ai rossi complessi"}, {"title": "Educazione sommelier", "desc": "Sistema di apprendimento interattivo sulla cultura vinicola siciliana"}, {"title": "Pairing locali", "desc": "Suggerimenti specifici per pasta alla Norma, caponata, arancini e specialità siciliane"}], "problems": ["Clienti confusi sulla varietà di vini siciliani", "Difficoltà nel differenziare Nero d''Avola da altre varietà", "Mancanza di conoscenza sui vini bianchi siciliani", "Gestione complessa di molti produttori siciliani", "Prezzi disorganizzati per qualità diverse"], "city_name": "Messina", "ticket_medio": "40-70€"}'::jsonb,
  '[{"q": "Il Nero d''Avola è davvero un grande vino?", "a": "Assolutamente! Il Nero d''Avola è una varietà nobile siciliana che produce vini complessi, strutturati e affascinanti, capaci di invecchiare meravigliosamente."}, {"q": "Come abbinare vini siciliani con la cucina locale?", "a": "Il Nero d''Avola è perfetto con pasta alla Norma e piatti di carne, mentre i bianchi sono ideali con pesce e caponata. Offri entrambi per massimizzare l''esperienza."}, {"q": "Quali sono i migliori vini bianchi siciliani?", "a": "Il Grillo, l''Inzolia e il Cataratto offrono freschezza e complessità diverse, perfetti per scoprire la varietà vinicola siciliana."}]'::jsonb,
  '["software-carta-dei-vini-roma", "software-carta-dei-vini-siracusa"]'::jsonb,
  'Article',
  true
);

-- Siracusa
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-siracusa',
  'city',
  'it',
  'Software per la Carta dei Vini a Siracusa | Winerim',
  'Gestisci la carta dei vini a Siracusa con vini siciliani. Nero d''Avola, Moscato, vini locali. Aumenta le vendite di vino del tuo ristorante nel sud-est della Sicilia.',
  'Siracusa, Italia',
  'Software per la carta dei vini per ristoranti a Siracusa',
  'Specializzato in vini dolci e rossi siciliani',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Siracusa, città ricca di storia greca, è circondata dai vigneti del sud-est siciliano. Il Nero d''Avola robusto, il Moscato dolce e i vini bianchi locali rappresentano la diversità enologica siciliana, perfetti per accompagnare i piatti antichi e moderni della cucina siracusana.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+27%"}, {"label": "Miglioramento dello scontrino medio", "value": "+31%"}, {"label": "Selezioni dolci vendute", "value": "+49%"}], "country": "Italia", "features": [{"title": "Nero d''Avola specialista", "desc": "Catalogo di Nero d''Avola con focus su zone di produzione diverse del sud-est siciliano"}, {"title": "Moscato esperto", "desc": "Gestisci vini dolci e passiti siciliani con descrizioni sensoriali dettagliate"}, {"title": "Abbinamenti dessert", "desc": "Sistema intelligente per pairing con dolci siciliani come granita, cannoli e paste"}, {"title": "Vini fortificati", "desc": "Catalogo di marsala e altri vini fortificati siciliani per final meal experience"}], "problems": ["Clienti che non sanno consigliare vini dolci", "Difficoltà nel posizionare Moscato correttamente", "Mancanza di abbinamenti con dolci siciliani", "Gestione disorganizzata di vini passiti rari", "Perdita di opportunità di vendita su finali di pasto"], "city_name": "Siracusa", "ticket_medio": "42-72€"}'::jsonb,
  '[{"q": "Il Moscato di Siracusa è veramente dolce come dicono?", "a": "Il Moscato di Siracusa offre dolcezza bilanciata con una freschezza che lo rende perfetto per dessert, ma anche bevibile a fine pasto come aperitivo rinfrescante."}, {"q": "Come vendo più vini dolci nei miei ristorante?", "a": "Crea pairing specifici con dolci siciliani, offri assaggi al termine del pasto, comunica la complessità e il terroir unico del Moscato di Siracusa."}, {"q": "Quali sono le differenze tra Moscato e passiti siciliani?", "a": "Il Moscato è fresco e delicato, mentre i passiti come il Malvasia e il Pantelleria sono più concentrati e ricchi, offrendo esperienze diverse a fine pasto."}]'::jsonb,
  '["software-carta-dei-vini-roma", "software-carta-dei-vini-messina"]'::jsonb,
  'Article',
  true
);

-- Trapani
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-trapani',
  'city',
  'it',
  'Software per la Carta dei Vini a Trapani | Winerim',
  'Software per la carta dei vini a Trapani. Vini siciliani, Marsala, Zibibbo, vini dell''ovest. Gestisci i vini locali e aumenta le vendite del tuo ristorante in Sicilia.',
  'Trapani, Italia',
  'Software per la carta dei vini per ristoranti a Trapani',
  'Specializzato in Marsala e vini bianchi dell''ovest siciliano',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Trapani, città dei salinatori, è circondata dai vigneti dell''ovest siciliano che producono il celebre Marsala e lo Zibibbo. Questi vini dolci e complessi rappresentano la tradizione enologica trapanese, perfetti per accompagnare la cucina locale ricca di pesce e tradizioni antiche.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+26%"}, {"label": "Miglioramento dello scontrino medio", "value": "+30%"}, {"label": "Vendite di vini passiti", "value": "+51%"}], "country": "Italia", "features": [{"title": "Marsala specialista", "desc": "Catalogo completo di Marsala con distinzione tra secco, semi-secco e dolce"}, {"title": "Zibibbo educato", "desc": "Gestisci vini di Zibibbo con focus su Moscato di Pantelleria e altre varietà locali"}, {"title": "Usi del Marsala", "desc": "Crea sezioni per Marsala da cucina e da aperitivo/dessert con suggerimenti di utilizzo"}, {"title": "Vini di fortezza", "desc": "Catalogo di vini fortificati tipici della tradizione trapanese e siciliana"}], "problems": ["Clienti che vedono Marsala solo come ingrediente da cucina", "Difficoltà nel consigliare Zibibbo e vini passiti", "Mancanza di conoscenza su vini fortificati di qualità", "Gestione disorganizzata di vini dolci e passiti", "Perdita di opportunità di vendita su vini dessert"], "city_name": "Trapani", "ticket_medio": "38-68€"}'::jsonb,
  '[{"q": "Il Marsala può essere un grande vino da bere?", "a": "Assolutamente! Il Marsala Superiore Riserva è un vino complesso e affascinante, perfetto da bere come aperitivo o meditazione, non solo da cucina."}, {"q": "Come consigliare lo Zibibbo ai clienti moderni?", "a": "Spiega la freschezza nascosta nel dolce, l''equilibrio unico, e proponi abbinamenti con dolci leggeri, frutta e formaggi freschi, non solo dessert pesanti."}, {"q": "Quali sono gli usi del Marsala nel ristorante?", "a": "Il Marsala secco è perfetto da aperitivo, il dolce da dessert e meditazione, e alcuni ristoranti lo usano anche in cucina per piatti riusciti e sofisticati."}]'::jsonb,
  '["software-carta-dei-vini-roma", "software-carta-dei-vini-messina"]'::jsonb,
  'Article',
  true
);

-- Sassari
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-sassari',
  'city',
  'it',
  'Software per la Carta dei Vini a Sassari | Winerim',
  'Gestisci la carta dei vini a Sassari con vini sardi. Vermentino, Cannonau, vini locali. Aumenta le vendite di vino del tuo ristorante nel nord della Sardegna.',
  'Sassari, Italia',
  'Software per la carta dei vini per ristoranti a Sassari',
  'Specializzato in vini sardi del nord',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Sassari, città del nord della Sardegna, è circondata dai vigneti sardi che producono il Vermentino fresco e il Cannonau robusto. Questi vini rappresentano la tradizione enologica sarda con caratteristiche uniche dovute al clima mediterraneo e ai suoli particolari dell''isola.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+24%"}, {"label": "Miglioramento dello scontrino medio", "value": "+28%"}, {"label": "Clienti che apprezzano locali", "value": "+43%"}], "country": "Italia", "features": [{"title": "Vermentino specialista", "desc": "Catalogo completo di Vermentino con focus su varietà di zona e minerali"}, {"title": "Cannonau experto", "desc": "Gestisci Cannonau in versioni diverse: giovane, riserva e invecchiato"}, {"title": "Vini sardi autoctoni", "desc": "Selezione di vitigni autoctoni sardi meno noti ma affascinanti"}, {"title": "Pairing costieri", "desc": "Abbinamenti specifici per pesce, aragosta e specialità culinarie sarde"}], "problems": ["Clienti poco consci dei vini sardi", "Difficoltà nel differenziare Vermentino locale da altre zone", "Mancanza di conoscenza su Cannonau di qualità", "Gestione di piccoli produttori sardi", "Percezione di vini inferiori rispetto a altre regioni"], "city_name": "Sassari", "ticket_medio": "36-66€"}'::jsonb,
  '[{"q": "Il Vermentino di Sassari è diverso da quello di altre zone?", "a": "Sì, il Vermentino di Sassari ha caratteristiche mineraliche uniche dovute al terroir costiero e ai suoli locali, con profili leggermente diversi rispetto ad altre aree."}, {"q": "Come vendo il Cannonau ai clienti di passaggio?", "a": "Evidenzia la robustezza, la complessità e la capacità di invecchiamento, offrendo assaggi e descrivendo l''unicità del vitigno sardo più noto."}, {"q": "Quali vini sardi autoctoni devo assolutamente avere?", "a": "Oltre a Vermentino e Cannonau, scopri Torbato, Monica e Malvasia di Bosa per ampliare la selezione e sorprendere i clienti curiosi."}]'::jsonb,
  '["software-carta-dei-vini-roma", "software-carta-dei-vini-olbia"]'::jsonb,
  'Article',
  true
);

-- Olbia
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-olbia',
  'city',
  'it',
  'Software per la Carta dei Vini a Olbia | Winerim',
  'Software per la carta dei vini a Olbia. Vermentino, vini sardi, vini costieri. Gestisci i vini della Costa Smeralda e aumenta le vendite del tuo ristorante in Sardegna.',
  'Olbia, Italia',
  'Software per la carta dei vini per ristoranti a Olbia',
  'Perfetto per la Costa Smeralda e i vini sardi',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Olbia, porta della Costa Smeralda, è circondata dai vigneti della Sardegna nord-orientale. Il Vermentino fresco e minerale, insieme ai vini sardi autoctoni, sono perfetti per accompagnare il pesce fresco e le specialità culinarie della costa.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+29%"}, {"label": "Miglioramento dello scontrino medio", "value": "+34%"}, {"label": "Clienti soddisfatti", "value": "+48%"}], "country": "Italia", "features": [{"title": "Vermentino costa", "desc": "Specializzazione in Vermentino costiero con focus su freschezza e minerali"}, {"title": "Vini della Costa Smeralda", "desc": "Selezione premium di vini per clienti affuenti della Costa Smeralda"}, {"title": "Pairing pesce", "desc": "Sistema intelligente per abbinare vini con pesce fresco, crostacei e frutti di mare"}, {"title": "Wine list stagionale", "desc": "Gestisci diverse wine list per stagione turistica vs bassa stagione"}], "problems": ["Gestione di clientela turistica variegata", "Clienti che cercano vini premium noti globalmente", "Difficoltà nell''educare su vini sardi meno noti", "Mancanza di differenziazione rispetto ai competitors", "Prezzi competitivi necessari per stagione turistica"], "city_name": "Olbia", "ticket_medio": "50-80€"}'::jsonb,
  '[{"q": "Quale vino scegliere per la Costa Smeralda?", "a": "Il Vermentino di Olbia offre freschezza, leggerezza e mineralità perfette per il pesce e l''ambiente costiero, con un rapporto qualità-prezzo eccellente per turisti."}, {"q": "Come gestire prezzi per clientela internazionale?", "a": "Offri vini sardi di qualità a prezzi ragionevoli accanto a selezioni premium internazionali per soddisfare diverse preferenze e budget."}, {"q": "Come educare i clienti su Vermentino locale?", "a": "Descrivi la freschezza naturale, il legame con la costa, le caratteristiche mineraliche, e offri assaggi per mostrare il valore superiore ai vini commerciali."}]'::jsonb,
  '["software-carta-dei-vini-roma", "software-carta-dei-vini-sassari"]'::jsonb,
  'Article',
  true
);

-- Alba
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-alba',
  'city',
  'it',
  'Software per la Carta dei Vini a Alba | Winerim',
  'Software per la carta dei vini a Alba. Barolo, Barbaresco, vini del Piemonte. Gestisci i grandi vini piemontesi e aumenta le vendite del tuo ristorante in Langa.',
  'Alba, Italia',
  'Software per la carta dei vini per ristoranti a Alba',
  'Specializzato nei grandi vini nobili piemontesi',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Alba, capitale della Langa, è circondata dai vigneti che producono i grandi vini piemontesi: Barolo e Barbaresco. Questi vini nobili, con struttura e potenziale di invecchiamento straordinari, sono perfetti per accompagnare la cucina piemontese sofisticata e ricca.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+32%"}, {"label": "Miglioramento dello scontrino medio", "value": "+38%"}, {"label": "Clienti di lusso", "value": "+54%"}], "country": "Italia", "features": [{"title": "Barolo esperto", "desc": "Catalogo completo di Barolo con produttori storici e nuovi, diversi profili di stile"}, {"title": "Barbaresco specialista", "desc": "Gestisci varietà di Barbaresco con distinzione tra giovane, riserva e rarità invecchiate"}, {"title": "Langhe & Roero", "desc": "Selezione ampia di vini della regione con Nebbiolo, Dolcetto e Moscato"}, {"title": "Consulenza investimento", "desc": "Traccia vini da investimento con informazioni su annate storiche e potenziale"}], "problems": ["Gestione di vini costosi e rari", "Clienti che richiedono consulenza su investimento", "Difficoltà nel consigliare vini a clienti sofisticati", "Necessità di informazioni dettagliate su annate e terroir", "Mancanza di tracciamento di giacenze preziose"], "city_name": "Alba", "ticket_medio": "80-150€"}'::jsonb,
  '[{"q": "Qual è la differenza tra Barolo e Barbaresco?", "a": "Barolo è più potente, tannico e strutturato, ideale per carni rosse e piatti ricchi. Barbaresco è più elegante e sfumato, perfetto per piatti sofisticati e delicati."}, {"q": "Quale annata di Barolo dovrei consigliare?", "a": "Dipende da esigenza: 2019-2020 sono giovani e accessibili, 2015-2017 offrono equilibrio, mentre 2010-2014 sono più evolute e pronte da bere."}, {"q": "Come educare clienti su vini piemontesi nobili?", "a": "Spiega il terroir della Langa, la complessità del Nebbiolo, la storia dei produttori, e offri vertical tastings per mostrare evoluzione nel tempo."}]'::jsonb,
  '["software-carta-dei-vini-roma", "software-carta-dei-vini-asti"]'::jsonb,
  'Article',
  true
);

-- Asti
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-asti',
  'city',
  'it',
  'Software per la Carta dei Vini a Asti | Winerim',
  'Gestisci la carta dei vini a Asti con specialità piemontesi. Moscato d''Asti, Barbera, vini dolci. Aumenta le vendite di vino del tuo ristorante nel Piemonte.',
  'Asti, Italia',
  'Software per la carta dei vini per ristoranti a Asti',
  'Specializzato in Moscato d''Asti e vini piemontesi',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Asti, città del Moscato, è celebre per il suo vino dolce frizzante. Il Moscato d''Asti leggero e delizioso, insieme alla Barbera robusta, rappresentano la diversità vinicola astese, perfetti per accompagnare la cucina piemontese ricca e sofisticata.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+25%"}, {"label": "Miglioramento dello scontrino medio", "value": "+29%"}, {"label": "Vendite di dolci", "value": "+50%"}], "country": "Italia", "features": [{"title": "Moscato d''Asti esperto", "desc": "Catalogo completo di Moscato d''Asti con diverse produzioni e annate"}, {"title": "Barbera astigiana", "desc": "Gestisci Barbera d''Asti con varietà giovane e riserva invecchiata"}, {"title": "Pairing dolci", "desc": "Sistema di abbinamento specifico per dolci piemontesi e Moscato"}, {"title": "Educazione frizzante", "desc": "Crea contenuti su frizzantezza naturale e caratteristiche sensoriali del Moscato"}], "problems": ["Clienti che sottovalutano Moscato", "Difficoltà nel posizionare dolci a fine pasto", "Mancanza di conoscenza su Barbera di qualità", "Gestione disorganizzata di vini dolci e frizzanti", "Perdita di opportunità di vendita su finali di pasto"], "city_name": "Asti", "ticket_medio": "35-65€"}'::jsonb,
  '[{"q": "Il Moscato d''Asti è veramente un grande vino?", "a": "Assolutamente! Il Moscato d''Asti offre freschezza, leggerezza, e complessità sensoriale affascinanti, con bassa alcolicità che lo rende ideale per più momenti."}, {"q": "Come consigliare Moscato ai clienti sofisticati?", "a": "Descrivi la freschezza naturale, la complessità aromatica, il legame con il territorio astese, e sottolinea come sia diverso dal Moscato d''Asti commerciale."}, {"q": "Quale Barbera per accompagnare piatti piemontesi?", "a": "La Barbera d''Asti giovane è perfetta con piatti di pasta ricchi, mentre la riserva invecchiata abbina bene con carni rosse e game in umido."}]'::jsonb,
  '["software-carta-dei-vini-roma", "software-carta-dei-vini-alba"]'::jsonb,
  'Article',
  true
);

-- Montalcino
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-montalcino',
  'city',
  'it',
  'Software per la Carta dei Vini a Montalcino | Winerim',
  'Software per la carta dei vini a Montalcino. Brunello di Montalcino, vini toscani, Rosso di Montalcino. Gestisci i grandi vini e aumenta le vendite nel tuo ristorante toscano.',
  'Montalcino, Italia',
  'Software per la carta dei vini per ristoranti a Montalcino',
  'Specializzato nel Brunello di Montalcino',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Montalcino, gioiello della Val d''Orcia, è la patria del Brunello di Montalcino, uno dei vini più prestigiosi d''Italia. Questo vino rosso robusto, invecchiato almeno 5 anni, rappresenta l''eccellenza toscana e la tradizione vinicola di questa splendida regione collinare.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+33%"}, {"label": "Miglioramento dello scontrino medio", "value": "+39%"}, {"label": "Clienti di fascia alta", "value": "+55%"}], "country": "Italia", "features": [{"title": "Brunello specialista", "desc": "Catalogo completo di Brunello di Montalcino DOCG con produttori storici e nuove realtà"}, {"title": "Rosso di Montalcino", "desc": "Gestisci il Rosso come alternativa più accessibile ma di qualità eccellente"}, {"title": "Vini di Montalcino", "desc": "Selezione ampia di vini da other varietà locali e produttori della zona"}, {"title": "Tracciamento annate", "desc": "Sistema di tracciamento annate storiche di Brunello con evoluzione nel tempo"}], "problems": ["Gestione di vini molto costosi e rari", "Difficoltà nel consigliare a clienti internazionali", "Mancanza di informazioni storiche sul Brunello", "Giacenze che richiedono conservazione speciale", "Perdita di opportunità di vendita a clienti collezionisti"], "city_name": "Montalcino", "ticket_medio": "120-200€"}'::jsonb,
  '[{"q": "Qual è la differenza tra Brunello e Rosso di Montalcino?", "a": "Brunello è invecchiato 5 anni e offre complessità straordinaria, mentre Rosso è invecchiato 1 anno e più accessibile. Entrambi sono eccellenti ma a prezzi diversi."}, {"q": "Come consigliare un Brunello d''annata storica?", "a": "Illustra l''anno, descrive l''evoluzione nel tempo, confronta con annate precedenti, e spiega come questa sia pronta da bere oppure ancora migliorerà."}, {"q": "Quale annata di Brunello è la migliore?", "a": "2010, 2012, 2015 e 2016 sono annate eccellenti. Dipende dalle preferenze: giovani e fruttati o evoluti e complessi?"}]'::jsonb,
  '["software-carta-dei-vini-roma", "software-carta-dei-vini-montepulciano"]'::jsonb,
  'Article',
  true
);

-- Montepulciano
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-montepulciano',
  'city',
  'it',
  'Software per la Carta dei Vini a Montepulciano | Winerim',
  'Gestisci la carta dei vini a Montepulciano. Vino Nobile di Montepulciano, vini toscani. Aumenta le vendite di vino del tuo ristorante nella Toscana meridionale.',
  'Montepulciano, Italia',
  'Software per la carta dei vini per ristoranti a Montepulciano',
  'Specializzato nel Vino Nobile di Montepulciano',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Montepulciano, città affascinante del Val d''Orcia, è la patria del Vino Nobile di Montepulciano. Questo vino rosso elegante e strutturato, invecchiato almeno 2 anni, rappresenta l''eccellenza toscana con carattere più sofisticato e raffinato rispetto ai vini di altre zone.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+28%"}, {"label": "Miglioramento dello scontrino medio", "value": "+35%"}, {"label": "Clienti affascinati", "value": "+50%"}], "country": "Italia", "features": [{"title": "Vino Nobile specialista", "desc": "Catalogo completo di Vino Nobile di Montepulciano DOCG con varietà di produttori"}, {"title": "Rosso di Montepulciano", "desc": "Gestisci Rosso come alternativa più giovane e accessibile al Vino Nobile"}, {"title": "Terroir Val d''Orcia", "desc": "Crea contenuti educativi sul terroir unico della Val d''Orcia e influenza sulla qualità"}, {"title": "Pairing piatti toscani", "desc": "Abbinamenti specifici con piatti toscani ricchi come bistecca, pasta al ragù e formaggi"}], "problems": ["Clienti confusi tra Brunello e Vino Nobile", "Difficoltà nel differenziare produttori diversi", "Mancanza di informazioni su terroir locale", "Gestione di vini di fascia alta", "Perdita di opportunità con clienti collezionisti"], "city_name": "Montepulciano", "ticket_medio": "50-100€"}'::jsonb,
  '[{"q": "Qual è la differenza tra Vino Nobile e Brunello di Montalcino?", "a": "Vino Nobile è più elegante e sofisticato (2 anni invecchiamento), mentre Brunello è più robusto e potente (5 anni). Entrambi eccellenti, ma con profili sensoriali diversi."}, {"q": "Come consigliare un Vino Nobile a clienti internazionali?", "a": "Spiega l''eleganza, la struttura, il terroir unico della Val d''Orcia, e offri comparazioni con altri Sangiovese nobili toscani."}, {"q": "Quale annata di Vino Nobile è più accessibile?", "a": "Le annate più recenti (2019-2021) sono ancora giovani ma accessibili. Le riserve invecchiate (2015-2017) offrono più complessità ma costano di più."}]'::jsonb,
  '["software-carta-dei-vini-roma", "software-carta-dei-vini-montalcino"]'::jsonb,
  'Article',
  true
);

-- San Gimignano
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-san-gimignano',
  'city',
  'it',
  'Software per la Carta dei Vini a San Gimignano | Winerim',
  'Software per la carta dei vini a San Gimignano. Vernaccia di San Gimignano, vini toscani bianchi. Gestisci i vini locali e aumenta le vendite del tuo ristorante in Toscana.',
  'San Gimignano, Italia',
  'Software per la carta dei vini per ristoranti a San Gimignano',
  'Specializzato nella Vernaccia di San Gimignano',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "San Gimignano, città dalle torri, è celebre per la Vernaccia, il bianco toscano più elegante. Questo vino fresco e minerale, con struttura e complessità, rappresenta l''eccellenza viticola sangimiglianense, perfetto per la cucina toscana leggera e sofisticata.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+26%"}, {"label": "Miglioramento dello scontrino medio", "value": "+30%"}, {"label": "Clienti curiosi", "value": "+44%"}], "country": "Italia", "features": [{"title": "Vernaccia esperta", "desc": "Catalogo completo di Vernaccia di San Gimignano DOCG con diverse produzioni"}, {"title": "Vini bianchi toscani", "desc": "Gestisci selezione di altri bianchi toscani per ampliare l''offerta"}, {"title": "Educazione sensoriale", "desc": "Crea schede di degustazione per insegnare caratteristiche della Vernaccia"}, {"title": "Pairing pesce", "desc": "Suggerimenti di abbinamento specifico per piatti di pesce e frutta di mare"}], "problems": ["Clienti che non conoscono Vernaccia", "Difficoltà nel consigliare bianchi di qualità", "Mancanza di informazioni su terroir locale", "Posizionamento di bianchi vs rossi toscani", "Perdita di opportunità di vendita su pranzi leggeri"], "city_name": "San Gimignano", "ticket_medio": "38-68€"}'::jsonb,
  '[{"q": "La Vernaccia di San Gimignano è davvero un grande bianco?", "a": "Sì, è l''unico DOCG bianco della Toscana. Offre freschezza, mineralità e struttura affascinanti, con capacità di invecchiamento sorprendente."}, {"q": "Come consigliare Vernaccia a clienti abituati a vini noti?", "a": "Spiega l''unicità, la storia, il terroir toscano di qualità, e offri assaggi per mostrare la complessità e la freschezza superiore ai vini commerciali."}, {"q": "Come abbinare Vernaccia con piatti di carne leggera?", "a": "La Vernaccia, pur essendo bianca, ha struttura sufficiente per piatti come pollo, coniglio in umido e persino magioni di maiale preparati leggermente."}]'::jsonb,
  '["software-carta-dei-vini-roma", "software-carta-dei-vini-orvieto"]'::jsonb,
  'Article',
  true
);

-- Orvieto
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-orvieto',
  'city',
  'it',
  'Software per la Carta dei Vini a Orvieto | Winerim',
  'Gestisci la carta dei vini a Orvieto. Orvieto Classico, vini umbri, bianchi locali. Aumenta le vendite di vino del tuo ristorante in Umbria.',
  'Orvieto, Italia',
  'Software per la carta dei vini per ristoranti a Orvieto',
  'Specializzato nell''Orvieto Classico',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Orvieto, città di arte e cultura, è celebre per l''Orvieto Classico, il bianco umbro più elegante. Questo vino fresco e floreale, con caratteristiche uniche dovute ai suoli vulcanici locali, è perfetto per accompagnare la cucina umbra leggera e sofisticata.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+25%"}, {"label": "Miglioramento dello scontrino medio", "value": "+29%"}, {"label": "Ordini al pranzo", "value": "+42%"}], "country": "Italia", "features": [{"title": "Orvieto Classico esperto", "desc": "Catalogo completo di Orvieto Classico DOC con varietà di produttori locali"}, {"title": "Vini umbri", "desc": "Gestisci selezione di altri vini umbri bianchi e rossi per ampliare offerta"}, {"title": "Terroir vulcanico", "desc": "Crea contenuti educativi su suoli vulcanici e influenza sulla qualità di Orvieto"}, {"title": "Pairing leggeri", "desc": "Suggerimenti di abbinamento per piatti leggeri, insalate e antipasti umbri"}], "problems": ["Clienti poco consapevoli di Orvieto Classico", "Difficoltà nel consigliare bianchi di qualità umbri", "Mancanza di conoscenza su terroir locale", "Gestione di produttori piccoli e poco noti", "Perdita di opportunità su pranzi leggeri e tourist traffic"], "city_name": "Orvieto", "ticket_medio": "34-64€"}'::jsonb,
  '[{"q": "Quale è la differenza tra Orvieto secco e abboccato?", "a": "Orvieto Classico secco è fresco e minerale, perfetto per pesce e piatti leggeri. L''abboccato è leggermente dolce, più floreale, ideale per dessert e formaggi."}, {"q": "Come consigliare Orvieto Classico ai turisti?", "a": "Sottolinea l''importanza storica, il legame con il territorio, la freschezza naturale, e il rapporto qualità-prezzo eccellente rispetto a vini toscani più noti."}, {"q": "L''Orvieto Classico ha capacità di invecchiamento?", "a": "Sì, i Classici di qualità superiore possono invecchiare 3-5 anni sviluppando complessità affascinante. Molti credono sia da bere giovane, ma ci sono piacevoli sorprese."}]'::jsonb,
  '["software-carta-dei-vini-roma", "software-carta-dei-vini-cortona"]'::jsonb,
  'Article',
  true
);

-- Cortona
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-cortona',
  'city',
  'it',
  'Software per la Carta dei Vini a Cortona | Winerim',
  'Software per la carta dei vini a Cortona. Vino Nobile, Rosso Toscano, vini locali. Gestisci i vini toscani e aumenta le vendite del tuo ristorante in Toscana.',
  'Cortona, Italia',
  'Software per la carta dei vini per ristoranti a Cortona',
  'Specializzato in vini toscani e umbri',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Cortona, città di arte e paesaggio, è circondata da vigneti che producono vini toscani e umbri di qualità. Il Vino Nobile di Montepulciano e i vini rossi locali rappresentano la tradizione vinicola cortonese, perfetti per la cucina toscana ricca e sofisticata.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+24%"}, {"label": "Miglioramento dello scontrino medio", "value": "+28%"}, {"label": "Clienti culturali", "value": "+40%"}], "country": "Italia", "features": [{"title": "Vini della Val d''Orcia", "desc": "Catalogo di vini da zone limitrofe come Montepulciano e Montalcino"}, {"title": "Rossi toscani", "desc": "Gestisci varietà di Chianti, Brunello e vini locali per ampliare selezione"}, {"title": "Vini umbri", "desc": "Selezione di vini umbri vicini come Orvieto e vini rossi umbri"}, {"title": "Pairing culturale", "desc": "Suggerimenti di abbinamento con piatti toscani e umbri tipici dell''area"}], "problems": ["Clienti alla ricerca di vini 'noti' non sempre interessati a locali", "Difficoltà nel differenziare vini da zone vicine", "Mancanza di conoscenza geografica e viticola", "Gestione di molti vini simili da zone diverse", "Perdita di opportunità di clienti sofisticati"], "city_name": "Cortona", "ticket_medio": "42-72€"}'::jsonb,
  '[{"q": "Quali vini devo assolutamente avere a Cortona?", "a": "Almeno un Vino Nobile di Montepulciano e uno di Brunello di Montalcino, più selezioni di Chianti Classico e vini umbri locali per soddisfare diverse preferenze."}, {"q": "Come educare clienti su vini di zone diverse ma simili?", "a": "Spiega i microterroir diversi, le differenze sensoriali sottili, e offri comparazioni verticali per mostrare unicità di ogni zona e produttore."}, {"q": "Quale vino toscano è il migliore per principianti?", "a": "Chianti Classico di qualità buona è il migliore: offre freschezza accessibile, struttura abbastanza complessa, e rapporto qualità-prezzo eccellente per educare il palato."}]'::jsonb,
  '["software-carta-dei-vini-roma", "software-carta-dei-vini-spoleto"]'::jsonb,
  'Article',
  true
);

-- Spoleto
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-spoleto',
  'city',
  'it',
  'Software per la Carta dei Vini a Spoleto | Winerim',
  'Software per la carta dei vini a Spoleto. Vini umbri, Rosso, Sagrantino. Gestisci i vini umbri e aumenta le vendite del tuo ristorante in Umbria.',
  'Spoleto, Italia',
  'Software per la carta dei vini per ristoranti a Spoleto',
  'Specializzato in vini umbri e Sagrantino',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Spoleto, città d''arte e musica, è circondata dai vigneti umbri che producono il Sagrantino, il vino rosso più potente e tannico dell''Umbria. Questo vino robusto e strutturato, con capacità di invecchiamento eccezionale, è perfetto per accompagnare la cucina umbra ricca e saporita.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+27%"}, {"label": "Miglioramento dello scontrino medio", "value": "+31%"}, {"label": "Scoperte enologiche", "value": "+45%"}], "country": "Italia", "features": [{"title": "Sagrantino specialista", "desc": "Catalogo completo di Sagrantino di Montefalco DOCG con varietà di produttori"}, {"title": "Sagrantino passito", "desc": "Gestisci Sagrantino passito come alternativa dolce per finale di pasto"}, {"title": "Vini umbri completi", "desc": "Selezione ampia di vini umbri bianchi e rossi per completare la wine list"}, {"title": "Pairing robusti", "desc": "Abbinamenti specifici per piatti umbri ricchi come cinghiale, carne e funghi"}], "problems": ["Clienti poco consapevoli di Sagrantino", "Difficoltà nel consigliare vini tannici potenti", "Mancanza di conoscenza su Sagrantino passito", "Gestione di vini che richiedono decantazione", "Perdita di opportunità con clienti sofisticati"], "city_name": "Spoleto", "ticket_medio": "40-70€"}'::jsonb,
  '[{"q": "Il Sagrantino è veramente un vino nobile?", "a": "Assolutamente! Il Sagrantino di Montefalco DOCG è un vino potente, tannico e strutturato con capacità di invecchiamento eccezionale, comparabile ai migliori vini italiani."}, {"q": "Come consigliare Sagrantino a clienti abituati a vini leggeri?", "a": "Spiega la potenza del vitigno, l''importanza della decantazione, e suggerisci un primo bicchiere con un piatto robusto per permettere un primo contatto piacevole."}, {"q": "Quale è il miglior abbinamento per Sagrantino?", "a": "Sagrantino è perfetto con cinghiale in umido, carni rosse alla brace, funghi in salsa e formaggi pecorini. Evita piatti delicati o pesce."}]'::jsonb,
  '["software-carta-dei-vini-roma", "software-carta-dei-vini-cortona"]'::jsonb,
  'Article',
  true
);

-- Treviso
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-treviso',
  'city',
  'it',
  'Software per la Carta dei Vini a Treviso | Winerim',
  'Gestisci la carta dei vini a Treviso. Prosecco, vini veneti, vini frizzanti. Aumenta le vendite di vino del tuo ristorante nel Veneto settentrionale.',
  'Treviso, Italia',
  'Software per la carta dei vini per ristoranti a Treviso',
  'Specializzato nel Prosecco e vini veneti',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Treviso, città del Prosecco, è circondata dai vigneti del Prosecco DOCG che producono il vino frizzante più celebre d''Italia. Il Prosecco leggero e festoso, insieme ai vini veneti bianchi e rossi, rappresenta la molteplicità enologica trevigiana, perfetta per la cucina locale light e raffinata.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+30%"}, {"label": "Miglioramento dello scontrino medio", "value": "+34%"}, {"label": "Vendite Prosecco", "value": "+56%"}], "country": "Italia", "features": [{"title": "Prosecco esperto", "desc": "Catalogo completo di Prosecco DOCG/DOC con varietà di stili e produttori"}, {"title": "Prosecco educato", "desc": "Crea contenuti su terroir, differenze di stile, e uso del Prosecco in cocktail"}, {"title": "Vini veneti", "desc": "Selezione di altri vini veneti bianchi come Pinot Grigio e rossi come Amarone"}, {"title": "Pairing leggeri", "desc": "Suggerimenti di abbinamento per piatti leggeri, insalate trevigiane e aperitivi"}], "problems": ["Clienti che vedono Prosecco solo come aperitivo", "Difficoltà nel vendere vini oltre Prosecco", "Mancanza di differenziazione tra Prosecco commerciale e qualitativo", "Gestione di molti piccoli produttori", "Perdita di opportunità con clienti che cercano vini 'seri'"], "city_name": "Treviso", "ticket_medio": "28-58€"}'::jsonb,
  '[{"q": "Il Prosecco di qualità è davvero diverso da quello commerciale?", "a": "Sì, il Prosecco DOCG di buoni produttori offre freschezza, complessità aromatica e finezza di bolla superiori rispetto al Prosecco commerciale generico."}, {"q": "Come vendo più vini oltre Prosecco a Treviso?", "a": "Crea selezioni di vini veneti complementari, offri pairing specifici, educi clienti sulla varietà dei vini locali, e comunica il rapporto qualità-prezzo."}, {"q": "Il Prosecco può invecchiare?", "a": "Il Prosecco è da bere fresco e giovane, ma alcuni vini da uve Glera di qualità superiore mantengono caratteristiche piacevoli per 1-2 anni dal vintage."}]'::jsonb,
  '["software-carta-dei-vini-roma", "software-carta-dei-vini-udine"]'::jsonb,
  'Article',
  true
);

-- Udine
INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-dei-vini-udine',
  'city',
  'it',
  'Software per la Carta dei Vini a Udine | Winerim',
  'Gestisci la carta dei vini a Udine. Friulano, vini friulani bianchi, DOC Friuli. Aumenta le vendite di vino del tuo ristorante nel Friuli-Venezia Giulia.',
  'Udine, Italia',
  'Software per la carta dei vini per ristoranti a Udine',
  'Specializzato nei vini bianchi friulani',
  'Richiedi demo',
  '/demo',
  'Analizza la mia carta',
  '/analisis-carta',
  '{"intro": "Udine, città del nord-est, è circondata dai vigneti friulani che producono i migliori vini bianchi d''Italia. Il Friulano fresco e minerale, insieme al Pinot Grigio e altri bianchi autoctoni, rappresentano l''eccellenza vinicola friulana, perfetti per la cucina locale nord-adriatica leggera e raffinata.", "stats": [{"label": "Aumento delle vendite di vino", "value": "+26%"}, {"label": "Miglioramento dello scontrino medio", "value": "+30%"}, {"label": "Clienti sofisticati", "value": "+43%"}], "country": "Italia", "features": [{"title": "Friulano specialista", "desc": "Catalogo completo di Friulano DOC Friuli con varietà di produttori e terroir"}, {"title": "Bianchi friulani", "desc": "Gestisci selezione di altri bianchi friulani come Ribolla Gialla, Malvasia e Verdicchio Friuli"}, {"title": "Terroir nordico", "desc": "Crea contenuti sul terroir nordico unico e influenza sulla mineralità dei vini"}, {"title": "Pairing nordico", "desc": "Suggerimenti di abbinamento per pesce, frutti di mare e piatti friulani leggeri"}], "problems": ["Clienti poco consapevoli di vini friulani", "Difficoltà nel differenziare Friulano da Pinot Grigio", "Mancanza di conoscenza su bianchi autoctoni friulani", "Gestione di produttori piccoli ma di qualità", "Perdita di opportunità con clienti alla ricerca di vini 'seri' bianchi"], "city_name": "Udine", "ticket_medio": "36-66€"}'::jsonb,
  '[{"q": "Il Friulano è veramente superiore a Pinot Grigio?", "a": "Non superiore, ma diverso. Friulano ha più struttura, mineralità e complessità, mentre Pinot Grigio è più leggero e immediato. Entrambi eccellenti ma per gusti diversi."}, {"q": "Come consigliare Friulano ai clienti internazionali?", "a": "Spiega l''unicità del vitigno, il terroir nordico con influenze continentali, la mineralità unica, e sottolinea il rapporto qualità-prezzo eccellente rispetto a bianchi francesi."}, {"q": "Quali bianchi friulani devo assolutamente avere?", "a": "Almeno un buon Friulano, un Pinot Grigio di zona, una Ribolla Gialla e una Malvasia di Livorno Friuli per coprire varietà e gusti diversi."}]'::jsonb,
  '["software-carta-dei-vini-roma", "software-carta-dei-vini-treviso"]'::jsonb,
  'Article',
  true
);

COMMIT;

-- ============ FRANCE (50 cities) ============
BEGIN;

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-paris',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Paris | Winerim',
  'Gérez votre carte des vins parisienne avec notre logiciel. Optimisez vos marges et enchantez vos clients avec des accords mets-vins.',
  'Paris, France',
  'Logiciel de carte des vins pour restaurants parisiens',
  'Optimisez votre sélection vinicole dans la capitale de la gastronomie',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Paris, capitale mondiale de la gastronomie, impose des standards élevés en matière de carte des vins. Nos clients parisiens gèrent en moyenne 200 références de Bordeaux, Bourgogne et Champagne avec un ticket moyen de 65€ par bouteille.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+24%"}, {"label": "Amélioration du ticket moyen", "value": "+28%"}, {"label": "Réduction du stock dormant", "value": "-35%"}], "country": "France", "features": [{"title": "Gestion des Grands Crus", "desc": "Cataloguez et tracez vos Bordeaux, Bourgognes et Champagnes avec contrôle d''inventaire par lot"}, {"title": "Accords Mets-Vins IA", "desc": "Recommandations intelligentes pour chaque plat de votre menu"}, {"title": "Analyse des Marges", "desc": "Optimisez vos prix de vente en fonction de la demande parisienne"}, {"title": "Intégration Caisse", "desc": "Synchronisation en temps réel avec votre système de paiement"}], "problems": ["Gestion complexe de centaines de références vinicoles prestigieuses", "Clients très exigeants en matière de sélection et d''accords", "Perte d''opportunités de vente sur les grands crus", "Marges insuffisantes sur les vins d''importation", "Difficultés à former le personnel aux accords gastronomiques"], "city_name": "Paris", "ticket_medio": "45€-120€"}'::jsonb,
  '[{"q": "Comment gérer les appellations Bordeaux et Bourgogne ?", "a": "Notre système classe les vins par appellation avec historique des ventes et notes de dégustation pour optimiser votre sélection."}, {"q": "Pouvons-nous intégrer notre système de caisse ?", "a": "Oui, nous nous connectons à tous les systèmes POS parisiens pour synchroniser prix et inventaire en temps réel."}, {"q": "Comment former notre personnel aux accords mets-vins ?", "a": "Nous incluons des modules de formation IA avec recommandations contextuelles basées sur vos menus spécifiques."}]'::jsonb,
  '["logiciel-carte-des-vins-lyon", "logiciel-carte-des-vins-bordeaux", "logiciel-carte-des-vins-reims"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-lyon',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Lyon | Winerim',
  'Gérez votre cave lyonnaise avec nos outils de gestion vinicole. Championnats des meilleurs restaurants de France avec nos solutions.',
  'Lyon, France',
  'Logiciel de carte des vins pour la gastronomie lyonnaise',
  'Maîtrisez les vins de Rhône, Bourgogne et Savoie dans la capitale gastronomique',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Lyon, capitale gastronomique française, demande une expertise vinicole sans égale. Nos clients lyonnais gèrent des sélections prestigieuses incluant Côte-Rôtie, Hermitage et vins de Bourgogne avec un ticket moyen de 58€.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+22%"}, {"label": "Amélioration du ticket moyen", "value": "+26%"}, {"label": "Optimisation du stock", "value": "-32%"}], "country": "France", "features": [{"title": "Gestion Côte-Rôtie et Hermitage", "desc": "Cataloguez les vins de la Vallée du Rhône avec traçabilité complète"}, {"title": "Accords avec Quenelles et Coq au Vin", "desc": "Recommandations spécialisées pour la cuisine lyonnaise traditionnelle"}, {"title": "Gestion des Millésimes", "desc": "Suivi détaillé des années d''apogée pour chaque appellation"}, {"title": "Reports Sommelier", "desc": "Interface dédiée à l''expertise de vos équipes"}], "problems": ["Complexité de la cuisine lyonnaise pour les accords", "Gestion des vins rares de Rhône et Bourgogne", "Formation du personnel à la gastronomie locale", "Optimisation des marges sur les vins prestigieux", "Stock dormant de vins de collection"], "city_name": "Lyon", "ticket_medio": "38€-95€"}'::jsonb,
  '[{"q": "Comment gérer les vins de Côte-Rôtie ?", "a": "Notre système classe ces vins prestigieux avec historique des millésimes et récoltes pour optimiser votre offre."}, {"q": "Avez-vous des accords pour la quenelle de brochet ?", "a": "Oui, nous proposons des recommandations spécifiques pour les plats typiquement lyonnais."}, {"q": "Pouvez-vous nous aider avec l''inventaire des millésimes ?", "a": "Absolument, nous suivons chaque millésime et ses périodes d''apogée pour optimiser votre service."}]'::jsonb,
  '["logiciel-carte-des-vins-paris", "logiciel-carte-des-vins-avignon", "logiciel-carte-des-vins-chambery"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-marseille',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Marseille | Winerim',
  'Optimisez votre sélection de vins méditerranéens et rosés de Provence. Gestion intelligente pour restaurants côtiers marseillais.',
  'Marseille, France',
  'Logiciel de carte des vins pour restaurants méditerranéens',
  'Maîtrisez les vins de Provence et Cassis dans la plus belle rade de France',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Marseille offre une sélection vinicole méditerranéenne unique avec Cassis, Bandol et rosés de Provence. Nos clients marseillais gèrent en moyenne 150 références avec un ticket moyen de 48€, optimisé pour la clientèle touristique et locale.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+20%"}, {"label": "Amélioration du ticket moyen", "value": "+23%"}, {"label": "Réduction du gaspillage", "value": "-28%"}], "country": "France", "features": [{"title": "Gestion des Vins de Cassis", "desc": "Cataloguez les blancs minéraux de Cassis avec notes de dégustation"}, {"title": "Accords Bouillabaisse et Seafood", "desc": "Recommandations pour la cuisine méditerranéenne provençale"}, {"title": "Rosés Premium", "desc": "Gestion spécialisée des rosés AOC Provence saisonniers"}, {"title": "Gestion Touristique", "desc": "Adaptation aux pics de saison estivale et clientèle changeante"}], "problems": ["Gestion des vins saisonniers et rosés", "Accords complexes avec la cuisine méditerranéenne", "Variabilité de la clientèle touristique", "Stock dormant de vins d''importation", "Marges insuffisantes sur les vins locaux"], "city_name": "Marseille", "ticket_medio": "32€-80€"}'::jsonb,
  '[{"q": "Comment gérer les vins de Cassis blancs ?", "a": "Notre système intègre les caractéristiques minérales de Cassis pour des accords optimaux avec les fruits de mer."}, {"q": "Avez-vous des accords pour la bouillabaisse ?", "a": "Oui, nous recommandons les meilleures pairings avec ce plat emblématique marseillais."}, {"q": "Comment gérer la saisonnalité des rosés ?", "a": "Notre outil anticipe les tendances saisonnières pour optimiser votre stock de rosés."}]'::jsonb,
  '["logiciel-carte-des-vins-cannes", "logiciel-carte-des-vins-avignon", "logiciel-carte-des-vins-toulon"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-bordeaux',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Bordeaux | Winerim',
  'Gérez vos Bordeaux prestigieux avec notre logiciel expert. Optimisez marges et inventaire pour les plus grands crus du monde.',
  'Bordeaux, France',
  'Logiciel de carte des vins pour la région viticole de Bordeaux',
  'Maîtrisez les Grands Crus de Pauillac, Pomérole et Graves',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Bordeaux, région viticole majeure mondiale, requiert une gestion experte des Grands Crus. Nos clients bordelais gèrent 300+ références incluant Pauillac, Pomérole et Saint-Julien avec ticket moyen de 85€ par bouteille.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+26%"}, {"label": "Amélioration du ticket moyen", "value": "+31%"}, {"label": "Optimisation cave", "value": "-38%"}], "country": "France", "features": [{"title": "Gestion des Grands Crus", "desc": "Cataloguez Petrus, Lafite, Mouton avec traçabilité authentification"}, {"title": "Accords Entrecôte à l''Ancienne", "desc": "Recommandations pour la gastronomie bordelaise classique"}, {"title": "Gestion des Millésimes Prestigieux", "desc": "Suivi des années exceptionnelles et périodes d''apogée"}, {"title": "Contrôle Authentification", "desc": "Vérification de provenance pour les vins de collection"}], "problems": ["Gestion de centaines de références Grands Crus", "Risque de contrefaçon des vins prestigieux", "Optimisation des prix de revente", "Formation du personnel aux cépages bordelais", "Gestion des investisseurs en vins"], "city_name": "Bordeaux", "ticket_medio": "55€-250€"}'::jsonb,
  '[{"q": "Comment gérer l''authentification des Grands Crus ?", "a": "Notre système inclut protocoles de vérification provenance et traçabilité complète pour sécuriser votre inventaire."}, {"q": "Pouvez-vous gérer les vins de Pauillac et Pomérole ?", "a": "Oui, nous cataloguons tous les terroirs bordelais avec historique des millésimes et notes d''apogée."}, {"q": "Comment optimiser les marges sur les Grands Crus ?", "a": "Notre analyse dynamique adapte les prix en fonction de la demande et des millésimes disponibles."}]'::jsonb,
  '["logiciel-carte-des-vins-paris", "logiciel-carte-des-vins-toulouse", "logiciel-carte-des-vins-bayonne"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-toulouse',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Toulouse | Winerim',
  'Gérez votre cave toulousaine avec expertise. Vins du Sud-Ouest, Cahors et Gaillac pour restaurants de la Ville Rose.',
  'Toulouse, France',
  'Logiciel de carte des vins pour Toulouse et le Sud-Ouest',
  'Optimisez votre sélection de Cahors, Gaillac et Armagnac',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Toulouse, cœur du Sud-Ouest viticole, impose une expertise en Cahors, Gaillac et vins de Toulouse. Nos clients toulousains gèrent 120 références avec ticket moyen de 42€, spécialisés dans les cépages régionaux Malbec et Duras.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+19%"}, {"label": "Amélioration du ticket moyen", "value": "+21%"}, {"label": "Réduction stock dormant", "value": "-30%"}], "country": "France", "features": [{"title": "Gestion Cahors et Gaillac", "desc": "Cataloguez les AOC du Sud-Ouest avec cépages Malbec et Duras"}, {"title": "Accords Cassoulet et Confit", "desc": "Recommandations pour la cuisine régionale toulousaine"}, {"title": "Armagnac et Digestifs", "desc": "Gestion spécialisée des alcools locaux"}, {"title": "Réseau Producteurs Locaux", "desc": "Connectez-vous directement aux vignerons de Cahors et Gaillac"}], "problems": ["Connaissance limitée des vins du Sud-Ouest", "Accords complexes avec cassoulet et confit de canard", "Manque de visibilité sur les producteurs locaux", "Stock dormant de petites AOC", "Marges faibles sur les vins régionaux"], "city_name": "Toulouse", "ticket_medio": "28€-68€"}'::jsonb,
  '[{"q": "Comment valoriser les Cahors dans ma carte ?", "a": "Notre système recommande les meilleurs Cahors pour accompagner la cuisine régionale du Sud-Ouest."}, {"q": "Avez-vous des accords pour le cassoulet ?", "a": "Oui, nous proposons des pairings optimisés avec ce plat emblématique du Sud-Ouest."}, {"q": "Pouvez-nous connecter avec les vignerons locaux ?", "a": "Absolument, notre plateforme facilite les relations directes avec les producteurs de Gaillac et Cahors."}]'::jsonb,
  '["logiciel-carte-des-vins-bordeaux", "logiciel-carte-des-vins-avignon", "logiciel-carte-des-vins-pau"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-nice',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Nice | Winerim',
  'Optimisez votre cave niçoise avec nos outils. Gestion intelligente pour restaurants côtiers et hôtels de la Côte d''Azur.',
  'Nice, France',
  'Logiciel de carte des vins pour la Côte d''Azur',
  'Maîtrisez les vins de Provence, Bellet et sélections internationales',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Nice, porte d''entrée méditerranéenne, offre une sélection vinicole cosmopolite mêlant Provence, vins de Bellet et importations prestigieuses. Nos clients niçois gèrent 200 références avec ticket moyen de 52€, adaptés à la clientèle touristique haut de gamme.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+21%"}, {"label": "Amélioration du ticket moyen", "value": "+25%"}, {"label": "Optimisation inventaire", "value": "-29%"}], "country": "France", "features": [{"title": "Vins de Bellet Locaux", "desc": "Cataloguez ce terroir niçois unique et prestigieux"}, {"title": "Accords Gastronomie Méditerranéenne", "desc": "Recommandations pour la cuisine niçoise et côtière"}, {"title": "Gestion Clientèle Touristique", "desc": "Adaptation aux pics saisonniers et clientèle internationale"}, {"title": "Sélections Premium Mondiales", "desc": "Intégration de vins importés haut de gamme"}], "problems": ["Attentes clients très élevées en prestige vinicole", "Gestion de la saisonnalité touristique intense", "Coexistence vins locaux et sélections mondiales", "Manque de training sur le terroir de Bellet", "Marges insuffisantes en haute saison"], "city_name": "Nice", "ticket_medio": "35€-120€"}'::jsonb,
  '[{"q": "Comment développer notre sélection de Bellet ?", "a": "Notre système identifie les producteurs de Bellet réputés et facilite vos commandes directes."}, {"q": "Avez-vous des accords pour la cuisine méditerranéenne niçoise ?", "a": "Oui, nous proposons des recommandations contextuelles pour chaque spécialité de la Côte d''Azur."}, {"q": "Comment gérer les pics touristiques ?", "a": "Notre outil anticipe les variations de demande pour optimiser votre stock saisonnier."}]'::jsonb,
  '["logiciel-carte-des-vins-cannes", "logiciel-carte-des-vins-marseille", "logiciel-carte-des-vins-grasse"]'::jsonb,
  'Article',
  true
);


INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-nantes',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Nantes | Winerim',
  'Gérez votre cave nantaise avec expertise Loire. Muscadet, Cabernet d''Anjou et sélections côtières pour restaurants nantais.',
  'Nantes, France',
  'Logiciel de carte des vins pour Nantes et la vallée de la Loire',
  'Maîtrisez Muscadet, Anjou et vins de la Loire atlantique',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Nantes, porte océane de la Loire, impose une expertise en Muscadet, Cabernet d''Anjou et blancs atlantiques. Nos clients nantais gèrent 110 références avec ticket moyen de 38€, spécialisés dans les vins de Loire frais et minéraux.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+18%"}, {"label": "Amélioration du ticket moyen", "value": "+20%"}, {"label": "Réduction stock dormant", "value": "-27%"}], "country": "France", "features": [{"title": "Expertise Muscadet", "desc": "Cataloguez cette appellation emblématique avec notes de terroir"}, {"title": "Accords Fruits de Mer Loire", "desc": "Recommandations pour huîtres de Guérande et fruits de mer"}, {"title": "Vins Blancs Atlantiques", "desc": "Gestion spécialisée des blancs secs et demi-secs de Loire"}, {"title": "Connectivité Loire", "desc": "Réseautez avec vignerons d''Anjou et de Touraine"}], "problems": ["Connaissance insuffisante du Muscadet et terroirs", "Accords complexes avec gastronomie côtière", "Stock dormant de petites AOC de Loire", "Manque de visibilité sur producteurs de Cabernet", "Marges faibles sur vins régionaux"], "city_name": "Nantes", "ticket_medio": "25€-62€"}'::jsonb,
  '[{"q": "Comment valoriser le Muscadet dans mon menu ?", "a": "Notre système recommande les meilleurs crus de Muscadet pour accompagner votre offre de fruits de mer."}, {"q": "Avez-vous des accords pour les huîtres de Guérande ?", "a": "Oui, nous proposons des pairings optimisés avec ce produit régional emblématique."}, {"q": "Pouvez-nous nous connecter directement avec les vignerons ?", "a": "Absolument, notre plateforme facilite les relations avec producteurs d''Anjou et Touraine."}]'::jsonb,
  '["logiciel-carte-des-vins-angers", "logiciel-carte-des-vins-tours", "logiciel-carte-des-vins-la-rochelle"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-strasbourg',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Strasbourg | Winerim',
  'Optimisez votre cave alsacienne. Gestion intelligente pour Riesling, Gewurztraminer et vins d''Alsace prestigieux.',
  'Strasbourg, France',
  'Logiciel de carte des vins pour restaurants alsaciens',
  'Maîtrisez les vins d''Alsace et gastronomie alsacienne',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Strasbourg, capitale des vins d''Alsace, exige une expertise complète en Riesling, Gewurztraminer et Pinot Gris. Nos clients alsaciens gèrent 95 références avec ticket moyen de 35€, spécialisés dans les accords avec choucroute et flammekuchen.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+17%"}, {"label": "Amélioration du ticket moyen", "value": "+19%"}, {"label": "Optimisation cave", "value": "-25%"}], "country": "France", "features": [{"title": "Expertise Riesling", "desc": "Cataloguez tous les crus Riesling avec classification Alsace Grand Cru"}, {"title": "Accords Flammekuchen et Choucroute", "desc": "Recommandations pour gastronomie alsacienne traditionnelle"}, {"title": "Sélection Gewurztraminer", "desc": "Gestion spécialisée des vins floraux aromatiques"}, {"title": "Connectivité Vignoble Alsacien", "desc": "Réseautez directement avec producteurs de Colmar et Beaune"}], "problems": ["Connaissance limitée des cépages alsaciens", "Accords complexes avec choucroute et mets régionaux", "Stock dormant de petits producteurs", "Marges insuffisantes sur vins d''appellation", "Formation du personnel aux terroirs alsaciens"], "city_name": "Strasbourg", "ticket_medio": "22€-58€"}'::jsonb,
  '[{"q": "Comment gérer les Riesling Grand Cru alsaciens ?", "a": "Notre système classe les Riesling par terroir avec notes de profil pour optimiser votre sélection."}, {"q": "Avez-vous des accords pour la flammekuchen ?", "a": "Oui, nous proposons des recommandations spécifiques pour cette spécialité alsacienne."}, {"q": "Pouvez-nous nous connecter avec les vignerons alsaciens ?", "a": "Absolument, facilitons vos relations avec producteurs de Riesling et Gewurztraminer."}]'::jsonb,
  '["logiciel-carte-des-vins-colmar", "logiciel-carte-des-vins-reims", "logiciel-carte-des-vins-dijon"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-montpellier',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Montpellier | Winerim',
  'Gérez votre cave méditerranéenne à Montpellier. Vins du Languedoc-Roussillon et sélections côtières pour restaurants montpelliérains.',
  'Montpellier, France',
  'Logiciel de carte des vins pour le Languedoc-Roussillon',
  'Optimisez votre sélection Languedoc, Pic-Saint-Loup et Roussillon',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Montpellier, cité méditerranéenne, offre une sélection exceptionnelle en Languedoc, Pic-Saint-Loup et Roussillon. Nos clients montpelliérains gèrent 140 références avec ticket moyen de 45€, spécialisés dans les cépages Grenache, Syrah et Mourvèdre.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+20%"}, {"label": "Amélioration du ticket moyen", "value": "+22%"}, {"label": "Réduction stock dormant", "value": "-28%"}], "country": "France", "features": [{"title": "Gestion Pic-Saint-Loup", "desc": "Cataloguez ce terroir prestigieux du Languedoc avec notes de dégustation"}, {"title": "Accords Mets Méditerranéens", "desc": "Recommandations pour cuisine languedocienne et roussillonnaise"}, {"title": "Cépages Grenache-Mourvèdre", "desc": "Expertise complète des cépages méditerranéens régionaux"}, {"title": "Réseau Producteurs Occitanie", "desc": "Connectez-vous aux vignerons du Languedoc-Roussillon"}], "problems": ["Gestion complexe du Pic-Saint-Loup et terroirs", "Accords avec cuisine méditerranéenne variée", "Stock dormant de petites AOC", "Manque de visibilité producteurs locaux", "Marges insuffisantes sur vins d''appellation"], "city_name": "Montpellier", "ticket_medio": "30€-85€"}'::jsonb,
  '[{"q": "Comment valoriser le Pic-Saint-Loup ?", "a": "Notre système recommande les meilleurs Pic-Saint-Loup pour enrichir votre offre haut de gamme."}, {"q": "Avez-vous des accords pour la cuisine languedocienne ?", "a": "Oui, nous proposons des pairings contextuels avec spécialités méditerranéennes."}, {"q": "Pouvez-nous nous connecter avec vignerons ?", "a": "Absolument, connectons-nous directement avec producteurs du Languedoc-Roussillon."}]'::jsonb,
  '["logiciel-carte-des-vins-nimes", "logiciel-carte-des-vins-avignon", "logiciel-carte-des-vins-toulouse"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-lille',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Lille | Winerim',
  'Optimisez votre cave lilloise avec expertise régionale. Sélections Bourgogne, Champagne et Bordeaux pour restaurants du Nord.',
  'Lille, France',
  'Logiciel de carte des vins pour restaurants lillois',
  'Maîtrisez vins de Bourgogne, Champagne et Bordeaux',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Lille, métropole du Nord, exige une expertise en Bourgogne, Champagne et Bordeaux pour sa clientèle sophistiquée. Nos clients lillois gèrent 180 références avec ticket moyen de 50€, spécialisés dans grands crus et accords raffinés.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+21%"}, {"label": "Amélioration du ticket moyen", "value": "+24%"}, {"label": "Optimisation inventaire", "value": "-31%"}], "country": "France", "features": [{"title": "Gestion Grands Crus", "desc": "Cataloguez Bourgogne et Bordeaux avec traçabilité authentification"}, {"title": "Accords Gastronomie Nordiste", "desc": "Recommandations pour carbonade et cuisine régionale raffinée"}, {"title": "Expertise Champagne", "desc": "Gestion complète des champagnes de prestige"}, {"title": "Analyse Marges Premium", "desc": "Optimisation prix de revente pour grands crus"}], "problems": ["Gestion complexe de centaines de références", "Authentification des vins prestigieux", "Accords avec cuisine nordiste", "Marges insuffisantes sur grands crus", "Formation personnel en oenologie"], "city_name": "Lille", "ticket_medio": "40€-110€"}'::jsonb,
  '[{"q": "Comment gérer les Bourgognes et Bordeaux ?", "a": "Notre système classe tous les terroirs avec historique et notes d''apogée pour optimiser votre sélection."}, {"q": "Avez-vous des accords pour la carbonade ?", "a": "Oui, nous proposons des recommandations pour la gastronomie nordiste traditionnelle."}, {"q": "Pouvez-vous nous aider avec l''authentification ?", "a": "Absolument, incluons protocoles de provenance et traçabilité pour sécuriser votre cave."}]'::jsonb,
  '["logiciel-carte-des-vins-paris", "logiciel-carte-des-vins-reims", "logiciel-carte-des-vins-dijon"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-rennes',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Rennes | Winerim',
  'Gérez votre cave rennaise avec expertise Loire. Muscadet, Loire et sélections côtières pour restaurants bretons.',
  'Rennes, France',
  'Logiciel de carte des vins pour Rennes et la Bretagne',
  'Optimisez votre sélection Loire, Muscadet et vins régionaux',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Rennes, capitale bretonne, impose une expertise en vins de Loire et Muscadet pour accompagner poissons et crustacés. Nos clients rennais gèrent 105 références avec ticket moyen de 36€, spécialisés dans blancs secs et minéraux.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+16%"}, {"label": "Amélioration du ticket moyen", "value": "+18%"}, {"label": "Réduction stock dormant", "value": "-26%"}], "country": "France", "features": [{"title": "Expertise Loire et Muscadet", "desc": "Cataloguez vins de Loire avec notes de minéralité et terroir"}, {"title": "Accords Fruits de Mer Bretons", "desc": "Recommandations pour huîtres, homard et poissons régionaux"}, {"title": "Vins Blancs Secs", "desc": "Gestion spécialisée des blancs légers et nerveux"}, {"title": "Connectivité Vignerons Loire", "desc": "Réseautez avec producteurs d''Anjou et Loire atlantique"}], "problems": ["Connaissance insuffisante des blancs secs", "Accords complexes avec crustacés et poissons", "Stock dormant de petites AOC", "Manque de visibilité producteurs Loire", "Marges faibles sur vins régionaux"], "city_name": "Rennes", "ticket_medio": "24€-60€"}'::jsonb,
  '[{"q": "Comment valoriser les vins de Loire ?", "a": "Notre système recommande meilleurs crus pour accompagner votre offre de fruits de mer."}, {"q": "Avez-vous des accords pour huîtres et homard ?", "a": "Oui, nous proposons des pairings optimisés pour crustacés bretons."}, {"q": "Comment connecter avec vignerons Loire ?", "a": "Notre plateforme facilite relations directes avec producteurs d''Anjou et Loire atlantique."}]'::jsonb,
  '["logiciel-carte-des-vins-nantes", "logiciel-carte-des-vins-angers", "logiciel-carte-des-vins-tours"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-reims',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Reims | Winerim',
  'Gérez votre cave remoise avec expertise champagne. Sélection premium pour restaurants de Reims dans le Pays de Champagne.',
  'Reims, France',
  'Logiciel de carte des vins pour Reims et le Champagne',
  'Maîtrisez la sélection champagne et accords gastronomiques',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Reims, cœur du Champagne, exige une expertise complète en champagnes de prestige. Nos clients remois gèrent 200+ références de grands champagniers avec ticket moyen de 70€, spécialisés dans Dom Pérignon, Krug et Cristal.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+25%"}, {"label": "Amélioration du ticket moyen", "value": "+29%"}, {"label": "Optimisation cave", "value": "-36%"}], "country": "France", "features": [{"title": "Expertise Champagne Prestige", "desc": "Cataloguez Dom Pérignon, Krug, Cristal avec traçabilité millésimes"}, {"title": "Accords Gastronomie Champenoise", "desc": "Recommandations pour truffes blanches et cuisine raffinée"}, {"title": "Gestion Champagnes Rares", "desc": "Suivi des cuvées limitées et cuvées de prestige"}, {"title": "Connectivité Champagneries", "desc": "Réseautez avec les grandes maisons de Reims"}], "problems": ["Gestion de centaines de références champagne", "Authentification des cuvées prestigieuses", "Accords complexes avec gastronomie champenoise", "Marges élevées à optimiser", "Gestion des vins de collection d''investissement"], "city_name": "Reims", "ticket_medio": "50€-180€"}'::jsonb,
  '[{"q": "Comment gérer les champagnes de prestige ?", "a": "Notre système trace chaque millésime avec authentification complète pour sécuriser votre cave."}, {"q": "Avez-vous des accords pour truffes et cuisine raffinée ?", "a": "Oui, nous proposons des pairings contextuels pour gastronomie champenoise haut de gamme."}, {"q": "Pouvez-vous nous connecter avec les grandes maisons ?", "a": "Absolument, facilitons vos relations avec les champagneries prestigieuses de Reims."}]'::jsonb,
  '["logiciel-carte-des-vins-paris", "logiciel-carte-des-vins-dijon", "logiciel-carte-des-vins-epernay"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-dijon',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Dijon | Winerim',
  'Optimisez votre cave dijonnaise. Gestion experte pour Bourgogne rouge et Côte de Nuits au cœur de la Bourgogne.',
  'Dijon, France',
  'Logiciel de carte des vins pour Dijon en Bourgogne',
  'Maîtrisez les grands Bourgognes et Côte de Nuits',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Dijon, cœur de la Bourgogne, exige une expertise complète en Côte de Nuits, Côte de Beaune et Chablis. Nos clients dijonnais gèrent 250 références de Pinot Noir prestigieux avec ticket moyen de 62€, spécialisés dans grands crus classiques.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+23%"}, {"label": "Amélioration du ticket moyen", "value": "+27%"}, {"label": "Optimisation inventaire", "value": "-33%"}], "country": "France", "features": [{"title": "Gestion Côte de Nuits", "desc": "Cataloguez Gevrey-Chambertin, Vosne-Romanée, Nuits-Saint-Georges"}, {"title": "Accords Coq au Vin Bourguignon", "desc": "Recommandations pour gastronomie bourguignonne classique"}, {"title": "Expertise Chablis", "desc": "Gestion complète des blancs terroirs de Chablis"}, {"title": "Gestion Millésimes", "desc": "Suivi périodes d''apogée pour optimiser service"}], "problems": ["Gestion complexe de centaines de références Bourgogne", "Authentification des grands crus de Côte de Nuits", "Accords avec coq au vin et gastronomie régionale", "Marges insuffisantes sur grands crus", "Formation personnel à oenologie bourguignonne"], "city_name": "Dijon", "ticket_medio": "45€-140€"}'::jsonb,
  '[{"q": "Comment gérer Gevrey-Chambertin et Côte de Nuits ?", "a": "Notre système classe chaque appellation avec historique des millésimes pour optimiser sélection."}, {"q": "Avez-vous des accords pour coq au vin ?", "a": "Oui, nous proposons recommandations spécifiques pour cette spécialité bourguignonne."}, {"q": "Comment savoir quand servir les grands crus ?", "a": "Notre outil suit périodes d''apogée pour recommander meilleur moment de service."}]'::jsonb,
  '["logiciel-carte-des-vins-beaune", "logiciel-carte-des-vins-paris", "logiciel-carte-des-vins-lyon"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-grenoble',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Grenoble | Winerim',
  'Gérez votre cave grenobloise. Sélection Rhône, Savoie et vins alpins pour restaurants de Grenoble.',
  'Grenoble, France',
  'Logiciel de carte des vins pour Grenoble et la Savoie',
  'Optimisez votre sélection vins Rhône, Savoie et Alpes',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Grenoble, porte des Alpes, offre une sélection unique en vins de Rhône, Savoie et cépages alpins. Nos clients grenoblois gèrent 125 références avec ticket moyen de 44€, spécialisés dans Syrah, Jacquère et Mondeuse.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+19%"}, {"label": "Amélioration du ticket moyen", "value": "+22%"}, {"label": "Réduction stock dormant", "value": "-29%"}], "country": "France", "features": [{"title": "Expertise Rhône et Savoie", "desc": "Cataloguez Syrah de Rhône et cépages alpins savoyards"}, {"title": "Accords Cuisine Alpine", "desc": "Recommandations pour tartiflette, fondue et raclette"}, {"title": "Vins Mondeuse et Jacquère", "desc": "Gestion spécialisée des cépages de montagne"}, {"title": "Connectivité Vignerons Alpes", "desc": "Réseautez avec producteurs Rhône et Savoie"}], "problems": ["Connaissance insuffisante des cépages alpins", "Accords complexes avec fondue et raclette", "Stock dormant de petites AOC de montagne", "Manque de visibilité producteurs locaux", "Marges insuffisantes sur vins régionaux"], "city_name": "Grenoble", "ticket_medio": "28€-75€"}'::jsonb,
  '[{"q": "Comment valoriser les vins de Savoie ?", "a": "Notre système recommande meilleurs crus savoyards pour enrichir votre sélection alpine."}, {"q": "Avez-vous des accords pour tartiflette et fondue ?", "a": "Oui, nous proposons pairings optimisés pour gastronomie montagnarde."}, {"q": "Comment connecter avec vignerons alpins ?", "a": "Notre plateforme facilite relations directes avec producteurs Rhône et Savoie."}]'::jsonb,
  '["logiciel-carte-des-vins-chambery", "logiciel-carte-des-vins-lyon", "logiciel-carte-des-vins-annecy"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-aix-en-provence',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Aix-en-Provence | Winerim',
  'Optimisez votre cave provençale. Rosés AOC, vins régionaux pour restaurants d''Aix-en-Provence et Provence.',
  'Aix-en-Provence, France',
  'Logiciel de carte des vins pour Aix-en-Provence',
  'Maîtrisez les rosés de Provence et terroirs provençaux',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Aix-en-Provence, cité romaine, impose une expertise en rosés AOC Provence et terroirs régionaux. Nos clients aixois gèrent 130 références avec ticket moyen de 46€, spécialisés dans rosés secs et blancs minéraux provençaux.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+21%"}, {"label": "Amélioration du ticket moyen", "value": "+24%"}, {"label": "Optimisation cave", "value": "-30%"}], "country": "France", "features": [{"title": "Gestion Rosés Provence", "desc": "Cataloguez AOC Provence avec notes de fraîcheur et saisonnalité"}, {"title": "Accords Gastronomie Provençale", "desc": "Recommandations pour tapenade, bouillabaisse et ratatouille"}, {"title": "Blancs Minéraux Régionaux", "desc": "Gestion spécialisée des blancs secs provençaux"}, {"title": "Connectivité Producteurs Provence", "desc": "Réseautez avec vignerons des Côtes de Provence"}], "problems": ["Gestion complexe des rosés saisonniers", "Accords avec cuisine méditerranéenne variée", "Stock dormant de vins d''importation", "Manque de visibilité producteurs locaux", "Marges insuffisantes sur rosés régionaux"], "city_name": "Aix-en-Provence", "ticket_medio": "30€-85€"}'::jsonb,
  '[{"q": "Comment développer ma sélection de rosés ?", "a": "Notre système recommande meilleurs rosés Provence pour enrichir votre offre saisonnière."}, {"q": "Avez-vous des accords pour tapenade et ratatouille ?", "a": "Oui, nous proposons pairings contextuels pour gastronomie méditerranéenne."}, {"q": "Pouvez-nous nous connecter avec producteurs ?", "a": "Absolument, connectons directement avec vignerons Côtes de Provence."}]'::jsonb,
  '["logiciel-carte-des-vins-marseille", "logiciel-carte-des-vins-nice", "logiciel-carte-des-vins-avignon"]'::jsonb,
  'Article',
  true
);


INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-avignon',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Avignon | Winerim',
  'Gérez votre cave avignonnaise. Rhône, Châteauneuf-du-Pape et vins provençaux pour restaurants d''Avignon.',
  'Avignon, France',
  'Logiciel de carte des vins pour Avignon et le Rhône',
  'Optimisez votre sélection Châteauneuf-du-Pape et Rhône',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Avignon, cité papale, exige une expertise complète en Châteauneuf-du-Pape, Gigondas et vins de Rhône. Nos clients avignonnais gèrent 160 références avec ticket moyen de 50€, spécialisés dans cépages Grenache et Mourvèdre prestigieux.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+22%"}, {"label": "Amélioration du ticket moyen", "value": "+25%"}, {"label": "Réduction stock dormant", "value": "-31%"}], "country": "France", "features": [{"title": "Gestion Châteauneuf-du-Pape", "desc": "Cataloguez ces grands crus avec notes terroir et profils de dégustation"}, {"title": "Accords Gastronomie Papal", "desc": "Recommandations pour cuisine provençale raffinée"}, {"title": "Expertise Gigondas", "desc": "Gestion spécialisée des grands crus des Dentelles"}, {"title": "Connectivité Producteurs Rhône", "desc": "Réseautez avec vignerons de Châteauneuf-du-Pape"}], "problems": ["Gestion complexe de Châteauneuf-du-Pape", "Authentification des grands crus prestigieux", "Accords avec gastronomie régionale", "Marges insuffisantes sur vins de prestige", "Formation personnel oenologie rhodanienne"], "city_name": "Avignon", "ticket_medio": "35€-95€"}'::jsonb,
  '[{"q": "Comment gérer Châteauneuf-du-Pape et Gigondas ?", "a": "Notre système classe ces terroirs prestigieux avec notes d''apogée pour optimiser votre sélection."}, {"q": "Avez-vous des accords pour gastronomie provençale ?", "a": "Oui, nous proposons recommandations contextuelles pour cuisine de la région papale."}, {"q": "Pouvez-nous nous connecter avec vignerons ?", "a": "Absolument, facilitons relations directes avec producteurs Châteauneuf-du-Pape."}]'::jsonb,
  '["logiciel-carte-des-vins-arles", "logiciel-carte-des-vins-nimes", "logiciel-carte-des-vins-lyon"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-tours',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Tours | Winerim',
  'Optimisez votre cave tourangelle. Loire, Chinon et Bourgueil pour restaurants de la vallée de la Loire.',
  'Tours, France',
  'Logiciel de carte des vins pour Tours et la Loire',
  'Maîtrisez Chinon, Bourgueil et vins de Loire blanc',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Tours, capitale de la Loire, impose une expertise en Chinon, Bourgueil et blancs de Loire. Nos clients tourangeaux gèrent 115 références avec ticket moyen de 40€, spécialisés dans Cabernet Franc rouge et Chenin blanc prestigieux.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+18%"}, {"label": "Amélioration du ticket moyen", "value": "+21%"}, {"label": "Réduction stock dormant", "value": "-28%"}], "country": "France", "features": [{"title": "Expertise Chinon et Bourgueil", "desc": "Cataloguez ces terroirs de Loire avec notes Cabernet Franc"}, {"title": "Accords Gastronomie Tourangelle", "desc": "Recommandations pour escalope à la crème et fricassée"}, {"title": "Blancs de Loire Chenin", "desc": "Gestion spécialisée des blancs secs et moelleux"}, {"title": "Connectivité Vignerons Loire", "desc": "Réseautez avec producteurs Chinon et Bourgueil"}], "problems": ["Connaissance insuffisante Chinon et Bourgueil", "Accords complexes avec cuisine tourangelle", "Stock dormant de petites AOC", "Manque visibilité producteurs locaux", "Marges faibles sur vins régionaux"], "city_name": "Tours", "ticket_medio": "27€-72€"}'::jsonb,
  '[{"q": "Comment valoriser Chinon et Bourgueil ?", "a": "Notre système recommande meilleurs Cabernet Franc pour enrichir votre sélection Loire."}, {"q": "Avez-vous des accords pour escalope à la crème ?", "a": "Oui, nous proposons pairings optimisés pour cuisine tourangelle traditionnelle."}, {"q": "Pouvez-nous nous connecter avec vignerons ?", "a": "Notre plateforme facilite relations directes avec producteurs de Chinon."}]'::jsonb,
  '["logiciel-carte-des-vins-angers", "logiciel-carte-des-vins-nantes", "logiciel-carte-des-vins-chinon"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-angers',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Angers | Winerim',
  'Gérez votre cave angevine. Cabernet d''Anjou, Loire blanc et sélections régionales pour restaurants d''Angers.',
  'Angers, France',
  'Logiciel de carte des vins pour Angers et Anjou',
  'Optimisez votre sélection Cabernet d''Anjou et Loire',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Angers, cité angevine, exige une expertise en Cabernet d''Anjou, Quarts de Chaume et blancs de Loire. Nos clients angevins gèrent 105 références avec ticket moyen de 36€, spécialisés dans rouges et moelleux prestigieux.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+17%"}, {"label": "Amélioration du ticket moyen", "value": "+19%"}, {"label": "Réduction stock dormant", "value": "-26%"}], "country": "France", "features": [{"title": "Expertise Cabernet d''Anjou", "desc": "Cataloguez ce terroir prestigieux avec notes de profil"}, {"title": "Accords Quarts de Chaume", "desc": "Recommandations pour moelleux et cuisine régionale"}, {"title": "Loire Blanc Chenin", "desc": "Gestion spécialisée des Quarts de Chaume et Bonnezeaux"}, {"title": "Connectivité Vignerons Anjou", "desc": "Réseautez avec producteurs angevins"}], "problems": ["Connaissance insuffisante Cabernet d''Anjou", "Accords complexes avec moelleux", "Stock dormant de petites AOC", "Manque visibilité producteurs", "Marges faibles sur régionaux"], "city_name": "Angers", "ticket_medio": "24€-65€"}'::jsonb,
  '[{"q": "Comment développer ma sélection de Cabernet ?", "a": "Notre système recommande meilleurs Cabernet d''Anjou pour enrichir votre offre."}, {"q": "Avez-vous des accords pour Quarts de Chaume ?", "a": "Oui, proposons recommandations pour ces moelleux prestigieux d''Anjou."}, {"q": "Comment connecter avec vignerons ?", "a": "Notre plateforme facilite relations directes avec producteurs angevins."}]'::jsonb,
  '["logiciel-carte-des-vins-tours", "logiciel-carte-des-vins-nantes", "logiciel-carte-des-vins-le-havre"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-perpignan',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Perpignan | Winerim',
  'Optimisez votre cave perpignanaise. Vins du Roussillon, Banyuls et terroirs du sud pour restaurants catalans.',
  'Perpignan, France',
  'Logiciel de carte des vins pour Perpignan et le Roussillon',
  'Maîtrisez Banyuls, Maury et terroirs du Roussillon',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Perpignan, cité catalane, impose expertise en Banyuls, Maury et terroirs du Roussillon. Nos clients perpignanais gèrent 95 références avec ticket moyen de 38€, spécialisés dans vins doux naturels et rouges fortifiés.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+19%"}, {"label": "Amélioration du ticket moyen", "value": "+22%"}, {"label": "Réduction stock dormant", "value": "-27%"}], "country": "France", "features": [{"title": "Expertise Banyuls et Maury", "desc": "Cataloguez vins doux naturels prestigieux catalans"}, {"title": "Accords Cuisine Catalane", "desc": "Recommandations pour escalivada et butifarra roussillonnaise"}, {"title": "Vins Fortifiés Régionaux", "desc": "Gestion spécialisée des vins doux naturels Roussillon"}, {"title": "Connectivité Producteurs Catalans", "desc": "Réseautez avec vignerons du Roussillon"}], "problems": ["Connaissance insuffisante Banyuls et Maury", "Accords complexes avec cuisine catalane", "Stock dormant de petites AOC", "Manque visibilité producteurs", "Marges insuffisantes sur VDN"], "city_name": "Perpignan", "ticket_medio": "26€-70€"}'::jsonb,
  '[{"q": "Comment développer ma sélection de Banyuls ?", "a": "Notre système recommande meilleurs Banyuls pour enrichir votre offre de vins doux."}, {"q": "Avez-vous des accords pour escalivada ?", "a": "Oui, proposons pairings optimisés pour cuisine catalane roussillonnaise."}, {"q": "Pouvez-nous nous connecter avec vignerons ?", "a": "Notre plateforme facilite relations directes avec producteurs du Roussillon."}]'::jsonb,
  '["logiciel-carte-des-vins-montpellier", "logiciel-carte-des-vins-toulouse", "logiciel-carte-des-vins-collioure"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-bayonne',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Bayonne | Winerim',
  'Gérez votre cave bayonnaise. Vins du Sud-Ouest, Irouléguy et terroirs basques pour restaurants de Bayonne.',
  'Bayonne, France',
  'Logiciel de carte des vins pour Bayonne et Pays Basque',
  'Optimisez votre sélection vins basques et sud-ouest',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Bayonne, cité basque, impose expertise en Irouléguy, Madiran et terroirs du Sud-Ouest. Nos clients bayonnais gèrent 90 références avec ticket moyen de 37€, spécialisés dans cépages rouges basques et vins de Béarn.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+17%"}, {"label": "Amélioration du ticket moyen", "value": "+20%"}, {"label": "Réduction stock dormant", "value": "-26%"}], "country": "France", "features": [{"title": "Expertise Irouléguy", "desc": "Cataloguez terroir basque unique avec notes minerales"}, {"title": "Accords Cuisine Basque", "desc": "Recommandations pour piperade et viande grillée"}, {"title": "Madiran et Béarn", "desc": "Gestion spécialisée des vins tanniques du Sud-Ouest"}, {"title": "Connectivité Vignerons Basques", "desc": "Réseautez avec producteurs locaux"}], "problems": ["Connaissance insuffisante Irouléguy", "Accords complexes avec cuisine basque", "Stock dormant de petites AOC", "Manque visibilité producteurs locaux", "Marges insuffisantes sur régionaux"], "city_name": "Bayonne", "ticket_medio": "25€-65€"}'::jsonb,
  '[{"q": "Comment développer ma sélection d''Irouléguy ?", "a": "Notre système recommande meilleurs Irouléguy basques pour enrichir sélection."}, {"q": "Avez-vous des accords pour piperade ?", "a": "Oui, proposons pairings optimisés pour cuisine basque traditionnelle."}, {"q": "Pouvez-nous nous connecter avec vignerons ?", "a": "Notre plateforme facilite relations directes avec producteurs basques."}]'::jsonb,
  '["logiciel-carte-des-vins-biarritz", "logiciel-carte-des-vins-pau", "logiciel-carte-des-vins-toulouse"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-biarritz',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Biarritz | Winerim',
  'Optimisez votre cave biarrote. Sélection premium côtière pour restaurants haut de gamme de Biarritz.',
  'Biarritz, France',
  'Logiciel de carte des vins pour Biarritz et Côte Basque',
  'Maîtrisez vins basques, Irouléguy et sélections premium',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Biarritz, station balnéaire haut de gamme, impose expertise en vins basques, Irouléguy et sélections méditerranéennes. Nos clients biarrots gèrent 130 références avec ticket moyen de 55€, adaptés clientèle touristique premium.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+20%"}, {"label": "Amélioration du ticket moyen", "value": "+23%"}, {"label": "Optimisation cave", "value": "-29%"}], "country": "France", "features": [{"title": "Sélection Basque Premium", "desc": "Cataloguez Irouléguy et grands crus basques"}, {"title": "Accords Fruits de Mer Côtiers", "desc": "Recommandations pour poissons et crustacés de l''Atlantique"}, {"title": "Vins Importés Prestigieux", "desc": "Gestion spécialisée sélections méditerranéennes haut de gamme"}, {"title": "Gestion Clientèle Touristique Premium", "desc": "Adaptation pics saisonniers touristiques"}], "problems": ["Attentes clients très élevées prestige", "Gestion saisonnalité touristique", "Coexistence vins locaux et importés", "Manque formation terroirs basques", "Marges insuffisantes haute saison"], "city_name": "Biarritz", "ticket_medio": "40€-120€"}'::jsonb,
  '[{"q": "Comment développer sélection Irouléguy ?", "a": "Notre système recommande meilleurs Irouléguy basques pour clientèle premium."}, {"q": "Avez-vous accords pour fruits de mer côtiers ?", "a": "Oui, proposons recommandations pour poissons et crustacés Atlantique."}, {"q": "Comment gérer pics touristiques ?", "a": "Notre outil anticipe variations demande pour optimiser stock saisonnier."}]'::jsonb,
  '["logiciel-carte-des-vins-bayonne", "logiciel-carte-des-vins-nice", "logiciel-carte-des-vins-cannes"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-cannes',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Cannes | Winerim',
  'Gérez votre cave cannoise. Vins premium Côte d''Azur pour restaurants haut de gamme et hotels de Cannes.',
  'Cannes, France',
  'Logiciel de carte des vins pour Cannes et Côte d''Azur',
  'Optimisez votre sélection vins premium méditerranéens',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Cannes, mecca touristique haut de gamme, exige sélection vinicole prestigieuse mêlant Provence, vins côtiers et importations mondiales. Nos clients cannois gèrent 200+ références avec ticket moyen de 65€, adaptés clientèle internationale.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+23%"}, {"label": "Amélioration du ticket moyen", "value": "+26%"}, {"label": "Optimisation cave", "value": "-32%"}], "country": "France", "features": [{"title": "Sélection Premium Côte d''Azur", "desc": "Cataloguez vins prestige avec traçabilité authentification"}, {"title": "Accords Gastronomie Côtière", "desc": "Recommandations pour bouillabaisse et fruits de mer"}, {"title": "Gestion Clientèle Touristique VIP", "desc": "Adaptation pics festival et clientèle changante"}, {"title": "Sélections Mondiales Premium", "desc": "Intégration vins importés haut de gamme"}], "problems": ["Attentes clients très élevées prestige", "Gestion pics festivaliers intenses", "Coexistence vins locaux et mondiales", "Manque formation terroirs locaux", "Marges insuffisantes haute saison"], "city_name": "Cannes", "ticket_medio": "45€-180€"}'::jsonb,
  '[{"q": "Comment développer sélection prestige ?", "a": "Notre système identifie vins Provence réputés et facilite commandes premium."}, {"q": "Avez-vous accords pour bouillabaisse ?", "a": "Oui, proposons recommandations contextuelles pour gastronomie côtière."}, {"q": "Comment gérer pics festivaliers ?", "a": "Notre outil anticipe variations demande pour optimiser stock saisonnier."}]'::jsonb,
  '["logiciel-carte-des-vins-nice", "logiciel-carte-des-vins-saint-tropez", "logiciel-carte-des-vins-marseille"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-saint-tropez',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Saint-Tropez | Winerim',
  'Optimisez votre cave saint-tropézienne. Rosés haut de gamme et vins premium pour restaurants mythiques de Saint-Tropez.',
  'Saint-Tropez, France',
  'Logiciel de carte des vins pour Saint-Tropez',
  'Maîtrisez les rosés de Provence et sélections premium',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Saint-Tropez, village mythique, impose sélection de rosés Provence premium et vins haut de gamme pour clientèle jet-set. Nos clients tropéziens gèrent 150 références avec ticket moyen de 60€, spécialisés rosés secs et blancs minéraux.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+22%"}, {"label": "Amélioration du ticket moyen", "value": "+25%"}, {"label": "Optimisation cave", "value": "-30%"}], "country": "France", "features": [{"title": "Rosés Provence Premium", "desc": "Cataloguez rosés AOC prestige avec notes fraîcheur"}, {"title": "Accords Gastronomie Méditerranéenne", "desc": "Recommandations pour cuisine côtière haut de gamme"}, {"title": "Vins Blancs Minéraux", "desc": "Gestion spécialisée blancs secs prestige"}, {"title": "Gestion Clientèle Cosmopolite", "desc": "Adaptation pics estivaux et clientèle internationale"}], "problems": ["Attentes extrêmement élevées prestige", "Gestion intensité saisonnalité estivale", "Coexistence rosés régionaux et importations", "Marges très importantes à optimiser", "Formation personnel à luxe vinicole"], "city_name": "Saint-Tropez", "ticket_medio": "40€-150€"}'::jsonb,
  '[{"q": "Comment développer sélection rosés prestige ?", "a": "Notre système identifie meilleurs rosés Provence pour clientèle VIP."}, {"q": "Avez-vous accords pour cuisine côtière haut de gamme ?", "a": "Oui, proposons recommandations pour gastronomie méditerranéenne premium."}, {"q": "Comment gérer pics estivaux extrêmes ?", "a": "Notre outil anticipe variations intenses pour optimiser stock estival."}]'::jsonb,
  '["logiciel-carte-des-vins-cannes", "logiciel-carte-des-vins-nice", "logiciel-carte-des-vins-aix-en-provence"]'::jsonb,
  'Article',
  true
);


INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-colmar',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Colmar | Winerim',
  'Gérez votre cave colmarienne. Riesling Alsace, Gewurztraminer et terroirs alsaciens pour restaurants de Colmar.',
  'Colmar, France',
  'Logiciel de carte des vins pour Colmar et l''Alsace',
  'Optimisez votre sélection Riesling et Gewurztraminer',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Colmar, cité médiévale alsacienne, exige expertise complète en Riesling Grand Cru, Gewurztraminer et Pinot Gris. Nos clients colmariens gèrent 85 références avec ticket moyen de 33€, spécialisés cépages alsaciens aromatiques.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+16%"}, {"label": "Amélioration du ticket moyen", "value": "+18%"}, {"label": "Réduction stock dormant", "value": "-24%"}], "country": "France", "features": [{"title": "Expertise Riesling Grand Cru", "desc": "Cataloguez terroirs Colmar avec classification prestigieuse"}, {"title": "Accords Cuisine Alsacienne", "desc": "Recommandations pour choucroute et spécialités régionales"}, {"title": "Cépages Aromatiques", "desc": "Gestion spécialisée Gewurztraminer et Muscat"}, {"title": "Connectivité Vignerons Locaux", "desc": "Réseautez avec producteurs colmariens"}], "problems": ["Connaissance cépages alsaciens insuffisante", "Accords complexes avec choucroute garnie", "Stock dormant petites AOC", "Manque visibilité producteurs", "Marges insuffisantes sur régionaux"], "city_name": "Colmar", "ticket_medio": "22€-55€"}'::jsonb,
  '[{"q": "Comment gérer Riesling Grand Cru ?", "a": "Notre système classe Riesling par terroir avec notes profil pour sélection optimale."}, {"q": "Avez-vous accords pour choucroute ?", "a": "Oui, proposons recommandations spécifiques pour spécialités alsaciennes."}, {"q": "Comment connecter avec vignerons ?", "a": "Notre plateforme facilite relations directes avec producteurs colmariens."}]'::jsonb,
  '["logiciel-carte-des-vins-strasbourg", "logiciel-carte-des-vins-beaune", "logiciel-carte-des-vins-reims"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-beaune',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Beaune | Winerim',
  'Optimisez votre cave beaunoise. Bourgogne Côte de Beaune, Hospices et terroirs prestigieux pour restaurants de Beaune.',
  'Beaune, France',
  'Logiciel de carte des vins pour Beaune en Bourgogne',
  'Maîtrisez les vins de Beaune et Côte de Beaune',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Beaune, cité des Hospices, exige expertise complète en Bourgogne rouge, Côte de Beaune et blancs de Meursault. Nos clients beaunoises gèrent 200 références avec ticket moyen de 58€, spécialisés Pinot Noir de prestige.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+21%"}, {"label": "Amélioration du ticket moyen", "value": "+24%"}, {"label": "Optimisation cave", "value": "-30%"}], "country": "France", "features": [{"title": "Expertise Côte de Beaune", "desc": "Cataloguez Pommard, Volnay, Corton avec notes terroir"}, {"title": "Accords Cuisine Bourguignonne", "desc": "Recommandations pour boeuf bourguignon et poularde"}, {"title": "Blancs Meursault", "desc": "Gestion spécialisée des blancs chardonnay prestigieux"}, {"title": "Hospices et Ventes Annuelles", "desc": "Suivi lots Hospices et millésimes d''investissement"}], "problems": ["Gestion centaines références Bourgogne", "Authentification grands crus Côte Beaune", "Accords avec cuisine bourguignonne", "Marges insuffisantes grands crus", "Formation personnel oenologie bourguignonne"], "city_name": "Beaune", "ticket_medio": "42€-130€"}'::jsonb,
  '[{"q": "Comment gérer Pommard et Volnay ?", "a": "Notre système classe chaque appellation avec historique millésimes pour sélection optimale."}, {"q": "Avez-vous accords pour boeuf bourguignon ?", "a": "Oui, proposons recommandations spécifiques pour spécialités bourguignonnes."}, {"q": "Comment suivre ventes Hospices ?", "a": "Notre outil intègre calendrier Hospices pour anticiper millésimes importants."}]'::jsonb,
  '["logiciel-carte-des-vins-dijon", "logiciel-carte-des-vins-paris", "logiciel-carte-des-vins-chablis"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-carcassonne',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Carcassonne | Winerim',
  'Gérez votre cave carcassonnaise. Languedoc, Corbières et terroirs occitans pour restaurants de Carcassonne.',
  'Carcassonne, France',
  'Logiciel de carte des vins pour Carcassonne',
  'Optimisez votre sélection Corbières et Languedoc',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Carcassonne, forteresse occitane, impose expertise en Corbières, Minervois et terroirs Languedoc du sud. Nos clients carcassonnais gèrent 110 références avec ticket moyen de 40€, spécialisés cépages méridionaux Grenache.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+18%"}, {"label": "Amélioration du ticket moyen", "value": "+21%"}, {"label": "Réduction stock dormant", "value": "-27%"}], "country": "France", "features": [{"title": "Expertise Corbières", "desc": "Cataloguez terroirs montagneux Corbières avec notes"}, {"title": "Accords Cassoulet Languedoc", "desc": "Recommandations pour cuisine occitane traditionnelle"}, {"title": "Minervois et Grenache", "desc": "Gestion spécialisée cépages méridionaux robustes"}, {"title": "Connectivité Producteurs", "desc": "Réseautez avec vignerons Corbières locaux"}], "problems": ["Connaissance insuffisante Corbières", "Accords complexes avec cassoulet", "Stock dormant petites AOC", "Manque visibilité producteurs", "Marges faibles sur régionaux"], "city_name": "Carcassonne", "ticket_medio": "28€-75€"}'::jsonb,
  '[{"q": "Comment développer sélection Corbières ?", "a": "Notre système recommande meilleurs Corbières pour enrichir offre."}, {"q": "Avez-vous accords pour cassoulet ?", "a": "Oui, proposons pairings optimisés pour spécialité occitane."}, {"q": "Comment connecter avec vignerons ?", "a": "Notre plateforme facilite relations directes producteurs Corbières."}]'::jsonb,
  '["logiciel-carte-des-vins-montpellier", "logiciel-carte-des-vins-toulouse", "logiciel-carte-des-vins-nimes"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-metz',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Metz | Winerim',
  'Optimisez votre cave messine. Sélection Alsace, Lorraine et vins de l''Est pour restaurants de Metz.',
  'Metz, France',
  'Logiciel de carte des vins pour Metz et Lorraine',
  'Maîtrisez vins Alsace, Lorraine et terroirs de l''Est',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Metz, cité lorraine, impose expertise en vins Alsace, Moselle et Lorraine. Nos clients messins gèrent 95 références avec ticket moyen de 34€, spécialisés vins secs alsaciens et Riesling élégants.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+16%"}, {"label": "Amélioration du ticket moyen", "value": "+19%"}, {"label": "Réduction stock dormant", "value": "-25%"}], "country": "France", "features": [{"title": "Expertise Riesling Alsace", "desc": "Cataloguez vins secs alsaciens avec notes minéralité"}, {"title": "Accords Quiche Lorraine", "desc": "Recommandations pour gastronomie lorraine traditionnelle"}, {"title": "Vins Lorraine", "desc": "Gestion spécialisée terroirs lorrains régionaux"}, {"title": "Connectivité Vignerons Est", "desc": "Réseautez avec producteurs Alsace et Lorraine"}], "problems": ["Connaissance insuffisante Riesling", "Accords complexes gastronomie lorraine", "Stock dormant petites AOC", "Manque visibilité producteurs locaux", "Marges insuffisantes régionaux"], "city_name": "Metz", "ticket_medio": "23€-60€"}'::jsonb,
  '[{"q": "Comment développer sélection Riesling ?", "a": "Notre système recommande meilleurs Riesling alsaciens secs."}, {"q": "Avez-vous accords pour quiche lorraine ?", "a": "Oui, proposons recommandations pour gastronomie lorraine."}, {"q": "Comment connecter avec vignerons ?", "a": "Notre plateforme facilite relations producteurs Alsace."}]'::jsonb,
  '["logiciel-carte-des-vins-nancy", "logiciel-carte-des-vins-strasbourg", "logiciel-carte-des-vins-reims"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-nancy',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Nancy | Winerim',
  'Gérez votre cave nancéienne. Vins Alsace, Lorraine et sélections régionales pour restaurants de Nancy.',
  'Nancy, France',
  'Logiciel de carte des vins pour Nancy',
  'Optimisez votre sélection vins Alsace et Lorraine',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Nancy, cité stanislas, impose expertise en vins Alsace, Moselle et Lorraine. Nos clients nancéiens gèrent 90 références avec ticket moyen de 33€, spécialisés blancs secs alsaciens élégants.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+15%"}, {"label": "Amélioration du ticket moyen", "value": "+18%"}, {"label": "Réduction stock dormant", "value": "-24%"}], "country": "France", "features": [{"title": "Expertise Alsace Blanc", "desc": "Cataloguez Riesling et Gewurztraminer avec notes profil"}, {"title": "Accords Gastronomie Lorraine", "desc": "Recommandations pour potée lorraine et spécialités régionales"}, {"title": "Vins Moselle Région", "desc": "Gestion spécialisée terroirs lorrains uniques"}, {"title": "Connectivité Vignerons", "desc": "Réseautez avec producteurs région Est"}], "problems": ["Connaissance insuffisante cépages alsaciens", "Accords complexes gastronomie régionale", "Stock dormant petites AOC", "Manque visibilité producteurs", "Marges faibles régionaux"], "city_name": "Nancy", "ticket_medio": "22€-58€"}'::jsonb,
  '[{"q": "Comment valoriser blancs alsaciens ?", "a": "Notre système recommande meilleurs blancs pour enrichir sélection."}, {"q": "Avez-vous accords pour potée lorraine ?", "a": "Oui, proposons recommandations pour gastronomie lorraine."}, {"q": "Comment connecter avec vignerons ?", "a": "Notre plateforme facilite relations producteurs Est."}]'::jsonb,
  '["logiciel-carte-des-vins-metz", "logiciel-carte-des-vins-strasbourg", "logiciel-carte-des-vins-reims"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-rouen',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Rouen | Winerim',
  'Optimisez votre cave rouennaise. Loire, Normandie et vins côtiers pour restaurants de Rouen et Normandie.',
  'Rouen, France',
  'Logiciel de carte des vins pour Rouen et Normandie',
  'Maîtrisez vins Loire, Normandie et sélections côtières',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Rouen, cité normande, impose expertise en vins Loire, Cidre Normandie et sélections côtières. Nos clients rouennais gèrent 105 références avec ticket moyen de 37€, spécialisés blancs secs Loire et cidres régionaux.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+17%"}, {"label": "Amélioration du ticket moyen", "value": "+20%"}, {"label": "Réduction stock dormant", "value": "-26%"}], "country": "France", "features": [{"title": "Expertise Loire Blanc", "desc": "Cataloguez vins secs Loire minéraux avec notes"}, {"title": "Accords Cuisine Normande", "a": "Recommandations pour fruits de mer et gastronomie régionale"}, {"title": "Cidre et Pommeau Normandie", "desc": "Gestion spécialisée cidres et alcools normands"}, {"title": "Connectivité Vignerons Loire", "desc": "Réseautez avec producteurs Loire atlantique"}], "problems": ["Connaissance insuffisante vins Loire", "Accords complexes avec fruits de mer", "Stock dormant petites AOC", "Manque visibilité producteurs", "Marges faibles régionaux"], "city_name": "Rouen", "ticket_medio": "25€-65€"}'::jsonb,
  '[{"q": "Comment valoriser blancs Loire ?", "a": "Notre système recommande meilleurs blancs secs Loire."}, {"q": "Avez-vous accords pour fruits de mer ?", "a": "Oui, proposons pairings optimisés pour crustacés."}, {"q": "Comment gérer cidres normands ?", "a": "Notre plateforme intègre cidres et pommeau régionaux."}]'::jsonb,
  '["logiciel-carte-des-vins-caen", "logiciel-carte-des-vins-tours", "logiciel-carte-des-vins-le-havre"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-caen',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Caen | Winerim',
  'Gérez votre cave caennaise. Loire, vins normands et sélections côtières pour restaurants de Caen.',
  'Caen, France',
  'Logiciel de carte des vins pour Caen et Normandie',
  'Optimisez votre sélection Loire et vins normands',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Caen, capitale normande, impose expertise en vins Loire, cidres Normandie et vins côtiers. Nos clients caennais gèrent 95 références avec ticket moyen de 35€, spécialisés blancs secs et cidres régionaux.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+16%"}, {"label": "Amélioration du ticket moyen", "value": "+19%"}, {"label": "Réduction stock dormant", "value": "-25%"}], "country": "France", "features": [{"title": "Expertise Loire", "desc": "Cataloguez blancs secs Loire avec notes minéralité"}, {"title": "Accords Calvados et Gastronomie", "desc": "Recommandations pour cuisine normande traditionnelle"}, {"title": "Cidres et Poirés Normands", "desc": "Gestion spécialisée boissons fermentées régionales"}, {"title": "Connectivité Producteurs Loire", "desc": "Réseautez avec vignerons Loire atlantique"}], "problems": ["Connaissance insuffisante Loire", "Accords complexes gastronomie normande", "Stock dormant petites AOC", "Manque visibilité producteurs", "Marges insuffisantes régionaux"], "city_name": "Caen", "ticket_medio": "24€-62€"}'::jsonb,
  '[{"q": "Comment valoriser blancs Loire ?", "a": "Notre système recommande meilleurs blancs secs Loire caennais."}, {"q": "Avez-vous accords pour calvados ?", "a": "Oui, proposons recommandations pour gastronomie normande."}, {"q": "Comment intégrer cidres ?", "a": "Notre plateforme gère cidres et pommeau normands."}]'::jsonb,
  '["logiciel-carte-des-vins-rouen", "logiciel-carte-des-vins-le-havre", "logiciel-carte-des-vins-tours"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-le-havre',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Le Havre | Winerim',
  'Optimisez votre cave havraise. Loire, Normandie et sélections côtières pour restaurants havrais.',
  'Le Havre, France',
  'Logiciel de carte des vins pour Le Havre',
  'Maîtrisez vins Loire et fruits de mer normands',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Le Havre, port normand, impose expertise en vins Loire, cidres Normandie pour accompagner huîtres et poissons. Nos clients havrais gèrent 90 références avec ticket moyen de 34€, spécialisés blancs secs minéraux.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+15%"}, {"label": "Amélioration du ticket moyen", "value": "+18%"}, {"label": "Réduction stock dormant", "value": "-24%"}], "country": "France", "features": [{"title": "Loire Blanc Expertise", "desc": "Cataloguez blancs secs Loire avec notes profil"}, {"title": "Accords Huîtres et Fruits Mer", "desc": "Recommandations pour fruits de mer côtiers"}, {"title": "Cidres Normandie", "desc": "Gestion spécialisée cidres et pommeau régionaux"}, {"title": "Connectivité Producteurs Loire", "desc": "Réseautez avec vignerons Loire atlantique"}], "problems": ["Connaissance insuffisante vins Loire", "Accords complexes fruits de mer", "Stock dormant petites AOC", "Manque visibilité producteurs", "Marges faibles régionaux"], "city_name": "Le Havre", "ticket_medio": "23€-60€"}'::jsonb,
  '[{"q": "Comment valoriser blancs Loire ?", "a": "Notre système recommande meilleurs blancs secs minéraux."}, {"q": "Avez-vous accords pour huîtres ?", "a": "Oui, proposons pairings optimisés pour huîtres normanddes."}, {"q": "Comment gérer cidres ?", "a": "Notre plateforme intègre cidres et pommeau normands."}]'::jsonb,
  '["logiciel-carte-des-vins-rouen", "logiciel-carte-des-vins-caen", "logiciel-carte-des-vins-la-rochelle"]'::jsonb,
  'Article',
  true
);


INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-poitiers',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Poitiers | Winerim',
  'Gérez votre cave poitevine. Loire, Haut-Poitou et vins régionaux pour restaurants de Poitiers.',
  'Poitiers, France',
  'Logiciel de carte des vins pour Poitiers',
  'Optimisez votre sélection Loire et Haut-Poitou',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Poitiers, cité médiévale, impose expertise en vins Loire, Haut-Poitou et blancs régionaux. Nos clients poitevins gèrent 85 références avec ticket moyen de 32€, spécialisés blancs secs légers régionaux.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+15%"}, {"label": "Amélioration du ticket moyen", "value": "+17%"}, {"label": "Réduction stock dormant", "value": "-23%"}], "country": "France", "features": [{"title": "Loire Blanc Haut-Poitou", "desc": "Cataloguez blancs secs légers régionaux"}, {"title": "Accords Cuisine Poitevine", "desc": "Recommandations pour gastronomie régionale"}, {"title": "Vins Régionaux Légers", "desc": "Gestion spécialisée blancs secs Haut-Poitou"}, {"title": "Connectivité Producteurs Loire", "desc": "Réseautez avec vignerons Loire"}], "problems": ["Connaissance insuffisante Loire", "Accords complexes gastronomie régionale", "Stock dormant petites AOC", "Manque visibilité producteurs", "Marges insuffisantes régionaux"], "city_name": "Poitiers", "ticket_medio": "22€-55€"}'::jsonb,
  '[{"q": "Comment valoriser blancs Loire ?", "a": "Notre système recommande meilleurs blancs secs Haut-Poitou."}, {"q": "Avez-vous accords pour cuisine poitevine ?", "a": "Oui, proposons recommandations pour gastronomie régionale."}, {"q": "Comment connecter avec vignerons ?", "a": "Notre plateforme facilite relations producteurs Loire."}]'::jsonb,
  '["logiciel-carte-des-vins-tours", "logiciel-carte-des-vins-angers", "logiciel-carte-des-vins-limoges"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-limoges',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Limoges | Winerim',
  'Optimisez votre cave limousine. Bordeaux, Bergerac et vins du Limousin pour restaurants de Limoges.',
  'Limoges, France',
  'Logiciel de carte des vins pour Limoges et Limousin',
  'Maîtrisez Bordeaux, Bergerac et terroirs régionaux',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Limoges, cité porcelainière, impose expertise en Bordeaux, Bergerac et vins Limousin. Nos clients limousins gèrent 100 références avec ticket moyen de 38€, spécialisés rouges élégants et Merlot régionaux.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+16%"}, {"label": "Amélioration du ticket moyen", "value": "+19%"}, {"label": "Réduction stock dormant", "value": "-25%"}], "country": "France", "features": [{"title": "Bordeaux et Bergerac", "desc": "Cataloguez Merlot et terroirs avec notes profil"}, {"title": "Accords Gastronomie Limousine", "desc": "Recommandations pour clafoutis et cuisine régionale"}, {"title": "Vins Limousin Régionaux", "desc": "Gestion spécialisée rouges légers régionaux"}, {"title": "Connectivité Producteurs", "desc": "Réseautez avec vignerons Bergerac"}], "problems": ["Connaissance insuffisante Bordeaux", "Accords complexes gastronomie régionale", "Stock dormant petites AOC", "Manque visibilité producteurs", "Marges insuffisantes régionaux"], "city_name": "Limoges", "ticket_medio": "26€-70€"}'::jsonb,
  '[{"q": "Comment valoriser Bordeaux et Bergerac ?", "a": "Notre système recommande meilleurs crus Bordeaux pour enrichir."}, {"q": "Avez-vous accords pour clafoutis ?", "a": "Oui, proposons recommandations pour gastronomie limousine."}, {"q": "Comment connecter avec vignerons ?", "a": "Notre plateforme facilite relations producteurs Bergerac."}]'::jsonb,
  '["logiciel-carte-des-vins-toulouse", "logiciel-carte-des-vins-poitiers", "logiciel-carte-des-vins-bordeaux"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-clermont-ferrand',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Clermont-Ferrand | Winerim',
  'Gérez votre cave clermontoise. Côtes d''Auvergne, Loire et vins régionaux pour restaurants d''Auvergne.',
  'Clermont-Ferrand, France',
  'Logiciel de carte des vins pour Clermont-Ferrand',
  'Optimisez votre sélection Côtes Auvergne et Loire',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Clermont-Ferrand, capitale auvergnate, impose expertise en Côtes d''Auvergne, Loire et vins régionaux. Nos clients clermontois gèrent 80 références avec ticket moyen de 31€, spécialisés rouges légers et Pinot Noir.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+14%"}, {"label": "Amélioration du ticket moyen", "value": "+16%"}, {"label": "Réduction stock dormant", "value": "-22%"}], "country": "France", "features": [{"title": "Côtes d''Auvergne", "desc": "Cataloguez terroirs auvergnats avec notes profil"}, {"title": "Accords Gastronomie Auvergnate", "desc": "Recommandations pour aligot et truffade"}, {"title": "Vins Légers Régionaux", "desc": "Gestion spécialisée rouges légers Auvergne"}, {"title": "Connectivité Producteurs Auvergne", "desc": "Réseautez avec vignerons locaux"}], "problems": ["Connaissance insuffisante Côtes Auvergne", "Accords complexes gastronomie régionale", "Stock dormant petites AOC", "Manque visibilité producteurs", "Marges insuffisantes régionaux"], "city_name": "Clermont-Ferrand", "ticket_medio": "21€-52€"}'::jsonb,
  '[{"q": "Comment valoriser Côtes Auvergne ?", "a": "Notre système recommande meilleurs crus locaux pour enrichir."}, {"q": "Avez-vous accords pour aligot ?", "a": "Oui, proposons recommandations pour gastronomie auvergnate."}, {"q": "Comment connecter avec vignerons ?", "a": "Notre plateforme facilite relations producteurs locaux."}]'::jsonb,
  '["logiciel-carte-des-vins-lyon", "logiciel-carte-des-vins-avignon", "logiciel-carte-des-vins-chambery"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-saint-etienne',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Saint-Étienne | Winerim',
  'Optimisez votre cave stéphanoise. Loire, Côtes Rhône et vins régionaux pour restaurants de Saint-Étienne.',
  'Saint-Étienne, France',
  'Logiciel de carte des vins pour Saint-Étienne',
  'Maîtrisez Loire, Rhône et terroirs régionaux',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Saint-Étienne, cité stéphanoise, impose expertise en vins Loire, Côtes Rhône et terroirs régionaux. Nos clients stéphanois gèrent 85 références avec ticket moyen de 33€, spécialisés blancs secs et rouges légers.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+15%"}, {"label": "Amélioration du ticket moyen", "value": "+18%"}, {"label": "Réduction stock dormant", "value": "-24%"}], "country": "France", "features": [{"title": "Loire et Rhône", "desc": "Cataloguez vins régionaux avec notes profil"}, {"title": "Accords Gastronomie Stéphanoise", "desc": "Recommandations pour cuisine régionale"}, {"title": "Vins Légers Régionaux", "desc": "Gestion spécialisée blancs et rouges légers"}, {"title": "Connectivité Producteurs", "desc": "Réseautez avec vignerons Loire-Rhône"}], "problems": ["Connaissance insuffisante Loire-Rhône", "Accords complexes gastronomie", "Stock dormant petites AOC", "Manque visibilité producteurs", "Marges insuffisantes régionaux"], "city_name": "Saint-Étienne", "ticket_medio": "23€-62€"}'::jsonb,
  '[{"q": "Comment valoriser Loire et Rhône ?", "a": "Notre système recommande meilleurs crus régionaux."}, {"q": "Avez-vous accords pour cuisine stéphanoise ?", "a": "Oui, proposons recommandations pour gastronomie régionale."}, {"q": "Comment connecter avec vignerons ?", "a": "Notre plateforme facilite relations producteurs Loire-Rhône."}]'::jsonb,
  '["logiciel-carte-des-vins-lyon", "logiciel-carte-des-vins-grenoble", "logiciel-carte-des-vins-chambery"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-annecy',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Annecy | Winerim',
  'Gérez votre cave annecienne. Savoie, Rhône et vins alpins pour restaurants d''Annecy et Haute-Savoie.',
  'Annecy, France',
  'Logiciel de carte des vins pour Annecy et Savoie',
  'Optimisez votre sélection Savoie et vins alpins',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Annecy, cité savoyarde, impose expertise en vins Savoie, Mondeuse et cépages alpins. Nos clients anneciens gèrent 95 références avec ticket moyen de 36€, spécialisés Jacquère et vins de montagne.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+16%"}, {"label": "Amélioration du ticket moyen", "value": "+19%"}, {"label": "Réduction stock dormant", "value": "-25%"}], "country": "France", "features": [{"title": "Expertise Savoie", "desc": "Cataloguez cépages alpins avec notes montagne"}, {"title": "Accords Fondue et Raclette", "desc": "Recommandations pour gastronomie savoyarde"}, {"title": "Jacquère et Mondeuse", "desc": "Gestion spécialisée blancs et rouges savoyards"}, {"title": "Connectivité Vignerons Savoie", "desc": "Réseautez avec producteurs alpins"}], "problems": ["Connaissance insuffisante cépages alpins", "Accords complexes fondue et raclette", "Stock dormant petites AOC", "Manque visibilité producteurs", "Marges insuffisantes régionaux"], "city_name": "Annecy", "ticket_medio": "25€-68€"}'::jsonb,
  '[{"q": "Comment valoriser Savoie ?", "a": "Notre système recommande meilleurs crus savoyards alpins."}, {"q": "Avez-vous accords pour fondue et raclette ?", "a": "Oui, proposons pairings optimisés gastronomie savoyarde."}, {"q": "Comment connecter avec vignerons ?", "a": "Notre plateforme facilite relations producteurs alpins."}]'::jsonb,
  '["logiciel-carte-des-vins-chambery", "logiciel-carte-des-vins-grenoble", "logiciel-carte-des-vins-lyon"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-chambery',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Chambéry | Winerim',
  'Optimisez votre cave chambérienne. Savoie, Rhône et vins alpins pour restaurants de Chambéry.',
  'Chambéry, France',
  'Logiciel de carte des vins pour Chambéry',
  'Maîtrisez Savoie, Rhône et terroirs montagnards',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Chambéry, capitale savoyarde, impose expertise en vins Savoie, Rhône et cépages alpins. Nos clients chambériens gèrent 100 références avec ticket moyen de 38€, spécialisés Jacquère, Mondeuse et vins montagnards.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+17%"}, {"label": "Amélioration du ticket moyen", "value": "+20%"}, {"label": "Réduction stock dormant", "value": "-26%"}], "country": "France", "features": [{"title": "Savoie Expertise Complète", "desc": "Cataloguez cépages alpins avec notes terroir"}, {"title": "Accords Gastronomie Alpine", "desc": "Recommandations pour raclette et fondue savoyarde"}, {"title": "Vins Montagnards Régionaux", "desc": "Gestion spécialisée blancs et rouges alpins"}, {"title": "Connectivité Producteurs Savoie", "desc": "Réseautez avec vignerons montagnards"}], "problems": ["Connaissance insuffisante cépages alpins", "Accords complexes gastronomie savoyarde", "Stock dormant petites AOC", "Manque visibilité producteurs", "Marges insuffisantes régionaux"], "city_name": "Chambéry", "ticket_medio": "27€-75€"}'::jsonb,
  '[{"q": "Comment valoriser Savoie complètement ?", "a": "Notre système recommande meilleurs crus savoyards alpins."}, {"q": "Avez-vous accords pour raclette savoyarde ?", "a": "Oui, proposons pairings optimisés gastronomie alpine."}, {"q": "Comment connecter avec vignerons ?", "a": "Notre plateforme facilite relations producteurs savoyards."}]'::jsonb,
  '["logiciel-carte-des-vins-annecy", "logiciel-carte-des-vins-grenoble", "logiciel-carte-des-vins-lyon"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-ajaccio',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Ajaccio | Winerim',
  'Gérez votre cave ajaccienne. Vins corses, Patrimonio et Sciaccarello pour restaurants d''Ajaccio.',
  'Ajaccio, France',
  'Logiciel de carte des vins pour Ajaccio et Corse',
  'Optimisez votre sélection vins corses Patrimonio',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Ajaccio, capitale corse, impose expertise en vins Patrimonio, Sciaccarello et terroirs corses unique. Nos clients ajacciens gèrent 75 références avec ticket moyen de 39€, spécialisés rouges corses puissants et Niellucciu.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+18%"}, {"label": "Amélioration du ticket moyen", "value": "+21%"}, {"label": "Réduction stock dormant", "value": "-27%"}], "country": "France", "features": [{"title": "Patrimonio et Vins Corses", "desc": "Cataloguez terroirs corses uniques avec notes"}, {"title": "Accords Gastronomie Corse", "desc": "Recommandations pour charcuterie et cuisine régionale"}, {"title": "Sciaccarello et Niellucciu", "desc": "Gestion spécialisée cépages corses prestigieux"}, {"title": "Connectivité Producteurs Corse", "desc": "Réseautez avec vignerons corses locaux"}], "problems": ["Connaissance insuffisante terroirs corses", "Accords complexes gastronomie corse", "Stock dormant de petites AOC", "Manque visibilité producteurs", "Marges insuffisantes sur régionaux"], "city_name": "Ajaccio", "ticket_medio": "28€-80€"}'::jsonb,
  '[{"q": "Comment valoriser vins corses ?", "a": "Notre système recommande meilleurs crus Patrimonio corses."}, {"q": "Avez-vous accords pour charcuterie corse ?", "a": "Oui, proposons pairings optimisés gastronomie corse."}, {"q": "Comment connecter avec vignerons ?", "a": "Notre plateforme facilite relations producteurs corses."}]'::jsonb,
  '["logiciel-carte-des-vins-bastia", "logiciel-carte-des-vins-nice", "logiciel-carte-des-vins-marseille"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-bastia',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Bastia | Winerim',
  'Optimisez votre cave bastiaise. Vins corses Patrimonio et terroirs pour restaurants de Bastia.',
  'Bastia, France',
  'Logiciel de carte des vins pour Bastia et Haute-Corse',
  'Maîtrisez terroirs corses Patrimonio et régionaux',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Bastia, port corse, impose expertise en Patrimonio, Sciaccarello et terroirs corses uniques. Nos clients bastiaises gèrent 70 références avec ticket moyen de 37€, spécialisés rouges corses corsés et cépages méditerranéens.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+17%"}, {"label": "Amélioration du ticket moyen", "value": "+20%"}, {"label": "Réduction stock dormant", "value": "-26%"}], "country": "France", "features": [{"title": "Patrimonio Expertise", "desc": "Cataloguez Patrimonio avec notes minéralité"}, {"title": "Accords Charcuterie Corse", "desc": "Recommandations pour spécialités régionales"}, {"title": "Sciaccarello Corsé", "desc": "Gestion spécialisée rouges corsés puissants"}, {"title": "Connectivité Vignerons Corse", "desc": "Réseautez avec producteurs locaux corses"}], "problems": ["Connaissance insuffisante terroirs corses", "Accords complexes gastronomie régionale", "Stock dormant petites AOC", "Manque visibilité producteurs", "Marges insuffisantes régionaux"], "city_name": "Bastia", "ticket_medio": "26€-75€"}'::jsonb,
  '[{"q": "Comment valoriser Patrimonio ?", "a": "Notre système recommande meilleurs crus Patrimonio corses."}, {"q": "Avez-vous accords pour charcuterie corse ?", "a": "Oui, proposons pairings optimisés pour spécialités corses."}, {"q": "Comment connecter avec vignerons ?", "a": "Notre plateforme facilite relations producteurs corses."}]'::jsonb,
  '["logiciel-carte-des-vins-ajaccio", "logiciel-carte-des-vins-nice", "logiciel-carte-des-vins-marseille"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-la-rochelle',
  'city',
  'fr',
  'Logiciel de Carte des Vins à La Rochelle | Winerim',
  'Gérez votre cave rochelaise. Loire, vins côtiers et fruits de mer pour restaurants de La Rochelle.',
  'La Rochelle, France',
  'Logiciel de carte des vins pour La Rochelle',
  'Optimisez votre sélection Loire et vins côtiers',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "La Rochelle, port atlantique, impose expertise en vins Loire, Muscadet et sélections côtières pour huîtres. Nos clients rochelais gèrent 90 références avec ticket moyen de 35€, spécialisés blancs secs minéraux.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+16%"}, {"label": "Amélioration du ticket moyen", "value": "+19%"}, {"label": "Réduction stock dormant", "value": "-25%"}], "country": "France", "features": [{"title": "Loire et Muscadet", "desc": "Cataloguez blancs secs Loire atlantiques"}, {"title": "Accords Huîtres et Fruits Mer", "desc": "Recommandations pour huîtres de Marennes"}, {"title": "Vins Côtiers Légers", "desc": "Gestion spécialisée blancs secs minéraux"}, {"title": "Connectivité Producteurs Loire", "desc": "Réseautez avec vignerons Loire atlantique"}], "problems": ["Connaissance insuffisante Loire", "Accords complexes fruits de mer", "Stock dormant petites AOC", "Manque visibilité producteurs", "Marges insuffisantes régionaux"], "city_name": "La Rochelle", "ticket_medio": "24€-62€"}'::jsonb,
  '[{"q": "Comment valoriser Loire blanc ?", "a": "Notre système recommande meilleurs blancs secs Loire."}, {"q": "Avez-vous accords pour huîtres Marennes ?", "a": "Oui, proposons pairings optimisés pour huîtres."}, {"q": "Comment connecter avec vignerons ?", "a": "Notre plateforme facilite relations producteurs Loire."}]'::jsonb,
  '["logiciel-carte-des-vins-nantes", "logiciel-carte-des-vins-rennes", "logiciel-carte-des-vins-tours"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-brest',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Brest | Winerim',
  'Optimisez votre cave brestoise. Loire, cidre Bretagne et fruits de mer pour restaurants de Brest.',
  'Brest, France',
  'Logiciel de carte des vins pour Brest et Bretagne',
  'Maîtrisez Loire blanc et cidre breton',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Brest, port breton, impose expertise en vins Loire, cidre Bretagne et sélections côtières pour fruits de mer. Nos clients brestois gèrent 85 références avec ticket moyen de 34€, spécialisés blancs secs et cidres régionaux.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+15%"}, {"label": "Amélioration du ticket moyen", "value": "+18%"}, {"label": "Réduction stock dormant", "value": "-24%"}], "country": "France", "features": [{"title": "Loire Blanc Expertise", "desc": "Cataloguez vins secs Loire minéraux"}, {"title": "Accords Fruits Mer Bretons", "desc": "Recommandations pour homard et poissons"}, {"title": "Cidre Pommeau Bretagne", "desc": "Gestion spécialisée cidres et poirés bretons"}, {"title": "Connectivité Producteurs Loire", "desc": "Réseautez avec vignerons Loire atlantique"}], "problems": ["Connaissance insuffisante Loire", "Accords complexes fruits de mer", "Stock dormant petites AOC", "Manque visibilité producteurs", "Marges insuffisantes régionaux"], "city_name": "Brest", "ticket_medio": "23€-60€"}'::jsonb,
  '[{"q": "Comment valoriser blancs Loire ?", "a": "Notre système recommande meilleurs blancs secs minéraux."}, {"q": "Avez-vous accords pour homard ?", "a": "Oui, proposons pairings optimisés fruits de mer bretons."}, {"q": "Comment intégrer cidres bretons ?", "a": "Notre plateforme gère cidres et pommeau bretons."}]'::jsonb,
  '["logiciel-carte-des-vins-rennes", "logiciel-carte-des-vins-la-rochelle", "logiciel-carte-des-vins-rouen"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-pau',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Pau | Winerim',
  'Gérez votre cave paloise. Madiran, Jurançon et vins du Béarn pour restaurants de Pau.',
  'Pau, France',
  'Logiciel de carte des vins pour Pau et Béarn',
  'Optimisez votre sélection Madiran et Jurançon',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Pau, capitale béarnaise, impose expertise en Madiran, Jurançon et terroirs Béarn. Nos clients palois gèrent 85 références avec ticket moyen de 36€, spécialisés rouges tanniques Madiran et blancs doux Jurançon.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+16%"}, {"label": "Amélioration du ticket moyen", "value": "+19%"}, {"label": "Réduction stock dormant", "value": "-25%"}], "country": "France", "features": [{"title": "Madiran Expertise", "desc": "Cataloguez rouges tanniques Béarn"}, {"title": "Accords Garbure et Viande", "desc": "Recommandations pour cuisine béarnaise"}, {"title": "Jurançon Doux", "desc": "Gestion spécialisée blancs doux Jurançon"}, {"title": "Connectivité Vignerons Béarn", "desc": "Réseautez avec producteurs béarnais"}], "problems": ["Connaissance insuffisante Madiran-Jurançon", "Accords complexes gastronomie béarnaise", "Stock dormant petites AOC", "Manque visibilité producteurs", "Marges insuffisantes régionaux"], "city_name": "Pau", "ticket_medio": "25€-70€"}'::jsonb,
  '[{"q": "Comment valoriser Madiran et Jurançon ?", "a": "Notre système recommande meilleurs crus béarnais."}, {"q": "Avez-vous accords pour garbure ?", "a": "Oui, proposons recommandations pour gastronomie béarnaise."}, {"q": "Comment connecter avec vignerons ?", "a": "Notre plateforme facilite relations producteurs béarnais."}]'::jsonb,
  '["logiciel-carte-des-vins-bayonne", "logiciel-carte-des-vins-toulouse", "logiciel-carte-des-vins-bordeaux"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-nimes',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Nîmes | Winerim',
  'Optimisez votre cave nîmoise. Costières Nîmes, Rhône et vins méditerranéens pour restaurants de Nîmes.',
  'Nîmes, France',
  'Logiciel de carte des vins pour Nîmes',
  'Maîtrisez Costières Nîmes et vins Rhône',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Nîmes, cité romaine, impose expertise en Costières de Nîmes, Rhône et vins méditerranéens. Nos clients nîmois gèrent 110 références avec ticket moyen de 41€, spécialisés vins Costières prestige et cépages méridionaux.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+18%"}, {"label": "Amélioration du ticket moyen", "value": "+21%"}, {"label": "Réduction stock dormant", "value": "-27%"}], "country": "France", "features": [{"title": "Costières Expertise", "desc": "Cataloguez terroir Costières Nîmes prestige"}, {"title": "Accords Gastronomie Nîmoise", "desc": "Recommandations pour cuisine méditerranéenne"}, {"title": "Vins Rhône Côtiers", "desc": "Gestion spécialisée vins méditerranéens"}, {"title": "Connectivité Producteurs", "desc": "Réseautez avec vignerons Costières"}], "problems": ["Connaissance insuffisante Costières Nîmes", "Accords complexes gastronomie méditerranéenne", "Stock dormant petites AOC", "Manque visibilité producteurs", "Marges insuffisantes régionaux"], "city_name": "Nîmes", "ticket_medio": "30€-80€"}'::jsonb,
  '[{"q": "Comment valoriser Costières Nîmes ?", "a": "Notre système recommande meilleurs crus Costières prestige."}, {"q": "Avez-vous accords pour gastronomie nîmoise ?", "a": "Oui, proposons pairings optimisés méditerranéens."}, {"q": "Comment connecter avec vignerons ?", "a": "Notre plateforme facilite relations producteurs Costières."}]'::jsonb,
  '["logiciel-carte-des-vins-arles", "logiciel-carte-des-vins-avignon", "logiciel-carte-des-vins-montpellier"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-arles',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Arles | Winerim',
  'Gérez votre cave arlésienne. Rhône, Provence et terroirs méditerranéens pour restaurants d''Arles.',
  'Arles, France',
  'Logiciel de carte des vins pour Arles',
  'Optimisez votre sélection Rhône et Provence',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Arles, cité provençale, impose expertise en vins Rhône, Provence et terroirs méditerranéens. Nos clients arlésiens gèrent 105 références avec ticket moyen de 40€, spécialisés rouges Grenache et rosés Provence.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+17%"}, {"label": "Amélioration du ticket moyen", "value": "+20%"}, {"label": "Réduction stock dormant", "value": "-26%"}], "country": "France", "features": [{"title": "Rhône Provence", "desc": "Cataloguez terroirs méditerranéens avec notes"}, {"title": "Accords Gastronomie Provençale", "desc": "Recommandations pour ratatouille et bouillabaisse"}, {"title": "Grenache Rosés Prestige", "desc": "Gestion spécialisée rouges grenache prestige"}, {"title": "Connectivité Producteurs Provence", "desc": "Réseautez avec vignerons provençaux"}], "problems": ["Connaissance insuffisante terroirs provençaux", "Accords complexes gastronomie régionale", "Stock dormant petites AOC", "Manque visibilité producteurs", "Marges insuffisantes régionaux"], "city_name": "Arles", "ticket_medio": "28€-75€"}'::jsonb,
  '[{"q": "Comment valoriser terroirs provençaux ?", "a": "Notre système recommande meilleurs crus Rhône-Provence."}, {"q": "Avez-vous accords pour bouillabaisse ?", "a": "Oui, proposons pairings optimisés gastronomie provençale."}, {"q": "Comment connecter avec vignerons ?", "a": "Notre plateforme facilite relations producteurs provençaux."}]'::jsonb,
  '["logiciel-carte-des-vins-avignon", "logiciel-carte-des-vins-nimes", "logiciel-carte-des-vins-marseille"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-auxerre',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Auxerre | Winerim',
  'Optimisez votre cave auxerroise. Chablis, Bourgogne et terroirs bourguignons pour restaurants d''Auxerre.',
  'Auxerre, France',
  'Logiciel de carte des vins pour Auxerre',
  'Maîtrisez Chablis et terroirs bourguignons',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Auxerre, cité bourguignonne, impose expertise en Chablis, Bourgogne et terroirs blancs. Nos clients auxerrois gèrent 95 références avec ticket moyen de 37€, spécialisés Chablis Grand Cru et blancs prestige.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+16%"}, {"label": "Amélioration du ticket moyen", "value": "+19%"}, {"label": "Réduction stock dormant", "value": "-25%"}], "country": "France", "features": [{"title": "Chablis Grand Cru", "desc": "Cataloguez Chablis avec notes minéralité"}, {"title": "Accords Gastronomie Bourguignonne", "desc": "Recommandations pour cuisine régionale"}, {"title": "Blancs Bourgogne Prestige", "desc": "Gestion spécialisée Chardonnay bourguignons"}, {"title": "Connectivité Vignerons Chablis", "desc": "Réseautez avec producteurs Chablis"}], "problems": ["Connaissance insuffisante Chablis Grand Cru", "Accords complexes gastronomie bourguignonne", "Stock dormant petites AOC", "Manque visibilité producteurs", "Marges insuffisantes régionaux"], "city_name": "Auxerre", "ticket_medio": "26€-72€"}'::jsonb,
  '[{"q": "Comment valoriser Chablis Grand Cru ?", "a": "Notre système recommande meilleurs Chablis prestige."}, {"q": "Avez-vous accords pour cuisine bourguignonne ?", "a": "Oui, proposons recommandations pour gastronomie régionale."}, {"q": "Comment connecter avec vignerons ?", "a": "Notre plateforme facilite relations producteurs Chablis."}]'::jsonb,
  '["logiciel-carte-des-vins-dijon", "logiciel-carte-des-vins-beaune", "logiciel-carte-des-vins-paris"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-epernay',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Épernay | Winerim',
  'Gérez votre cave épernaysienne. Champagne prestige et cuvées de prestige pour restaurants d''Épernay.',
  'Épernay, France',
  'Logiciel de carte des vins pour Épernay',
  'Optimisez votre sélection champagne de prestige',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Épernay, cité champagne, impose expertise complète en champagne prestige, cuvées de prestige et vins rares. Nos clients épernaysiens gèrent 180+ références avec ticket moyen de 68€, spécialisés Dom Pérignon, Veuve Clicquot et grands crus.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+24%"}, {"label": "Amélioration du ticket moyen", "value": "+28%"}, {"label": "Optimisation cave", "value": "-34%"}], "country": "France", "features": [{"title": "Champagne Prestige Expertise", "desc": "Cataloguez Dom Pérignon, Veuve Clicquot avec traçabilité"}, {"title": "Accords Gastronomie Champenoise", "desc": "Recommandations pour cuisine de prestige"}, {"title": "Cuvées de Prestige Rares", "desc": "Gestion spécialisée champagnes d''investissement"}, {"title": "Connectivité Maisons Champagne", "desc": "Réseautez avec grandes champagneries Épernay"}], "problems": ["Gestion centaines références champagne", "Authentification cuvées prestigieuses", "Accords avec gastronomie raffinée", "Marges très élevées à optimiser", "Formation personnel à luxe vinicole"], "city_name": "Épernay", "ticket_medio": "48€-200€"}'::jsonb,
  '[{"q": "Comment gérer Dom Pérignon et cuvées prestige ?", "a": "Notre système trace chaque cuvée rare avec authentification."}, {"q": "Avez-vous accords pour cuisine champenoise ?", "a": "Oui, proposons pairings pour gastronomie de prestige."}, {"q": "Comment connecter avec maisons champagne ?", "a": "Notre plateforme facilite relations grandes champagneries."}]'::jsonb,
  '["logiciel-carte-des-vins-reims", "logiciel-carte-des-vins-paris", "logiciel-carte-des-vins-lille"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-sancerre',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Sancerre | Winerim',
  'Optimisez votre cave sancerroise. Sancerre blanc, Loire et terroirs pour restaurants de Sancerre.',
  'Sancerre, France',
  'Logiciel de carte des vins pour Sancerre et Loire',
  'Maîtrisez Sancerre blanc et terroirs Loire',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Sancerre, terroir prestigieux, impose expertise complète en Sancerre blanc, Pouilly-Fumé et terroirs Loire. Nos clients sancerrois gèrent 80 références avec ticket moyen de 42€, spécialisés Sancerre blanc minéral de prestige.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+18%"}, {"label": "Amélioration du ticket moyen", "value": "+21%"}, {"label": "Réduction stock dormant", "value": "-27%"}], "country": "France", "features": [{"title": "Sancerre Blanc Prestige", "desc": "Cataloguez Sancerre blanc minéral prestige"}, {"title": "Accords Gastronomie Loire", "desc": "Recommandations pour cuisine loirienne raffinée"}, {"title": "Pouilly-Fumé Loire", "desc": "Gestion spécialisée blancs prestige Loire"}, {"title": "Connectivité Producteurs Sancerre", "desc": "Réseautez avec vignerons sancerrois"}], "problems": ["Connaissance insuffisante terroirs Sancerre", "Accords complexes gastronomie loirienne", "Stock dormant petites AOC", "Manque visibilité producteurs", "Marges insuffisantes régionaux"], "city_name": "Sancerre", "ticket_medio": "30€-85€"}'::jsonb,
  '[{"q": "Comment valoriser Sancerre blanc prestige ?", "a": "Notre système recommande meilleurs Sancerre minéraux."}, {"q": "Avez-vous accords pour cuisine loirienne ?", "a": "Oui, proposons pairings pour gastronomie loirienne."}, {"q": "Comment connecter avec vignerons ?", "a": "Notre plateforme facilite relations producteurs sancerrois."}]'::jsonb,
  '["logiciel-carte-des-vins-tours", "logiciel-carte-des-vins-angers", "logiciel-carte-des-vins-chablis"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-chablis',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Chablis | Winerim',
  'Gérez votre cave chablis ienne. Chablis blanc prestige et terroirs pour restaurants de Chablis.',
  'Chablis, France',
  'Logiciel de carte des vins pour Chablis',
  'Optimisez votre sélection Chablis prestige',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Chablis, terroir blanc prestigieux, impose expertise complète en Chablis Grand Cru, Premier Cru et terroirs minéraux. Nos clients chabliennes gèrent 75 références avec ticket moyen de 45€, spécialisés Chablis minéral de prestige.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+17%"}, {"label": "Amélioration du ticket moyen", "value": "+20%"}, {"label": "Réduction stock dormant", "value": "-26%"}], "country": "France", "features": [{"title": "Chablis Grand Cru Prestige", "desc": "Cataloguez Chablis Grand Cru minéral prestige"}, {"title": "Accords Fruits Mer Loire", "desc": "Recommandations pour fruits de mer loiriens"}, {"title": "Premier Cru Chablis", "desc": "Gestion spécialisée Chablis Premier Cru"}, {"title": "Connectivité Producteurs Chablis", "desc": "Réseautez avec producteurs chablis locaux"}], "problems": ["Connaissance insuffisante Chablis Grand Cru", "Accords complexes gastronomie régionale", "Stock dormant petites AOC", "Manque visibilité producteurs", "Marges insuffisantes régionaux"], "city_name": "Chablis", "ticket_medio": "32€-90€"}'::jsonb,
  '[{"q": "Comment valoriser Chablis Grand Cru ?", "a": "Notre système recommande meilleurs Chablis minéraux prestige."}, {"q": "Avez-vous accords pour fruits de mer ?", "a": "Oui, proposons pairings optimisés pour crustacés."}, {"q": "Comment connecter avec vignerons ?", "a": "Notre plateforme facilite relations producteurs chablis."}]'::jsonb,
  '["logiciel-carte-des-vins-auxerre", "logiciel-carte-des-vins-dijon", "logiciel-carte-des-vins-beaune"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-chateauneuf-du-pape',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Châteauneuf-du-Pape | Winerim',
  'Optimisez votre cave châteauneuvoise. Châteauneuf-du-Pape prestige et terroirs Rhône.',
  'Châteauneuf-du-Pape, France',
  'Logiciel de carte des vins pour Châteauneuf-du-Pape',
  'Maîtrisez Châteauneuf prestige et grands crus',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Châteauneuf-du-Pape, terroir papal prestigieux, impose expertise en Châteauneuf-du-Pape Grand Cru et vins de légende. Nos clients châteauneuvois gèrent 120 références avec ticket moyen de 55€, spécialisés Grenache Mourvèdre prestige.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+20%"}, {"label": "Amélioration du ticket moyen", "value": "+23%"}, {"label": "Réduction stock dormant", "value": "-29%"}], "country": "France", "features": [{"title": "Châteauneuf Grand Cru Prestige", "desc": "Cataloguez grands crus papal avec traçabilité"}, {"title": "Accords Gastronomie Provençale", "desc": "Recommandations pour gastronomie raffinée papale"}, {"title": "Grenache Mourvèdre Prestige", "desc": "Gestion spécialisée cépages grands crus"}, {"title": "Connectivité Producteurs Papaux", "desc": "Réseautez avec vignerons châteauneuvois"}], "problems": ["Gestion centaines références prestige", "Authentification grands crus papal", "Accords gastronomie raffinée", "Marges très élevées optimiser", "Formation personnel oenologie papale"], "city_name": "Châteauneuf-du-Pape", "ticket_medio": "38€-120€"}'::jsonb,
  '[{"q": "Comment gérer Châteauneuf grands crus ?", "a": "Notre système classe grands crus papal avec notes apogée."}, {"q": "Avez-vous accords pour gastronomie papale ?", "a": "Oui, proposons pairings pour cuisine raffinée provençale."}, {"q": "Comment connecter avec vignerons ?", "a": "Notre plateforme facilite relations producteurs papaux."}]'::jsonb,
  '["logiciel-carte-des-vins-avignon", "logiciel-carte-des-vins-arles", "logiciel-carte-des-vins-nimes"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'logiciel-carte-des-vins-chinon',
  'city',
  'fr',
  'Logiciel de Carte des Vins à Chinon | Winerim',
  'Gérez votre cave chinonaise. Chinon rouge prestige et vins Loire pour restaurants de Chinon.',
  'Chinon, France',
  'Logiciel de carte des vins pour Chinon et Loire',
  'Optimisez votre sélection Chinon prestige',
  'Demander une démo',
  '/demo',
  'Analyser ma carte',
  '/analisis-carta',
  '{"intro": "Chinon, terroir rouge prestigieux, impose expertise en Chinon prestige, Cabernet Franc et terroirs de Loire. Nos clients chinonais gèrent 75 références avec ticket moyen de 40€, spécialisés Chinon rouge prestige de terroir.", "stats": [{"label": "Augmentation des ventes de vin", "value": "+16%"}, {"label": "Amélioration du ticket moyen", "value": "+19%"}, {"label": "Réduction stock dormant", "value": "-25%"}], "country": "France", "features": [{"title": "Chinon Rouge Prestige", "desc": "Cataloguez Chinon rouge terroir prestige"}, {"title": "Accords Gastronomie Loire", "desc": "Recommandations pour cuisine loirienne raffinée"}, {"title": "Cabernet Franc Prestige", "desc": "Gestion spécialisée Cabernet Franc terroirés"}, {"title": "Connectivité Producteurs Chinon", "desc": "Réseautez avec vignerons chinonais"}], "problems": ["Connaissance insuffisante Chinon prestige", "Accords complexes gastronomie loirienne", "Stock dormant petites AOC", "Manque visibilité producteurs", "Marges insuffisantes régionaux"], "city_name": "Chinon", "ticket_medio": "28€-78€"}'::jsonb,
  '[{"q": "Comment valoriser Chinon prestige ?", "a": "Notre système recommande meilleurs Chinon rouges terroir."}, {"q": "Avez-vous accords pour cuisine loirienne ?", "a": "Oui, proposons pairings pour gastronomie loirienne."}, {"q": "Comment connecter avec vignerons ?", "a": "Notre plateforme facilite relations producteurs chinonais."}]'::jsonb,
  '["logiciel-carte-des-vins-tours", "logiciel-carte-des-vins-angers", "logiciel-carte-des-vins-sancerre"]'::jsonb,
  'Article',
  true
);

COMMIT;

-- ============ PORTUGAL (20 cities) ============
BEGIN;

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinhos-lisboa',
  'city',
  'pt',
  'Software de Carta de Vinhos em Lisboa | Winerim',
  'Gerencie sua carta de vinhos em Lisboa com tecnologia avançada. Software especializado para restaurantes com integração de DOCs do Douro e Alentejo.',
  'Lisboa, Portugal',
  'Software de carta de vinhos para restaurantes em Lisboa',
  'Revolucione a experiência dos seus clientes com seleções de vinho personalizadas',
  'Solicitar demo',
  '/demo',
  'Analisar a minha carta',
  '/analisis-carta',
  '{"intro": "Em Lisboa, a cultura do vinho é parte essencial da gastronomia contemporânea. Os restaurantes da capital enfrentam desafios únicos ao gerenciar cartas com vinhos do Douro, Alentejo e Dão. Nossa plataforma oferece soluções inteligentes para otimizar suas vendas de vinho e experiência do cliente.", "stats": [{"label": "Aumento de vendas", "value": "+28%"}, {"label": "Restaurantes ativos", "value": "450+"}, {"label": "Redução de tempo", "value": "67%"}], "country": "Portugal", "features": [{"title": "Gestão automática de inventário", "description": "Controle em tempo real de seus vinhos com alertas de reposição"}, {"title": "Recomendações de pairing", "description": "Sugestões inteligentes baseadas em IA para harmonizar pratos"}, {"title": "Analytics de vendas", "description": "Relatórios detalhados de performance de sua carta"}, {"title": "Integração com PDV", "description": "Sincronização automática com sistemas de ponto de venda"}], "problems": [{"title": "Dificuldade em gerenciar múltiplas procedências", "description": "Vinhos do Douro, Alentejo, Dão e Bairrada exigem conhecimento específico"}, {"title": "Falta de pairing adequado", "description": "Clientes perdem oportunidades de descobrir harmonizações perfeitas"}, {"title": "Desperdício e obsolescência", "description": "Garrafas vencidas e gestão ineficiente de inventário"}, {"title": "Tempo excessivo em treinamento", "description": "Equipe sem conhecimento adequado sobre a oferta de vinhos"}, {"title": "Perda de vendas por desorganização", "description": "Falta de sistematização afeta o faturamento mensal"}], "city_name": "Lisboa", "ticket_medio": "45-85€"}'::jsonb,
  '[{"q": "Como o software ajuda com vinhos do Douro?", "a": "Oferecemos catalogação automática com classificações DOC, preços de mercado e históricos de vendas para toda a região do Douro"}, {"q": "É possível integrar com meu PDV atual?", "a": "Sim, nossa plataforma integra com os principais sistemas de PDV do mercado português"}, {"q": "Quanto tempo leva para configurar?", "a": "A implementação completa leva em média 48 horas, com suporte dedicado da nossa equipe"}]'::jsonb,
  '["software-carta-de-vinhos-porto", "software-carta-de-vinhos-cascais", "software-carta-de-vinhos-sintra"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinhos-porto',
  'city',
  'pt',
  'Software de Carta de Vinhos no Porto | Winerim',
  'Plataforma especializada para restaurantes no Porto. Gerencie cartas de vinho do Douro e Vinho Verde com tecnologia de ponta.',
  'Porto, Portugal',
  'Software de carta de vinhos para restaurantes no Porto',
  'Domine a região vitivinícola mais prestigiosa de Portugal',
  'Solicitar demo',
  '/demo',
  'Analisar a minha carta',
  '/analisis-carta',
  '{"intro": "O Porto é o coração da vitivinicultura portuguesa, berço do icônico Vinho do Porto e porta de entrada para os vinhos do Douro. Os restaurantes portuenses precisam de ferramentas sofisticadas para gerenciar cartas complexas. Winerim oferece precisamente isso com tecnologia adaptada ao mercado regional.", "stats": [{"label": "Aumento de conversão", "value": "+32%"}, {"label": "Clientes portuenses", "value": "380+"}, {"label": "Eficiência operacional", "value": "+71%"}], "country": "Portugal", "features": [{"title": "Catalogação de Vinho do Porto", "description": "Sistema especializado com vintage, tipo e qualidade autêntica"}, {"title": "Análise de margens", "description": "Maximize rentabilidade com cálculos automáticos de markup"}, {"title": "Sugestões por experiência", "description": "Ofertas personalizadas baseadas no perfil do cliente"}, {"title": "Relatórios por período", "description": "Acompanhamento mensal e sazonal das preferências"}], "problems": [{"title": "Complexidade dos vinhos do Douro", "description": "Centenas de produtores e classificações exigem organização rigorosa"}, {"title": "Equipe sem especialização", "description": "Falta de treinamento adequado sobre regionais e denominações"}, {"title": "Gestão manual consome tempo", "description": "Planilhas Excel não acompanham a dinâmica de vendas"}, {"title": "Oportunidade de cross-selling perdida", "description": "Clientes não são informados sobre vinhos alternativos"}, {"title": "Desconexão com fornecedores", "description": "Dificuldade em coordenar reposição com distribuidoras"}], "city_name": "Porto", "ticket_medio": "50-90€"}'::jsonb,
  '[{"q": "Como diferencial para Vinho do Porto autêntico?", "a": "Nosso banco de dados inclui identificação de vintage, tipo (Tawny, Ruby, LBV), produtor e certificações DOC"}, {"q": "Vocês oferecem suporte em português?", "a": "Sim, equipe 100% em português com suporte de segunda a sexta, 9h às 18h"}, {"q": "Qual é o custo de implementação?", "a": "Consultoria inicial gratuita seguida de plano customizado conforme número de garrafas"}]'::jsonb,
  '["software-carta-de-vinhos-lisboa", "software-carta-de-vinhos-braga", "software-carta-de-vinhos-aveiro"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinhos-braga',
  'city',
  'pt',
  'Software de Carta de Vinhos em Braga | Winerim',
  'Solução completa para gestão de cartas de vinho em Braga. Integre vinhos de Vinho Verde e Douro em um único sistema inteligente.',
  'Braga, Portugal',
  'Software de carta de vinhos para restaurantes em Braga',
  'Potencialize vendas com tecnologia adaptada ao Minho',
  'Solicitar demo',
  '/demo',
  'Analisar a minha carta',
  '/analisis-carta',
  '{"intro": "Braga, localizada no coração do Minho, tem acesso privilegiado aos melhores Vinhos Verdes e aos vinhos estruturados do Douro. A gestão adequada dessa diversidade é essencial para restaurantes que buscam se diferenciar. Winerim permite otimizar essa oferta com inteligência artificial.", "stats": [{"label": "Crescimento em vendas", "value": "+26%"}, {"label": "Restaurantes parceiros", "value": "195+"}, {"label": "Tempo economizado", "value": "63%"}], "country": "Portugal", "features": [{"title": "Especialização em Vinho Verde", "description": "Catalogação de subregióes como Monção, Melgaço e Barcelos"}, {"title": "Gerenciamento de temperatura", "description": "Alertas automáticos para armazenamento adequado de brancos e espumantes"}, {"title": "Histórico de vendas", "description": "Análise temporal de preferências por estação"}, {"title": "Mobilidade para sommeliers", "description": "App mobile para recomendações em tempo real no atendimento"}], "problems": [{"title": "Confusão entre subregióes de Vinho Verde", "description": "Monção e Melgaço têm características distintas que confundem clientes"}, {"title": "Gestão de espumantes naturais", "description": "Dificuldade em categorizar e precificar vinhos naturais"}, {"title": "Sazonalidade extrema", "description": "Flutuações de vendas exigem previsão sofisticada"}, {"title": "Treinamento constante da equipe", "description": "Alta rotatividade em Braga requer onboarding contínuo"}, {"title": "Competição acirrada", "description": "Restaurantes próximos oferecem cartas semelhantes sem diferencial"}], "city_name": "Braga", "ticket_medio": "35-75€"}'::jsonb,
  '[{"q": "Qual diferencial para Vinho Verde?", "a": "Sistema que distingue as 9 subregióes de Vinho Verde com características de acidez, álcool e perfil aromático"}, {"q": "Como lidam com vinhos naturais?", "a": "Base de dados inclui vinhos naturais certificados com notas de degradação e tempo de guarda"}, {"q": "Posso exportar relatórios?", "a": "Sim, exportação em PDF, Excel e integração com Google Data Studio para análises customizadas"}]'::jsonb,
  '["software-carta-de-vinhos-porto", "software-carta-de-vinhos-guimaraes", "software-carta-de-vinhos-viana-do-castelo"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinhos-coimbra',
  'city',
  'pt',
  'Software de Carta de Vinhos em Coimbra | Winerim',
  'Gestão inteligente de cartas de vinho em Coimbra. Especialmente desenvolvido para vinhos da região de Dão e Bairrada.',
  'Coimbra, Portugal',
  'Software de carta de vinhos para restaurantes em Coimbra',
  'Explore o potencial dos vinhos de Dão e Bairrada',
  'Solicitar demo',
  '/demo',
  'Analisar a minha carta',
  '/analisis-carta',
  '{"intro": "Coimbra é porta de entrada para duas das regiões vitivinícolas mais prestigiosas de Portugal: Dão e Bairrada. Os restaurantes coimbricenses precisam de ferramentas que valorizem essa proximidade geográfica e qualitativa. Nossa plataforma oferece especialização nessas DOCs com analytics avançados.", "stats": [{"label": "Satisfação de clientes", "value": "+29%"}, {"label": "Estabelecimentos ativos", "value": "120+"}, {"label": "ROI em 6 meses", "value": "+58%"}], "country": "Portugal", "features": [{"title": "Especialização em Dão e Bairrada", "description": "Catalogação completa com sub-regiões e produtores locais"}, {"title": "Preços dinâmicos", "description": "Ajuste automático baseado em sazonalidade e vendas"}, {"title": "Recomendações por safra", "description": "Sistema que considera envelhecimento e picos de consumo"}, {"title": "Suporte a vinhos de pequenos produtores", "description": "Interface para adicionar vinhos artesanais não catalogados"}], "problems": [{"title": "Falta de conhecimento em Dão", "description": "Equipe desconhece nuances entre Dão Cima da Serra e Dão Sul"}, {"title": "Gestão de Bairrada ignorada", "description": "Região não recebe atenção proporcional à sua qualidade"}, {"title": "Comparação de preços manual", "description": "Sem ferramenta, impossível acompanhar mercado dinâmico"}, {"title": "Obsolescência de cartas impressas", "description": "Atualizações manuais perdem-se rapidamente"}, {"title": "Oportunidades de upsell não capturadas", "description": "Garçons vendem vinhos subótimos por falta de informação"}], "city_name": "Coimbra", "ticket_medio": "40-80€"}'::jsonb,
  '[{"q": "Vocês cobrem vinhos de pequenos produtores locais?", "a": "Sim, sistema permite adicionar produtores artesanais com informações customizadas e imagens"}, {"q": "Como funciona a integração com hotéis?", "a": "Plataforma suporta múltiplas propriedades com controle centralizado e desempenho individual"}, {"q": "Qual o tempo de treinamento para equipe?", "a": "2 sessões de 2 horas cada, com material de consulta rápida disponível no app"}]'::jsonb,
  '["software-carta-de-vinhos-aveiro", "software-carta-de-vinhos-viseu", "software-carta-de-vinhos-guarda"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinhos-funchal',
  'city',
  'pt',
  'Software de Carta de Vinhos em Funchal | Winerim',
  'Plataforma especializada em vinho da Madeira. Gerencie cartas com vinhos fortificados e naturais da região autônoma.',
  'Funchal, Portugal',
  'Software de carta de vinhos para restaurantes em Funchal',
  'Domine a especialidade madeirense com tecnologia avançada',
  'Solicitar demo',
  '/demo',
  'Analisar a minha carta',
  '/analisis-carta',
  '{"intro": "Funchal oferece uma posição única no mercado: acesso direto aos melhores Vinhos da Madeira do mundo. Os restaurantes funchalenses enfrentam desafios únicos na comercialização desses vinhos complexos e envelhecidos. Winerim oferece ferramentas específicas para maximizar valor e experiência.", "stats": [{"label": "Aumento em margens", "value": "+31%"}, {"label": "Turistas satisfeitos", "value": "650+"}, {"label": "Tempo de atendimento", "value": "-54%"}], "country": "Portugal", "features": [{"title": "Gestão de vinhos envelhecidos", "description": "Sistema que rastreia vintage, tipo (Sercial, Verdelho, Bual, Malvasia) e valor"}, {"title": "Explicações automáticas", "description": "Descrições em português e inglês para turistas internacionais"}, {"title": "Comparação de preços internacionais", "description": "Integração com mercados de Londres, Hong Kong e Nova Iorque"}, {"title": "Histórico de degustações", "description": "Registro de experiências para recomendações futuras"}], "problems": [{"title": "Confusão entre tipos de Madeira", "description": "Sercial, Verdelho, Bual e Malvasia exigem explicação técnica"}, {"title": "Volatilidade de preços internacional", "description": "Difícil acompanhar oscilações do mercado global"}, {"title": "Barreira linguística com turistas", "description": "Equipe enfrenta dificuldade em descrever em outros idiomas"}, {"title": "Gestão de estoque de alto valor", "description": "Garrafas caras exigem controle de segurança adicional"}, {"title": "Competição com vinhos continentais", "description": "Clientes preferem cartas diversificadas mesmo em Funchal"}], "city_name": "Funchal", "ticket_medio": "55-110€"}'::jsonb,
  '[{"q": "Como funciona a integração multilíngue?", "a": "Sistema oferece descrições pré-traduzidas em português, inglês, francês, espanhol e alemão"}, {"q": "Vocês rastreiam a procedência do vinho?", "a": "Sim, incluindo documento de autenticidade e certificado de origem para vinhos antiguidade"}, {"q": "Qual a média de aumento em conversão?", "a": "Nossos clientes em Funchal relatam aumento de 35% em vendas de Madeira nos primeiros 3 meses"}]'::jsonb,
  '["software-carta-de-vinhos-ponta-delgada", "software-carta-de-vinhos-lagos", "software-carta-de-vinhos-faro"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinhos-faro',
  'city',
  'pt',
  'Software de Carta de Vinhos em Faro | Winerim',
  'Solução para restaurantes no Algarve. Gerencie cartas de vinho com foco em DOCs do Alentejo e vinhos do sul de Portugal.',
  'Faro, Portugal',
  'Software de carta de vinhos para restaurantes em Faro',
  'Capture o mercado premium do Algarve com inteligência',
  'Solicitar demo',
  '/demo',
  'Analisar a minha carta',
  '/analisis-carta',
  '{"intro": "Faro é o portal para o mercado de vinhos do Algarve, com acesso privilegiado aos Alentejos de qualidade e Arinto d''Alvarinho. A gestão sofisticada d''essas cartas diferencia os estabelecimentos de topo. Winerim oferece precisamente as ferramentas necessárias.", "stats": [{"label": "Crescimento de receita", "value": "+24%"}, {"label": "Clientes turísticos", "value": "520+"}, {"label": "Simplificação de processos", "value": "69%"}], "country": "Portugal", "features": [{"title": "Especialização em Alentejo", "description": "Catalogação de sub-regiões (Borba, Redondo, Moura, Vidigueira)"}, {"title": "Preços competitivos", "description": "Análise de mercado do Algarve para maximizar margens"}, {"title": "Integração com eventos", "description": "Gestão de vinhos por temporada turística"}, {"title": "Recomendações para pratos locais", "description": "Sugestões baseadas em culinária algarvense"}], "problems": [{"title": "Desconhecimento das sub-regiões d''Alentejo", "description": "Clientes confundem Borba, Redondo, Moura e Vidigueira"}, {"title": "Gestão sazonal complexa", "description": "Verão exige vinhos diferentes do resto d''o ano"}, {"title": "Competição com supermercados", "description": "Preços baixos em retail forçam margens apertadas"}, {"title": "Falta de diferencial", "description": "Muitos restaurantes oferecem cartas genéricas sem curadoria"}, {"title": "Treinamento de equipe variável", "description": "Turnover sazonal dificulta aprendizado institucional"}], "city_name": "Faro", "ticket_medio": "38-78€"}'::jsonb,
  '[{"q": "Como o software se adapta à sazonalidade?", "a": "Sistema permite criar perfis de estação com cartas diferentes para alta e baixa temporada"}, {"q": "Posso receber sugestões de novos fornecedores?", "a": "Sim, nossa base de dados oferece recomendações de distribuidoras locais com histórico de qualidade"}, {"q": "Como funciona o suporte multilíngue?", "a": "Atendimento em português, inglês, alemão, francês e espanhol para orientação d''equipe"}]'::jsonb,
  '["software-carta-de-vinhos-lagos", "software-carta-de-vinhos-tavira", "software-carta-de-vinhos-silves"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinhos-evora',
  'city',
  'pt',
  'Software de Carta de Vinhos em Évora | Winerim',
  'Plataforma para restaurantes em Évora. Especializada em vinhos d''Alentejo com gestão inteligente e analytics avançados.',
  'Évora, Portugal',
  'Software de carta de vinhos para restaurantes em Évora',
  'Explore a riqueza vitivinícola d''Alentejo com tecnologia',
  'Solicitar demo',
  '/demo',
  'Analisar a minha carta',
  '/analisis-carta',
  '{"intro": "Évora, património da UNESCO, é o coração da região d''Alentejo vitivinícola. Os restaurantes locais têm responsabilidade de apresentar a qualidade e diversidade dos Alentejos com precisão e elegância. Winerim oferece sistema especializado nessa missão com curadoria inteligente.", "stats": [{"label": "Qualidade de recomendação", "value": "+27%"}, {"label": "Restaurantes históricos", "value": "85+"}, {"label": "Aumento em satisfação", "value": "+72%"}], "country": "Portugal", "features": [{"title": "Catalogação regional de Alentejo", "description": "Base completa com Borba, Redondo, Moura, Vidigueira, Monsaraz, Reguengos e Portalegre"}, {"title": "Histórico de safras", "description": "Rastreamento de picos de qualidade por produtor e ano"}, {"title": "Pairings com gastronomia local", "description": "Sugestões baseadas em pratos típicos alentejanos"}, {"title": "Integração com enoturismos", "description": "Conexão com adega e eventos de degustação regional"}], "problems": [{"title": "Confusão entre produtores locais", "description": "Centenas de pequenas adegas exigem catalogação rigorosa"}, {"title": "Falta de pairing com cozinha regional", "description": "Paixão por gastronomia alentejana fica sem complemento de vinho"}, {"title": "Gestão de enoturismo", "description": "Difícil coordenar degustações com controle de inventário"}, {"title": "Preservação de experiência tradicional", "description": "Tecnologia não pode perder a autenticidade d''Évora"}, {"title": "Treinamento em terroir local", "description": "Equipe precisa entender nuances d''Alentejo"}], "city_name": "Évora", "ticket_medio": "42-85€"}'::jsonb,
  '[{"q": "Como vocês tratam pequenos produtores?", "a": "Sistema especializado para adicionar produtores artesanais com descrição de terroir e produção limitada"}, {"q": "Posso criar eventos de degustação?", "a": "Sim, módulo de eventos permite agendamento, gestão de assistentes e análise de resultados"}, {"q": "Qual a experiência com restaurantes históricos?", "a": "Temos 85 restaurantes cadastrados em Évora, muitos em edifícios históricos com segurança de acesso"}]'::jsonb,
  '["software-carta-de-vinhos-monsaraz", "software-carta-de-vinhos-reguengos-de-monsaraz", "software-carta-de-vinhos-beja"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinhos-setubal',
  'city',
  'pt',
  'Software de Carta de Vinhos em Setúbal | Winerim',
  'Gestão de cartas de vinho em Setúbal. Especializado em Moscatéis e vinhos da Península de Setúbal.',
  'Setúbal, Portugal',
  'Software de carta de vinhos para restaurantes em Setúbal',
  'Valorize os Moscatéis únicos da Península',
  'Solicitar demo',
  '/demo',
  'Analisar a minha carta',
  '/analisis-carta',
  '{"intro": "Setúbal é capital mundial do Moscatel português, uma distinção que os restaurantes locais devem explorar com maestria. O software Winerim oferece especialização completa em Moscatéis de diferentes Colheitas e um sistema de gestão robusto para cartas sofisticadas.", "stats": [{"label": "Vendas de Moscatel", "value": "+35%"}, {"label": "Clientes satisfeitos", "value": "210+"}, {"label": "Tempo economizado", "value": "+65%"}], "country": "Portugal", "features": [{"title": "Especialização em Moscatel", "description": "Catalogação por colheita, envelhecimento e características aromáticas"}, {"title": "Rastreamento de lotes", "description": "Controle de autenticidade e procedência com certificação"}, {"title": "Sugestões de harmonia", "description": "Pairings inteligentes com peixes locais e sobremesas"}, {"title": "Relatórios de vendas por variedade", "description": "Analytics que mostram preferências do Moscatel vs vinhos secos"}], "problems": [{"title": "Moscatel frequentemente subestimado", "description": "Clientes desconhecem complexidade e envelhecimento"}, {"title": "Confusão de colheitas", "description": "Moscatel de diferentes anos exigem descrições distintas"}, {"title": "Distribuição desigual de inventário", "description": "Difícil manter equilíbrio entre variedades"}, {"title": "Gestão de lotes envelhecidos", "description": "Vinhos de 20+ anos exigem rastreamento de segurança"}, {"title": "Educação de cliente superficial", "description": "Equipe carece de conhecimento profundo sobre Moscatel"}], "city_name": "Setúbal", "ticket_medio": "48-92€"}'::jsonb,
  '[{"q": "Vocês rastreiam autenticidade de Moscatéis antigos?", "a": "Sim, sistema integra certificados de origem e procura verificação com Confraria do Moscatel"}, {"q": "Como funciona o pairing com pratos locais?", "a": "Base de dados inclui sugestões específicas para espadarte, peixe-espada e arroz de marisco"}, {"q": "Qual a duração média de implementação?", "a": "3 dias para restaurantes pequenos, até 7 dias para estabelecimentos com cartas complexas"}]'::jsonb,
  '["software-carta-de-vinhos-lisbao-setuba", "software-carta-de-vinhos-palmela", "software-carta-de-vinhos-carcavelos"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinhos-aveiro',
  'city',
  'pt',
  'Software de Carta de Vinhos em Aveiro | Winerim',
  'Plataforma para restaurantes em Aveiro. Gerencie cartas com Espumantes da Bairrada e vinhos do Centro português.',
  'Aveiro, Portugal',
  'Software de carta de vinhos para restaurantes em Aveiro',
  'Dinamize suas vendas com especialização regional',
  'Solicitar demo',
  '/demo',
  'Analisar a minha carta',
  '/analisis-carta',
  '{"intro": "Aveiro, com sua cultura gastronômica vibrante e proximidade com Bairrada, oferece oportunidade única para restaurantes inovadores. Os espumantes naturais e vinhos elegantes da região precisam de gestão sofisticada. Winerim oferece exatamente isso com foco em qualidade e inovação.", "stats": [{"label": "Crescimento em margem", "value": "+22%"}, {"label": "Restaurantes aderidos", "value": "155+"}, {"label": "Satisfação média", "value": "4.8/5"}], "country": "Portugal", "features": [{"title": "Catalogação de Bairrada Espumante", "description": "Sistema especializado para vinhos naturais, método clássico e espumantes"}, {"title": "Controle de carbonatação", "description": "Alertas sobre pressão e armazenamento de espumantes"}, {"title": "Pairings marinhos", "description": "Sugestões baseadas em peixes d''água doce da Ria de Aveiro"}, {"title": "Gestão de safras variáveis", "description": "Análise de qualidade ano-a-ano de Bairrada"}], "problems": [{"title": "Espumantes naturais exigem expertise", "description": "Fermentação natural cria desafios de consistência"}, {"title": "Pressão de gás variável", "description": "Alguns espumantes podem explodir se mal armazenados"}, {"title": "Confusão com métodos de produção", "description": "Clientes não entendem diferença entre método clássico e Charmat"}, {"title": "Gestão de temperatura crítica", "description": "Espumantes requerem resfriamento preciso"}, {"title": "Educação sobre Bairrada", "description": "Região é desconhecida comparada com Douro e Alentejo"}], "city_name": "Aveiro", "ticket_medio": "40-82€"}'::jsonb,
  '[{"q": "Como lidam com espumantes naturais?", "a": "Sistema oferece catalogação específica com fermentação, método, envelhecimento e pressão de gás"}, {"q": "Existe suporte para cartas sazonais?", "a": "Sim, interface permite criar versões diferentes da carta por estação ou evento especial"}, {"q": "Quais são os relatórios disponíveis?", "a": "Vendas por variedade, margem por garrafa, preferências sazonais, análise de cliente e ROI"}]'::jsonb,
  '["software-carta-de-vinhos-coimbra", "software-carta-de-vinhos-guarda", "software-carta-de-vinhos-castelo-branco"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinhos-viseu',
  'city',
  'pt',
  'Software de Carta de Vinhos em Viseu | Winerim',
  'Solução especializada para restaurantes em Viseu. Gerencie cartas com foco em vinhos da região de Dão.',
  'Viseu, Portugal',
  'Software de carta de vinhos para restaurantes em Viseu',
  'Domine a sofisticação dos vinhos de Dão',
  'Solicitar demo',
  '/demo',
  'Analisar a minha carta',
  '/analisis-carta',
  '{"intro": "Viseu é o coração histórico da região de Dão, onde elegância e sofisticação são sinônimos de qualidade vitivinícola. Os restaurantes viseuenses devem oferecer cartas que reflitam essa herança. Winerim oferece plataforma especializada em Dão com tecnologia de ponta.", "stats": [{"label": "Aumento de vendas", "value": "+28%"}, {"label": "Estabelecimentos activos", "value": "105+"}, {"label": "Satisfação de clientes", "value": "4.7/5"}], "country": "Portugal", "features": [{"title": "Expertise em Dão", "description": "Base com centenas de produtores e suas características únicas"}, {"title": "Histórico de envelhecimento", "description": "Recomendações sobre picos de consumo para cada safra"}, {"title": "Análise de terroir", "description": "Descrições detalhadas de origem geográfica e características"}, {"title": "Sugestões de colecção", "description": "Sistema para criar cartas de prestígio com vinhos de guarda"}], "problems": [{"title": "Dão frequentemente invisível", "description": "Mercado domina Douro, deixando Dão subestimado"}, {"title": "Confusão de sub-regiões", "description": "Dão Cima da Serra vs Dão Sul possuem identidades distintas"}, {"title": "Envelhecimento complexo", "description": "Vinhos de Dão têm curvas de evolução longas e variáveis"}, {"title": "Gestão de pequenos produtores", "description": "Muitos vinhos d''Dão vêm de adegas pequenas com produção limitada"}, {"title": "Educação de mercado", "description": "Clientes precisam aprender sobre qualidade de Dão"}], "city_name": "Viseu", "ticket_medio": "45-85€"}'::jsonb,
  '[{"q": "Vocês oferecem informações sobre Dão Cima da Serra?", "a": "Sim, sistema distingue Dão Cima da Serra (altitude, frescos) de Dão Sul (estrutura, corpo)"}, {"q": "Como funciona a gestão de cartas temáticas?", "a": "Permite criar sub-cartas por tema como \"Dão de Guarda\", \"Vinhos de Refeição\", \"Descobertas\""}, {"q": "Qual a experiência com restaurantes de prestígio?", "a": "Servimos estabelecimentos Michelin com suporte premium e consultoria contínua"}]'::jsonb,
  '["software-carta-de-vinhos-coimbra", "software-carta-de-vinhos-guarda", "software-carta-de-vinhos-tondela"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinhos-guimaraes',
  'city',
  'pt',
  'Software de Carta de Vinhos em Guimarães | Winerim',
  'Plataforma para restaurantes em Guimarães. Especializada em Vinho Verde e vinhos do Douro regional.',
  'Guimarães, Portugal',
  'Software de carta de vinhos para restaurantes em Guimarães',
  'Amplifique o sucesso com gestão inteligente de cartas',
  'Solicitar demo',
  '/demo',
  'Analisar a minha carta',
  '/analisis-carta',
  '{"intro": "Guimarães, berço da nacionalidade portuguesa, oferece aos seus restaurantes acesso privilegiado aos melhores Vinhos Verdes e aos vinhos estruturados do Douro superior. A gestão inteligente dessa diversidade cultural e gastronômica é o diferencial competitivo. Winerim oferece exatamente isso.", "stats": [{"label": "Crescimento em receita", "value": "+25%"}, {"label": "Restaurantes parceiros", "value": "135+"}, {"label": "Tempo de atendimento", "value": "-58%"}], "country": "Portugal", "features": [{"title": "Integração Vinho Verde + Douro", "description": "Gestão simultânea de duas regiões com características opostas"}, {"title": "Recomendações contextuais", "description": "Sugestões baseadas em hora do dia, clima e tipo de refeição"}, {"title": "Gestão de múltiplos eventos", "description": "Sistema para casamentos, conferências e jantares especiais"}, {"title": "Análise de preferências", "description": "Histórico de bebidas por tipo de cliente"}], "problems": [{"title": "Dificuldade em educar sobre Vinho Verde", "description": "Clientes internacionais desconsideram como \"fraco\" ou \"barato\""}, {"title": "Confusão entre estilos", "description": "Branco seco, espumante natural, tinto leve criam confusão"}, {"title": "Gestão de eventos é manual", "description": "Sem sistema, impossível escalar para casamentos e conferências"}, {"title": "Inventário complexo", "description": "Múltiplos produtores e sub-regiões exigem rastreamento rigoroso"}, {"title": "Treinamento de equipe variável", "description": "Rotatividade em Guimarães afeta qualidade de atendimento"}], "city_name": "Guimarães", "ticket_medio": "35-75€"}'::jsonb,
  '[{"q": "Como funciona a gestão para casamentos?", "a": "Módulo específico para criar cartas personalizadas, calcular quantidade e oferecer preços por convidado"}, {"q": "Vocês cobrem todas as sub-regiões de Vinho Verde?", "a": "Sim, as 9 sub-regiões: Monção, Melgaço, Paredes de Coura, Ponte da Barca, Ponte de Lima, Barcelos, Guarda, Penafiel e Amarante"}, {"q": "Qual a duração média do onboarding?", "a": "2 dias para restaurante padrão, até 5 dias para estabelecimentos com programas de eventos"}]'::jsonb,
  '["software-carta-de-vinhos-braga", "software-carta-de-vinhos-viana-do-castelo", "software-carta-de-vinhos-porto"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinhos-leiria',
  'city',
  'pt',
  'Software de Carta de Vinhos em Leiria | Winerim',
  'Gestão de cartas de vinho em Leiria. Solução adaptada para vinhos de Bairrada e Oeste.',
  'Leiria, Portugal',
  'Software de carta de vinhos para restaurantes em Leiria',
  'Revitalize seu negócio com tecnologia regional',
  'Solicitar demo',
  '/demo',
  'Analisar a minha carta',
  '/analisis-carta',
  '{"intro": "Leiria oferece aos seus restaurantes acesso estratégico aos vinhos de Bairrada, região de grande sofisticação, e aos vinhos mais contemporâneos do Oeste. Essa dualidade oferece oportunidade única para criar cartas diferenciadas. Winerim oferece especialização nessa combinação.", "stats": [{"label": "Aumento em margens", "value": "+23%"}, {"label": "Clientes ativos", "value": "95+"}, {"label": "Eficiência operacional", "value": "+64%"}], "country": "Portugal", "features": [{"title": "Gestão de Bairrada avançada", "description": "Catalogação de espumantes, tintos estruturados e vinhos brancos elegantes"}, {"title": "Vinhos do Oeste contemporâneos", "description": "Base de dados de produtores inovadores com naturais e vitivinicultura experimental"}, {"title": "Análise de tendências", "description": "Relatórios que mostram evolução de preferências em Leiria"}, {"title": "Pairings com gastronomia local", "description": "Sugestões para pastéis d''Tentúgal, produtos locais e peixe d''rio"}], "problems": [{"title": "Bairrada desconhecida fora d''a região", "description": "Clientes exteriores pouco familiarizados com vinhos locais"}, {"title": "Vinhos do Oeste são experimentais", "description": "Difícil categorizar e descrever produções inovadoras"}, {"title": "Gestão de inventário dinâmica", "description": "Pequenos produtores oferecem volumes limitados e variáveis"}, {"title": "Falta de diferencial", "description": "Restaurantes competem com cartas genéricas de cadeia"}, {"title": "Educação incompleta", "description": "Equipe não conhece história e terroir local"}], "city_name": "Leiria", "ticket_medio": "38-76€"}'::jsonb,
  '[{"q": "Como funciona a catalogação de Oeste inovador?", "a": "Sistema permite descrever naturais, laranja wines e experimentações com campos customizáveis"}, {"q": "Vocês oferecem consultoria sobre tendências?", "a": "Sim, relatório mensal com análise de mercado, novos produtores e tendências de consumo"}, {"q": "Qual o suporte para promover Bairrada?", "a": "Descrições pré-escritas, sugestões de apresentação oral e materiais educativos para equipe"}]'::jsonb,
  '["software-carta-de-vinhos-covilha", "software-carta-de-vinhos-castelo-branco", "software-carta-de-vinhos-pombal"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinhos-viana-do-castelo',
  'city',
  'pt',
  'Software de Carta de Vinhos em Viana do Castelo | Winerim',
  'Plataforma para restaurantes em Viana do Castelo. Especializada em Vinho Verde e vinhos do Minho.',
  'Viana do Castelo, Portugal',
  'Software de carta de vinhos para restaurantes em Viana do Castelo',
  'Domine a região do Minho com inteligência',
  'Solicitar demo',
  '/demo',
  'Analisar a minha carta',
  '/analisis-carta',
  '{"intro": "Viana do Castelo é a porta de entrada da região do Minho, berço dos melhores Vinhos Verdes portugueses. Os restaurantes desta cidade histórica têm responsabilidade de apresentar a qualidade máxima da região. Winerim oferece especialização completa nessa missão.", "stats": [{"label": "Vendas de Vinho Verde", "value": "+30%"}, {"label": "Restaurantes parceiros", "value": "78+"}, {"label": "Satisfação do cliente", "value": "4.8/5"}], "country": "Portugal", "features": [{"title": "Especialização em Monção e Melgaço", "description": "Catalogação completa das duas subregióes mais prestigiosas"}, {"title": "Descrições aromáticas", "description": "Perfis sensoriais detalhados para recomendações precisas"}, {"title": "Gestão de safras variáveis", "description": "Sistema que acompanha anos bons e anos de menor expressão"}, {"title": "Educação de cliente integrada", "description": "Textos pre-escritos para sommeliers descreverem com propriedade"}], "problems": [{"title": "Vinho Verde subestimado internacionalmente", "description": "Clientes estrangeiros desconsideram pela falta de conhecimento"}, {"title": "Confusão de subregióes", "description": "Monção e Melgaço são distintos mas frequentemente misturados"}, {"title": "Pressão de gás variável", "description": "Alguns Verdes têm mais carbonatação que outros"}, {"title": "Sazonalidade extrema", "description": "Vendas oscilam dramaticamente entre verão e inverno"}, {"title": "Dificuldade em diferenciar por produtor", "description": "Centenas de pequenos produtores exigem conhecimento profundo"}], "city_name": "Viana do Castelo", "ticket_medio": "32-68€"}'::jsonb,
  '[{"q": "Como vocês tratam Monção versus Melgaço?", "a": "Sistema oferece catalogação separada com características distintas: Monção mais mineral, Melgaço mais aromático"}, {"q": "Existe gestão de Vinho Verde espumante natural?", "a": "Sim, subseção específica para fermentação natural, com alertas de pressão de gás"}, {"q": "Qual a taxa de retenção de clientes em Viana?", "a": "96% de clientes continuam após 6 meses, com aumento médio de 30% em vendas"}]'::jsonb,
  '["software-carta-de-vinhos-braga", "software-carta-de-vinhos-guimaraes", "software-carta-de-vinhos-barcelos"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinhos-braganca',
  'city',
  'pt',
  'Software de Carta de Vinhos em Bragança | Winerim',
  'Solução para restaurantes em Bragança. Gerencie cartas focadas em vinhos do Douro e Trás-os-Montes.',
  'Bragança, Portugal',
  'Software de carta de vinhos para restaurantes em Bragança',
  'Conecte tradição com inovação em sua carta',
  'Solicitar demo',
  '/demo',
  'Analisar a minha carta',
  '/analisis-carta',
  '{"intro": "Bragança, no Nordeste português, oferece aos seus restaurantes uma posição estratégica entre o Douro vitivinícola e a tradição gastronômica de Trás-os-Montes. A curadoria adequada dessa herança e modernidade é essencial. Winerim oferece especialização nessa missão.", "stats": [{"label": "Aumento de receita", "value": "+20%"}, {"label": "Estabelecimentos", "value": "45+"}, {"label": "ROI médio", "value": "+52%"}], "country": "Portugal", "features": [{"title": "Douro Transmontan", "description": "Catalogação de vinhos da sub-região norte do Douro"}, {"title": "Vinhos ancestrais", "description": "Suporte para descrever tradições vinícolas transmontanas"}, {"title": "Gestão de pequena escala", "description": "Ideal para restaurantes familiares com cartas personalizadas"}, {"title": "Análise de sazonalidade turística", "description": "Sistema que acompanha picos de enoturismo regional"}], "problems": [{"title": "Mercado pequeno e concentrado", "description": "Difícil escalar vendas em região com população baixa"}, {"title": "Falta de diferencial claro", "description": "Restaurantes locais oferecem cartas muito similares"}, {"title": "Fornecimento limitado", "description": "Distribuidoras locais têm inventário reduzido"}, {"title": "Educação de cliente superficial", "description": "Turistas chegam sem conhecimento de vinhos locais"}, {"title": "Gestão de eventos rara", "description": "Poucos casamentos e jantares especiais comparado a cidades maiores"}], "city_name": "Bragança", "ticket_medio": "35-72€"}'::jsonb,
  '[{"q": "Como funciona para pequenos restaurantes?", "a": "Planos escaláveis desde pequeno até grande estabelecimento, com interface simplificada para operações pequenas"}, {"q": "Vocês cobrem Douro Transmontan?", "a": "Sim, sub-região norte do Douro com sua identidade e produtores específicos catalogados"}, {"q": "Qual a vantagem de usar sistema nessa região?", "a": "Diferencial competitivo crucial: gerir conhecimento local e oferecer experiência consistente"}]'::jsonb,
  '["software-carta-de-vinhos-vila-real", "software-carta-de-vinhos-guarda", "software-carta-de-vinhos-miranda-do-douro"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinhos-vila-real',
  'city',
  'pt',
  'Software de Carta de Vinhos em Vila Real | Winerim',
  'Plataforma especializada para restaurantes em Vila Real. Foco em vinhos do Douro da sua região.',
  'Vila Real, Portugal',
  'Software de carta de vinhos para restaurantes em Vila Real',
  'Maximize potencial do Douro em sua região',
  'Solicitar demo',
  '/demo',
  'Analisar a minha carta',
  '/analisis-carta',
  '{"intro": "Vila Real é coração do Douro Transmontan, região de vinhos elegantes e estruturados. Os restaurantes locais devem explorar essa proximidade geográfica e qualitativa com maestria. Winerim oferece especialização completa nessa missão com foco no terroir local.", "stats": [{"label": "Crescimento em vendas", "value": "+26%"}, {"label": "Restaurantes ativos", "value": "62+"}, {"label": "Satisfação", "value": "4.7/5"}], "country": "Portugal", "features": [{"title": "Especialização em Douro Norte", "description": "Catalogação de produtores da sub-região imediata"}, {"title": "Histórico de safras", "description": "Rastreamento de qualidade ano-a-ano no Douro"}, {"title": "Gestão de enoturismo", "description": "Integração com quintas vinícolas locais para eventos"}, {"title": "Análise de margem por produtor", "description": "Identificar marcas mais rentáveis na região"}], "problems": [{"title": "Reputação do Douro desigual", "description": "Alguns produtores têm qualidade inconsistente"}, {"title": "Gestão de relacionamento com quintas", "description": "Difícil manter parceria com produtores proximais"}, {"title": "Educação de cliente sobre terroir", "description": "Turistas não entendem diferença entre Douro Superior e Médio"}, {"title": "Concentração excessiva", "description": "Muitos restaurantes focam apenas em marcas conhecidas"}, {"title": "Gestão de pequenos lotes", "description": "Alguns produtores oferecem volumes muito reduzidos"}], "city_name": "Vila Real", "ticket_medio": "42-82€"}'::jsonb,
  '[{"q": "Como funciona a integração com quintas locais?", "a": "Sistema oferece calendário de eventos, degustações e colheitas diretamente com as vinícolas"}, {"q": "Vocês cobrem pequenos produtores?", "a": "Sim, especialização em adicionar produtores artesanais com volumes limitados"}, {"q": "Qual a experiência com enoturismo?", "a": "62 restaurantes em Vila Real usando plataforma para coordenar experiências de vinho completas"}]'::jsonb,
  '["software-carta-de-vinhos-braganca", "software-carta-de-vinhos-lamego", "software-carta-de-vinhos-peso-da-regua"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinhos-ponta-delgada',
  'city',
  'pt',
  'Software de Carta de Vinhos em Ponta Delgada | Winerim',
  'Solução para restaurantes em Ponta Delgada. Especializada em Vinho da Madeira e vinhos locais açorianos.',
  'Ponta Delgada, Portugal',
  'Software de carta de vinhos para restaurantes em Ponta Delgada',
  'Eleve sua proposta vitivinícola nos Açores',
  'Solicitar demo',
  '/demo',
  'Analisar a minha carta',
  '/analisis-carta',
  '{"intro": "Ponta Delgada, capital dos Açores, oferece oportunidade única de posicionar Vinho da Madeira e vinhos locais açorianos com sofisticação. Os restaurantes insulares enfrentam desafios logísticos e de mercado distintos. Winerim oferece solução adaptada a essa realidade.", "stats": [{"label": "Aumento em conversão", "value": "+29%"}, {"label": "Estabelecimentos", "value": "55+"}, {"label": "Satisfação", "value": "4.9/5"}], "country": "Portugal", "features": [{"title": "Gestão de importação", "description": "Rastreamento de origem, custos de importação e prazos logísticos"}, {"title": "Vinhos açorianos locais", "description": "Catalogação de produtores açorianos com pequena produção"}, {"title": "Preços dinâmicos insulares", "description": "Sistema que considera custo extra de logística marítima"}, {"title": "Descrições multilíngues", "description": "Português, inglês, francês, alemão para turistas internacionais"}], "problems": [{"title": "Custo de importação elevado", "description": "Logística para ilhas aumenta preço final significativamente"}, {"title": "Disponibilidade limitada", "description": "Alguns vinhos levam semanas para chegar"}, {"title": "Gestão de temperatura em clima tropical", "description": "Calor e umidade exigem armazenamento especializado"}, {"title": "Mercado reduzido", "description": "População pequena limita volume de vendas"}, {"title": "Desconhecimento de vinhos locais", "description": "Turistas não sabem que Açores produzem vinho"}], "city_name": "Ponta Delgada", "ticket_medio": "50-100€"}'::jsonb,
  '[{"q": "Como lidam com custos de importação?", "a": "Sistema calcula automaticamente markups adicionais para considerar custos logísticos insulares"}, {"q": "Vocês conhecem vinhos açorianos?", "a": "Sim, temos catalogação de pequenos produtores locais com históricos de qualidade"}, {"q": "Qual a experiência com mercado de turismo?", "a": "55 restaurantes em Ponta Delgada com 80% de receita de turistas internacionais"}]'::jsonb,
  '["software-carta-de-vinhos-funchal", "software-carta-de-vinhos-horta", "software-carta-de-vinhos-angra-do-heroismo"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinhos-cascais',
  'city',
  'pt',
  'Software de Carta de Vinhos em Cascais | Winerim',
  'Plataforma para restaurantes premium em Cascais. Especializada em cartas sofisticadas de vinho.',
  'Cascais, Portugal',
  'Software de carta de vinhos para restaurantes em Cascais',
  'Ofereça experiência vitivinícola excepcional',
  'Solicitar demo',
  '/demo',
  'Analisar a minha carta',
  '/analisis-carta',
  '{"intro": "Cascais, destino premium à beira do Tejo, atrai clientela exigente que espera cartas de vinho sofisticadas. Os restaurantes de Cascais devem oferecer curadoria impecável com foco em qualidade e exclusividade. Winerim oferece especialização em cartas premium com suporte white-glove.", "stats": [{"label": "Ticket médio", "value": "+35%"}, {"label": "Restaurantes de luxo", "value": "120+"}, {"label": "Retenção de clientes", "value": "94%"}], "country": "Portugal", "features": [{"title": "Gestão de cartas premium", "description": "Interface especializada para vinhos de coleção e raridades"}, {"title": "Rastreamento de raridades", "description": "Catalogação com autenticação e certificados para garrafas antigas"}, {"title": "Sugestões de pairing gourmet", "description": "Algoritmo baseado em técnicas culinárias contemporâneas"}, {"title": "Relatórios de preferência de cliente VIP", "description": "Sistema CRM integrado para recomendações personalizadas"}], "problems": [{"title": "Esperativa de cliente extremamente alta", "description": "Mercado de Cascais demanda conhecimento excepcional"}, {"title": "Gestão de raridades e autenticação", "description": "Vinhos caros exigem verificação de procedência rigorosa"}, {"title": "Competição acirrada", "description": "Muitos restaurantes premium em área reduzida"}, {"title": "Rotatividade de sommeliers", "description": "Talentos são recrutados para cidades maiores"}, {"title": "Gestão de eventos corporativos", "description": "Jantares executivos com 50+ pessoas exigem coordenação precisa"}], "city_name": "Cascais", "ticket_medio": "65-140€"}'::jsonb,
  '[{"q": "Como vocês garantem autenticidade de raridades?", "a": "Sistema integra com bases de dados internacionais de autenticação e oferece certificação de procedência"}, {"q": "Vocês oferecem suporte para jantares corporativos?", "a": "Sim, módulo especializado para eventos com menu de vinho, gestão de bebidas e relatórios de gasto"}, {"q": "Qual a experiência com mercado premium?", "a": "120 restaurantes de luxo em Cascais, muitos com Michelin e experiência com clientela internacional"}]'::jsonb,
  '["software-carta-de-vinhos-estoril", "software-carta-de-vinhos-lisboa", "software-carta-de-vinhos-sintra"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinhos-sintra',
  'city',
  'pt',
  'Software de Carta de Vinhos em Sintra | Winerim',
  'Solução para restaurantes em Sintra. Especializada em cartas turísticas e experiências de vinho.',
  'Sintra, Portugal',
  'Software de carta de vinhos para restaurantes em Sintra',
  'Transforme visitantes em aficionados por vinho',
  'Solicitar demo',
  '/demo',
  'Analisar a minha carta',
  '/analisis-carta',
  '{"intro": "Sintra, património UNESCO, atrai turismo cultural de elevada qualidade. Os restaurantes sintrenses devem oferecer experiências educativas e transformadoras em vinho. Winerim oferece especialização em cartas turísticas com alcance educativo.", "stats": [{"label": "Aumento em vendas", "value": "+31%"}, {"label": "Restaurantes parceiros", "value": "85+"}, {"label": "Educação de cliente", "value": "+78%"}], "country": "Portugal", "features": [{"title": "Descrições educativas", "description": "Textos que transformam curiosidade em conhecimento authentico"}, {"title": "Recomendações por nacionalidade", "description": "Adaptação de sugestões para origem do turista"}, {"title": "Integração com serviços turísticos", "description": "Calendário de eventos locais para harmonização vinho-experiência"}, {"title": "Análise de satisfação pós-visita", "description": "Sistema de feedback para melhorar recomendações futuras"}], "problems": [{"title": "Turistas com conhecimento variável", "description": "Clientes vão de completos iniciantes a experts"}, {"title": "Tempo limitado de permanência", "description": "Turistas têm pouco tempo para educação detalhada"}, {"title": "Expectativas de \"achado especial\"", "description": "Clientes querem descobrir vinho raro ou único em Sintra"}, {"title": "Gestão de picos sazonais", "description": "Verão versus inverno criam flutuações drásticas"}, {"title": "Retenção de clientes internacional", "description": "Impossível captar cliente regular em população turística"}], "city_name": "Sintra", "ticket_medio": "40-85€"}'::jsonb,
  '[{"q": "Como funciona a educação de cliente turista?", "a": "Descrições pré-escritas em português, inglês, francês, espanhol e alemão com nível de detalhe ajustável"}, {"q": "Vocês sugerem eventos locais?", "a": "Sim, calendário integrado mostra eventos em Sintra para harmonizar recomendações de vinho"}, {"q": "Qual a vantagem de sistema em destino turístico?", "a": "Diferencial: oferecer educação consistente que transforma visitante em cliente fiel quando retornar"}]'::jsonb,
  '["software-carta-de-vinhos-cascais", "software-carta-de-vinhos-lisboa", "software-carta-de-vinhos-estoril"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinhos-tavira',
  'city',
  'pt',
  'Software de Carta de Vinhos em Tavira | Winerim',
  'Plataforma para restaurantes em Tavira (Algarve). Especializada em vinhos alentejanos.',
  'Tavira, Portugal',
  'Software de carta de vinhos para restaurantes em Tavira',
  'Potencialize o mercado algarvio com excelência',
  'Solicitar demo',
  '/demo',
  'Analisar a minha carta',
  '/analisis-carta',
  '{"intro": "Tavira, no Algarve, oferece aos seus restaurantes acesso a um mercado turístico sofisticado e preferência por vinhos alentejanos de qualidade. A gestão inteligente dessa oportunidade transforma vendas. Winerim oferece especialização regional com foco em resultados.", "stats": [{"label": "Crescimento em margem", "value": "+27%"}, {"label": "Estabelecimentos", "value": "58+"}, {"label": "Tempo economizado", "value": "+66%"}], "country": "Portugal", "features": [{"title": "Especialização em Alentejo", "description": "Catalogação completa de Borba, Redondo, Moura, Vidigueira e Reguengos"}, {"title": "Análise de sazonalidade", "description": "Sistema que acompanha picos de turismo e ajusta cartas"}, {"title": "Gestão de múltiplas locações", "description": "Para grupos de restaurantes com sincronia de inventário"}, {"title": "Recomendações por clima", "description": "Sugestões de vinho ajustadas por temperatura/clima do dia"}], "problems": [{"title": "Clientes turísticos sazonais", "description": "Verão concentra vendas, inverno é quase vazio"}, {"title": "Desconhecimento de Alentejo", "description": "Turistas internacionais focam em Douro e desconhecem região"}, {"title": "Gestão de fornecimento", "description": "Distribuidoras com abastecimento irregular no Algarve"}, {"title": "Diferencial inexistente", "description": "Muitos restaurantes oferecem cartas muito similares"}, {"title": "Educação limitada", "description": "Equipe frequentemente sazonal sem conhecimento regional"}], "city_name": "Tavira", "ticket_medio": "35-75€"}'::jsonb,
  '[{"q": "Como lidam com sazonalidade extrema?", "a": "Sistema permite criar múltiplas versões de carta com ativação por período, ajustando inventário automaticamente"}, {"q": "Vocês cobrem Reguengos de Monsaraz especificamente?", "a": "Sim, sub-região com suas características próprias e produtores distintos catalogados"}, {"q": "Qual a vantagem para múltiplas locações?", "a": "Sincronização de inventário entre restaurantes, relatórios consolidados e melhor negociação com fornecedores"}]'::jsonb,
  '["software-carta-de-vinhos-faro", "software-carta-de-vinhos-lagos", "software-carta-de-vinhos-silves"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'software-carta-de-vinhos-lagos',
  'city',
  'pt',
  'Software de Carta de Vinhos em Lagos | Winerim',
  'Gestão inteligente de cartas de vinho em Lagos. Solução para restaurantes no Algarve Ocidental.',
  'Lagos, Portugal',
  'Software de carta de vinhos para restaurantes em Lagos',
  'Lidere o mercado gastronômico de Lagos',
  'Solicitar demo',
  '/demo',
  'Analisar a minha carta',
  '/analisis-carta',
  '{"intro": "Lagos, joia do Algarve Ocidental, atrai clientela premium que valoriza curadoria de vinho sofisticada. Os restaurantes lagoenses devem oferecer experiências diferenciadas com foco em qualidade. Winerim oferece especialização em cartas premium regionais.", "stats": [{"label": "Aumento de receita", "value": "+33%"}, {"label": "Restaurantes premium", "value": "72+"}, {"label": "Satisfação média", "value": "4.8/5"}], "country": "Portugal", "features": [{"title": "Cartas para clientela internacional", "description": "Interface com descrições em 6 idiomas para turismo global"}, {"title": "Gestão de eventos à beira-mar", "description": "Sistema especializado para casamentos e jantares em cenários premium"}, {"title": "Análise de perfil de cliente", "description": "Recomendações baseadas em origem do turista"}, {"title": "Rastreamento de safras premium", "description": "Foco em vinhos de qualidade superior com picos de consumo"}], "problems": [{"title": "Expectativa de qualidade muito alta", "description": "Clientes de Lagos são versados e exigentes em vinho"}, {"title": "Competição extremamente acirrada", "description": "Dezenas de restaurantes premium em área reduzida"}, {"title": "Gestão de eventos complexa", "description": "Casamentos e jantares especiais exigem coordenação perfeita"}, {"title": "Sourcing de vinhos raros", "description": "Distribuição no Algarve é limitada para raridades"}, {"title": "Retenção de sommeliers talentosos", "description": "Profissionais são recrutados para Lisboa ou Cascais"}], "city_name": "Lagos", "ticket_medio": "60-130€"}'::jsonb,
  '[{"q": "Como funciona o suporte para casamentos?", "a": "Módulo especializado com menu de vinho customizado, gestão de quantidade, documentos e logística completa"}, {"q": "Vocês conseguem fornecimento de raridades?", "a": "Rede de distribuidoras premium em Portugal com acesso a vinhos limitados e de coleção"}, {"q": "Qual a experiência com mercado turístico premium?", "a": "72 restaurantes em Lagos com 85% de receita de turistas internacionais, muitos com reputação Michelin"}]'::jsonb,
  '["software-carta-de-vinhos-tavira", "software-carta-de-vinhos-faro", "software-carta-de-vinhos-cascais"]'::jsonb,
  'Article',
  true
);

COMMIT;

-- ============ GERMANY (30 cities) ============
BEGIN;

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'weinkarten-software-hannover',
  'city',
  'de',
  'Weinkarten-Software in Hannover | Winerim',
  'Intelligente Weinkartenverwaltung für Restaurants in Hannover. Spezialisiert auf deutsche Weinregionen und edle Riesling-Sorten.',
  'Hannover, Deutschland',
  'Weinkarten-Software für Restaurants in Hannover',
  'Maximieren Sie Ihre Weinverkäufe mit modernster Technologie',
  'Demo anfordern',
  '/demo',
  'Meine Weinkarte analysieren',
  '/analisis-carta',
  '{"intro": "Hannover ist das Tor zu den Weinregionen Mosel und Rheingau. Restaurants in Hannover benötigen spezialisierte Werkzeuge, um die Komplexität deutscher Weine zu verwalten. Winerim bietet genau das mit Fokus auf Qualität und Rentabilität.", "stats": [{"label": "Umsatzsteigerung", "value": "+26%"}, {"label": "Aktive Restaurants", "value": "380+"}, {"label": "Zeitersparnis", "value": "65%"}], "country": "Deutschland", "features": [{"title": "Mosel-Spezialisierung", "description": "Katalogisierung aller Moselweine mit Terroir und Qualitätsangaben"}, {"title": "Riesling-Experte", "description": "Automatische Empfehlungen für Riesling-Paarungen nach Süße und Säure"}, {"title": "Deutsche Weinregionen", "description": "Vollständige Datenbank aller 13 Anbaugebiete Deutschlands"}, {"title": "Rentabilitätsanalyse", "description": "Automatische Gewinnspanne-Berechnung pro Flasche"}], "problems": [{"title": "Komplexität von Riesling-Qualitätsebenen", "description": "Kabinett bis Trockenbeerenauslese verwirren oft Personal und Gäste"}, {"title": "Fehlendes Wissen über Terroir", "description": "Mosel-Unterschiede zwischen Mittel-, Ober- und Untermosel sind nicht bekannt"}, {"title": "Manuelle Lagerverwaltung", "description": "Excel-Tabellen können mit dynamischen Weinankäufen nicht Schritt halten"}, {"title": "Fehlende Großhandelskontakte", "description": "Schwierigkeit, mit lokalen Weinhändlern in Hannover zu verhandeln"}, {"title": "Schulung des Personals", "description": "Sommelier-Wissen ist nicht standardisiert oder dokumentiert"}], "city_name": "Hannover", "ticket_medio": "45-85€"}'::jsonb,
  '[{"q": "Wie unterscheiden Sie zwischen Mosel-Ebenen?", "a": "Unser System kategorisiert nach Qualitätsstufen (Kabinett, Spätlese, Auslese, etc.) mit Säure- und Alkoholangaben"}, {"q": "Gibt es Schulungsmaterial auf Deutsch?", "a": "Ja, vollständige deutsche Dokumentation und Video-Tutorials für Ihr Personal verfügbar"}, {"q": "Wie lange dauert die Implementierung?", "a": "Durchschnittlich 48 Stunden für mittlere Restaurants, mit dediziertem Support-Team"}]'::jsonb,
  '["weinkarten-software-bremen", "weinkarten-software-duesseldorf", "weinkarten-software-koeln"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'weinkarten-software-nuernberg',
  'city',
  'de',
  'Weinkarten-Software in Nürnberg | Winerim',
  'Verwaltung von Weinkarten in Nürnberg. Spezialisiert auf Franken-Weine und regionale Spezialitäten.',
  'Nürnberg, Deutschland',
  'Weinkarten-Software für Restaurants in Nürnberg',
  'Beherrschen Sie fränkische Weine mit Expertise',
  'Demo anfordern',
  '/demo',
  'Meine Weinkarte analysieren',
  '/analisis-carta',
  '{"intro": "Nürnberg ist das Zentrum der fränkischen Weinkultur. Restaurants in Nürnberg haben das Privileg, direkten Zugang zu Franken-Weinen zu haben. Winerim bietet spezialisierte Lösungen für die Verwaltung dieser komplexen und hochwertigen Weinkarten.", "stats": [{"label": "Verkaufssteigerung", "value": "+28%"}, {"label": "Partner-Restaurants", "value": "265+"}, {"label": "Kundenumwandlung", "value": "+31%"}], "country": "Deutschland", "features": [{"title": "Franken-Expertise", "description": "Katalogisierung von Silvaner, Müller-Thurgau und regionalen Spezialitäten"}, {"title": "Weingut-Integration", "description": "Direkte Verbindung mit fränkischen Weingütern für Updates und Events"}, {"title": "Paarungsempfehlungen", "description": "Intelligente Harmonisierungen für fränkische Küche"}, {"title": "Verkaufsanalytics", "description": "Detaillierte Berichte über Verkaufsleistung nach Rebsorte"}], "problems": [{"title": "Unterrepräsentation von Silvaner", "description": "Regionale Spezialität wird oft gegenüber bekannteren Sorten vernachlässigt"}, {"title": "Kleine Weingüter-Verwaltung", "description": "Viele fränkische Weingüter haben begrenzte Produktionsmengen"}, {"title": "Saisonale Schwankungen", "description": "Tourismus und lokale Events beeinflussen Verkaufsmuster drastisch"}, {"title": "Personal-Rotation", "description": "Hohe Fluktuation in Restaurants erfordert kontinuierliche Schulung"}, {"title": "Begrenzte Vielfalt", "description": "Zu viele Karten konzentrieren sich nur auf bekannte Sorten"}], "city_name": "Nürnberg", "ticket_medio": "40-80€"}'::jsonb,
  '[{"q": "Wie unterstützen Sie fränkische Weingüter?", "a": "Direkte Integration mit regionalen Weingütern für Event-Verwaltung und Verkaufsberichte"}, {"q": "Bieten Sie Silvaner-Spezialisierung?", "a": "Ja, spezialisierte Katalogisierung mit Geschmacksprofilen und Paarungsempfehlungen für Silvaner"}, {"q": "Welche Vorteile hat eine Software für kleine Restaurants?", "a": "Kosteneffiziente Lösungen für 20-100 Flaschen mit professionellen Analytics"}]'::jsonb,
  '["weinkarten-software-wuerzburg", "weinkarten-software-bamberg", "weinkarten-software-erlangen"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'weinkarten-software-bremen',
  'city',
  'de',
  'Weinkarten-Software in Bremen | Winerim',
  'Weinkartenverwaltung für Restaurants in Bremen. Spezialisiert auf Norden deutsche Weine.',
  'Bremen, Deutschland',
  'Weinkarten-Software für Restaurants in Bremen',
  'Optimieren Sie Ihre Weinstrategie im Norden',
  'Demo anfordern',
  '/demo',
  'Meine Weinkarte analysieren',
  '/analisis-carta',
  '{"intro": "Bremen als norddeutsche Handelsmetropole hat einzigartige Anforderungen an Weinkarten-Management. Restaurants benötigen spezialisierte Lösungen für die Verwaltung von Importen und internationalen Weinen. Winerim bietet genau das mit Fokus auf globale Qualität.", "stats": [{"label": "Umsatzwachstum", "value": "+24%"}, {"label": "Aktive Etablissements", "value": "210+"}, {"label": "Effizienz", "value": "+68%"}], "country": "Deutschland", "features": [{"title": "Import-Spezialisierung", "description": "Management von Weinen aus internationalen Quellen mit Zolldokumentation"}, {"title": "Rheingau-Datenbank", "description": "Katalogisierung klassischer deutscher Weine mit Provenance-Tracking"}, {"title": "Großhandel-Integration", "description": "Verbindung mit Bremen-Großhandlern für optimale Preisverhandlungen"}, {"title": "Lagerverwaltung", "description": "Spezialisierte Systeme für komplexe Kellerbestände"}], "problems": [{"title": "Komplexität von internationalen Weinen", "description": "Große Vielfalt verwirrt Personal und erschwert Empfehlungen"}, {"title": "Zoll- und Importdokumentation", "description": "Administrative Komplexität bei Import-Weinen nicht standardisiert"}, {"title": "Lagerbedingungen kritisch", "description": "Temperatur und Licht-Management in Bremer Klimazonen ist herausfordernd"}, {"title": "Lieferantennetzwerk fragmentiert", "description": "Schwierig, mit vielen verschiedenen Importeuren zu arbeiten"}, {"title": "Fachpersonal knapp", "description": "Sommelier-Expertise ist in Bremen schwer zu finden"}], "city_name": "Bremen", "ticket_medio": "48-90€"}'::jsonb,
  '[{"q": "Wie verwalten Sie Importdokumente?", "a": "System integriert Zoll- und Importdaten mit automatischer Dokumentenverfolgung"}, {"q": "Unterstützen Sie internationale Weine?", "a": "Ja, Katalog mit Weinen aus über 30 Ländern mit regionalen Spezialisierungen"}, {"q": "Bieten Sie Schulung auf Deutsch an?", "a": "Vollständiges deutsches Schulungsprogramm mit Video-Tutorials und Live-Sessions"}]'::jsonb,
  '["weinkarten-software-hannover", "weinkarten-software-hamburg", "weinkarten-software-oldenburg"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'weinkarten-software-freiburg',
  'city',
  'de',
  'Weinkarten-Software in Freiburg | Winerim',
  'Weinkartenmanagementsystem in Freiburg. Spezialisiert auf Baden-Weine und regionale Besonderheiten.',
  'Freiburg, Deutschland',
  'Weinkarten-Software für Restaurants in Freiburg',
  'Dominieren Sie die Baden-Weinkultur',
  'Demo anfordern',
  '/demo',
  'Meine Weinkarte analysieren',
  '/analisis-carta',
  '{"intro": "Freiburg ist das Herz der Weinregion Baden. Restaurants in Freiburg haben Zugang zu den warmsten Weinen Deutschlands. Winerim bietet spezialisierte Lösungen für die Verwaltung von Burgunder und regionalen Spezialitäten.", "stats": [{"label": "Verkaufsanstieg", "value": "+29%"}, {"label": "Restaurants", "value": "185+"}, {"label": "Zufriedenheit", "value": "4.8/5"}], "country": "Deutschland", "features": [{"title": "Baden-Expertise", "description": "Vollständige Katalogisierung Badener Weine mit Lagenkarten"}, {"title": "Burgunder-Spezialisierung", "description": "Tiefenwissen über Spätburgunder und Grauburgunder"}, {"title": "Terroir-Integration", "description": "Detaillierte Beschreibungen der Baden-Subregionen (Markgräflerland, Kaiserstuhl, Ortenau)"}, {"title": "Lokale Weingut-Verbindung", "description": "Direkte Integration mit Freiburger Weingütern"}], "problems": [{"title": "Baden-Weine sind global unterrepräsentiert", "description": "Gäste kennen Baden-Weine oft nicht, denken an Rheingau"}, {"title": "Komplexität der Subregionen", "description": "Markgräflerland, Kaiserstuhl und Ortenau haben sehr unterschiedliche Profile"}, {"title": "Spätburgunder-Preis-Volatilität", "description": "Hochwertige Spätburgunder haben dynamische Marktpreise"}, {"title": "Kleine Weingüter-Verwaltung", "description": "Viele Baden-Produzenten sind Familienbetriebe mit begrenztem Output"}, {"title": "Saisonale Schwankungen", "description": "Sommerliches Weingeschäft ist völlig anders als Winter"}], "city_name": "Freiburg", "ticket_medio": "50-95€"}'::jsonb,
  '[{"q": "Wie unterscheiden Sie die Baden-Subregionen?", "a": "System katalogisiert alle 9 Baden-Subregionen mit spezifischen Klimaprofilen und Weinstilen"}, {"q": "Bieten Sie Spätburgunder-Analytics?", "a": "Ja, dedizierte Berichte für Spätburgunder mit Preis-Tracking und Verkaufsanalysen"}, {"q": "Können Sie mit lokalen Weingütern zusammenarbeiten?", "a": "Ja, integrierte Plattform für Weingut-Partnerschaften mit Event-Management"}]'::jsonb,
  '["weinkarten-software-heidelberg", "weinkarten-software-konstanz", "weinkarten-software-karlsruhe"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'weinkarten-software-heidelberg',
  'city',
  'de',
  'Weinkarten-Software in Heidelberg | Winerim',
  'Intelligente Weinkartenverwaltung in Heidelberg. Premium-Lösungen für die Heidelberger Gastronomieszene.',
  'Heidelberg, Deutschland',
  'Weinkarten-Software für Restaurants in Heidelberg',
  'Etablieren Sie sich als Wein-Excellence in Heidelberg',
  'Demo anfordern',
  '/demo',
  'Meine Weinkarte analysieren',
  '/analisis-carta',
  '{"intro": "Heidelberg, eine der charmantesten Universitätsstädte Deutschlands, zieht anspruchsvolle Gäste an. Restaurants in Heidelberg müssen Premium-Weinkarten mit Rheingau und Pfalz-Fokus bieten. Winerim bietet spezialisierte Lösungen für gehobene Gastronomie.", "stats": [{"label": "Kundenzufriedenheit", "value": "+30%"}, {"label": "Premium-Restaurants", "value": "145+"}, {"label": "Durchschnittlicher Ticket", "value": "+42%"}], "country": "Deutschland", "features": [{"title": "Rheingau-Spezialisierung", "description": "Vollständige Katalogisierung mit Einzellagenkenntnissen"}, {"title": "Pfalz-Datenbank", "description": "Expertise für Pfalz-Riesling und experimentelle Sorten"}, {"title": "Premium-Analytik", "description": "ROI-Fokus für hochwertige Flaschen mit detaillierten Margen-Analysen"}, {"title": "Weingut-Partnerschaften", "description": "Direktverbindung mit renommierten Rheingau-Weingütern"}], "problems": [{"title": "Hohe Erwartungen von anspruchsvollen Gästen", "description": "Universitätsstadt mit kulturellem Niveau erwartet Expertenwissen"}, {"title": "Konkurrenz in gehobener Gastronomie", "description": "Viele Premium-Restaurants mit ähnlichen Weinkarten"}, {"title": "Verwaltung seltener Weine", "description": "Alte Jahrgänge und limitierte Flaschen erfordern spezielle Systeme"}, {"title": "Personal-Rotation in Heidelberg", "description": "Hochqualifiziertes Personal wird oft zu größeren Städten abgeworben"}, {"title": "Event-Management für Weinfeste", "description": "Heidelberg hat viele Weinfeste, die spezielle Koordination erfordern"}], "city_name": "Heidelberg", "ticket_medio": "60-120€"}'::jsonb,
  '[{"q": "Wie verwalten Sie seltene Weine?", "a": "System mit Authentifizierung, Provenance-Tracking und spezieller Lagerverwaltung für Raritäten"}, {"q": "Bieten Sie Weingut-Partnerschaften?", "a": "Ja, direkte Integration mit Rheingau und Pfalz-Weingütern für Tasting-Events"}, {"q": "Welche Premium-Features haben Sie?", "a": "White-glove Support, benutzerdefinierte Analysen und Beratung für gehobene Gastronomie"}]'::jsonb,
  '["weinkarten-software-freiburg", "weinkarten-software-wiesbaden", "weinkarten-software-mainz"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'weinkarten-software-mainz',
  'city',
  'de',
  'Weinkarten-Software in Mainz | Winerim',
  'Weinkartenverwaltung in Mainz. Spezialisiert auf Rheingau und Mosel-Weine für gehobene Gastronomie.',
  'Mainz, Deutschland',
  'Weinkarten-Software für Restaurants in Mainz',
  'Professionalisieren Sie Ihre Weinkultur-Mission',
  'Demo anfordern',
  '/demo',
  'Meine Weinkarte analysieren',
  '/analisis-carta',
  '{"intro": "Mainz ist das Zentrum der Rheingau-Weinkultur und Tor zur Moselregion. Restaurants in Mainz haben einzigartige Möglichkeiten, die besten deutschen Weine zu präsentieren. Winerim bietet spezialisierte Lösungen für Weinkultur-Leadership.", "stats": [{"label": "Verkaufswachstum", "value": "+27%"}, {"label": "Partnerschaft", "value": "175+"}, {"label": "Effizienz-Gewinn", "value": "+66%"}], "country": "Deutschland", "features": [{"title": "Rheingau-Meister", "description": "Vollständige Lagenkatalogisierung mit Riesling-Spezialisierung"}, {"title": "Mosel-Integration", "description": "Expertise in Mosel-Terrakotta und komplexe Säure-Profile"}, {"title": "Historische Weine", "description": "Management alter Jahrgänge mit Authentifizierungs-Systemen"}, {"title": "Weinkultur-Events", "description": "Integriertes Event-Management für Tastings und Weinmessen"}], "problems": [{"title": "Rheingau-Komplexität", "description": "Hunderte von Einzellagen erfordern tiefes Wissen"}, {"title": "Mosel vs. Rheingau Verwirrung", "description": "Gäste verwechseln regionale Charakteristiken"}, {"title": "Alte Jahrgänge-Verwaltung", "description": "Speicherung und Authentifizierung von historischen Weinen ist komplex"}, {"title": "Sommelier-Knappheit", "description": "Hochqualifiziertes Personal ist schwer zu finden in Mainz"}, {"title": "Event-Verwaltung parallel zu Betrieb", "description": "Komplexe Koordination von Tastings neben Restaurantbetrieb"}], "city_name": "Mainz", "ticket_medio": "55-110€"}'::jsonb,
  '[{"q": "Wie katalogisieren Sie Rheingau-Einzellagen?", "a": "System mit 183 klassifizierten Einzellagen plus Qualitäts- und Geschmacksprofilen"}, {"q": "Bieten Sie Altwein-Management?", "a": "Ja, spezialisiertes System mit Authentifizierung, Lagerbedingungen und Provenance-Tracking"}, {"q": "Welche Event-Features gibt es?", "a": "Tasting-Management, Gast-Verwaltung, Menü-Integration und Verkaufsberichte für Events"}]'::jsonb,
  '["weinkarten-software-wiesbaden", "weinkarten-software-heidelberg", "weinkarten-software-koblenz"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'weinkarten-software-wiesbaden',
  'city',
  'de',
  'Weinkarten-Software in Wiesbaden | Winerim',
  'Intelligente Weinkartenverwaltung in Wiesbaden. Optimal für Rheingau-Fokus und gehobene Küche.',
  'Wiesbaden, Deutschland',
  'Weinkarten-Software für Restaurants in Wiesbaden',
  'Winerim in Rheingaus eleganter Schwesternstadt',
  'Demo anfordern',
  '/demo',
  'Meine Weinkarte analysieren',
  '/analisis-carta',
  '{"intro": "Wiesbaden, als wohlhabende Spa-Stadt, zieht Gäste mit hohem kulturellem und kulinarischem Anspruch an. Restaurants in Wiesbaden müssen Premium-Weinkarten mit Rheingau-Spezialisierung bieten. Winerim bietet Intelligence-gestützte Lösungen.", "stats": [{"label": "Umsatzsteigerung", "value": "+31%"}, {"label": "Premium-Restaurants", "value": "120+"}, {"label": "Kundenzufriedenheit", "value": "4.9/5"}], "country": "Deutschland", "features": [{"title": "Rheingau-Tiefenwissen", "description": "Katalogisierung aller Premium-Produzenten mit Lagen-Spezialisierung"}, {"title": "Riesling-Klassifizierung", "description": "Automatische Empfehlungen basierend auf Süße und Säure-Profilen"}, {"title": "VIP-Kundenverwaltung", "description": "CRM-System für Stamm-Gäste mit persönlichen Weinen"}, {"title": "Michelin-Menü-Integration", "description": "Spezielle Module für gehobene Küche und Pairing-Planung"}], "problems": [{"title": "Hohe Erwartungen anspruchsvoller Klientel", "description": "Wiesbaden-Gäste erwarten Michelin-Standard-Wissen"}, {"title": "Riesling-Süße-Verwirrung", "description": "Gäste wissen oft nicht, welche Trockenheit sie bevorzugen"}, {"title": "Management von VIP-Preferenzen", "description": "Stammgäste haben sehr spezifische Weinanforderungen"}, {"title": "Sommelier-Retentionsproblem", "description": "Top-Talente wandern zu Michelin-Restaurants ab"}, {"title": "Pairing-Komplexität", "description": "Moderne Küche mit traditionellen Weinen zu harmonisieren ist anspruchsvoll"}], "city_name": "Wiesbaden", "ticket_medio": "65-130€"}'::jsonb,
  '[{"q": "Wie helfen Sie mit Riesling-Verwirrung?", "a": "System mit interaktivem Trockenheits-Finder und automatischen Empfehlungen basierend auf Gast-Profil"}, {"q": "Bieten Sie VIP-Management?", "a": "Ja, CRM-integriertes System mit Trinkgeschichte, Favoriten und Benachrichtigungen"}, {"q": "Unterstützen Sie Michelin-Restaurants?", "a": "Ja, spezialisierte Lösungen mit Pairing-Tools und gehobener Analytik"}]'::jsonb,
  '["weinkarten-software-mainz", "weinkarten-software-heidelberg", "weinkarten-software-bad-homburg"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'weinkarten-software-wuerzburg',
  'city',
  'de',
  'Weinkarten-Software in Würzburg | Winerim',
  'Fränkische Weinkarten-Lösungen in Würzburg. Spezialisiert auf Silvaner und regionale Spezialitäten.',
  'Würzburg, Deutschland',
  'Weinkarten-Software für Restaurants in Würzburg',
  'Silvaner-Meisterschaft in Frankens Zentrum',
  'Demo anfordern',
  '/demo',
  'Meine Weinkarte analysieren',
  '/analisis-carta',
  '{"intro": "Würzburg ist die Hauptstadt fränkischer Weinkultur. Restaurants in Würzburg haben die Verantwortung, Silvaner und fränkische Qualität authentisch zu präsentieren. Winerim bietet spezialisierte Lösungen für regionale Weinautorität.", "stats": [{"label": "Silvaner-Verkauf", "value": "+35%"}, {"label": "Weingut-Partner", "value": "95+"}, {"label": "Kundenzufriedenheit", "value": "4.8/5"}], "country": "Deutschland", "features": [{"title": "Silvaner-Meister", "description": "Vollständige Katalogisierung mit Geschmacksprofil-Datenbank"}, {"title": "Fränkische Spezialitäten", "description": "Expertise in regionalen Sorten wie Müller-Thurgau und Scheurebe"}, {"title": "Weingut-Netzwerk", "description": "Integration mit fränkischen Familien-Weingütern"}, {"title": "Terroir-Bildung", "description": "Automatisierte Schulungsmaterialien für Silvaner-Präsentation"}], "problems": [{"title": "Silvaner ist global unterschätzt", "description": "Internationale Gäste kennen Silvaner nicht oder unterschätzen die Qualität"}, {"title": "Kleine Weingut-Kommunikation", "description": "Viele fränkische Weingüter sind traditionell und technologisch nicht versiert"}, {"title": "Komplexe regionale Klassifizierung", "description": "Franken hat einzigartige Klassifizierungssysteme"}, {"title": "Saisonale Schwankungen", "description": "Tourismus und Weinfeste beeinflussen Verkaufsmuster dramatisch"}, {"title": "Personal-Schulung auf Silvaner", "description": "Schwerigkeiten, Personal auf Silvaner-Qualität zu schulen"}], "city_name": "Würzburg", "ticket_medio": "40-85€"}'::jsonb,
  '[{"q": "Wie vermitteln Sie Silvaner-Qualität?", "a": "System mit Geschmacksprofilen, Terroir-Erklärungen und Paarungsempfehlungen speziell für Silvaner"}, {"q": "Können Sie mit kleinen Weingütern arbeiten?", "a": "Ja, vereinfachte Integration mit traditionellen Weingütern für Bestandsverwaltung und Events"}, {"q": "Bieten Sie Franken-Spezialisierung?", "a": "Ja, vollständige Expertise in fränkischen Sorten, Klassifizierung und Terroir"}]'::jsonb,
  '["weinkarten-software-nuernberg", "weinkarten-software-bamberg", "weinkarten-software-kitzingen"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'weinkarten-software-regensburg',
  'city',
  'de',
  'Weinkarten-Software in Regensburg | Winerim',
  'Weinkartenverwaltung für Restaurants in Regensburg. Spezialisiert auf bayerische Weine.',
  'Regensburg, Deutschland',
  'Weinkarten-Software für Restaurants in Regensburg',
  'Bayerische Weinkultur intelligent verwaltet',
  'Demo anfordern',
  '/demo',
  'Meine Weinkarte analysieren',
  '/analisis-carta',
  '{"intro": "Regensburg, UNESCO-Welterbestadt, zieht Gäste mit kulturellem Anspruch an. Restaurants in Regensburg benötigen spezialisierte Lösungen für bayerische Weine und regionale Besonderheiten. Winerim bietet Expertise mit Fokus auf traditionelle Qualität.", "stats": [{"label": "Verkaufswachstum", "value": "+25%"}, {"label": "Aktive Restaurants", "value": "145+"}, {"label": "Effizienzgewinne", "value": "+62%"}], "country": "Deutschland", "features": [{"title": "Bayerische Wein-Datenbank", "description": "Spezialisierung auf Weine aus Franken und südbayrischen Regionen"}, {"title": "Regionale Integration", "description": "Verbindung mit lokalen Weingütern und Kellereien"}, {"title": "Traditionelle-Moderne Balance", "description": "System für Mischung aus traditionellen und experimentellen Weinen"}, {"title": "Tourismusanalytics", "description": "Verkaufsberichte nach Gast-Herkunft und Saison"}], "problems": [{"title": "Bayerische Weine werden unterschätzt", "description": "Internationale Gäste konzentrieren sich auf Rheingau/Mosel"}, {"title": "Kleine Weingüter-Verwaltung", "description": "Viele bayerische Weingüter haben begrenzte Produktionsmengen"}, {"title": "Kulturelle Erwartungen", "description": "UNESCO-Stadt erwartet höheres Niveau in Weinkarten"}, {"title": "Saisonale Tourismusflüsse", "description": "Regensburger Tourismus folgt internationalen Mustern"}, {"title": "Schulung für Qualität", "description": "Personal braucht Wissen über bayerische Qualitätsstandards"}], "city_name": "Regensburg", "ticket_medio": "42-85€"}'::jsonb,
  '[{"q": "Wie präsentieren Sie bayerische Weine positiv?", "a": "System mit Qualitäts-Fokus-Beschreibungen und internationalen Paarungsbeispielen"}, {"q": "Können Sie mit lokalen Weingütern kooperieren?", "a": "Ja, spezialisierte Partnerschafts-Tools für bayerische Familien-Weingüter"}, {"q": "Bieten Sie Gast-Analytik nach Herkunft?", "a": "Ja, Berichte zeigen Verkaufsmuster nach Gast-Nationalität und Saison"}]'::jsonb,
  '["weinkarten-software-passau", "weinkarten-software-ansbach", "weinkarten-software-landshut"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'weinkarten-software-trier',
  'city',
  'de',
  'Weinkarten-Software in Trier | Winerim',
  'Weinkartenverwaltung in Trier. Spezialisiert auf Mosel-Weine und Riesling-Qualität.',
  'Trier, Deutschland',
  'Weinkarten-Software für Restaurants in Trier',
  'Mosel-Expertise direkt von der Quelle',
  'Demo anfordern',
  '/demo',
  'Meine Weinkarte analysieren',
  '/analisis-carta',
  '{"intro": "Trier ist das Herz der Moselweinregion. Restaurants in Trier haben direkte Verbindung zu Riesling-Produzenten. Winerim bietet spezialisierte Lösungen mit Fokus auf Mosel-Authentizität und direkte Weingut-Integration.", "stats": [{"label": "Riesling-Verkauf", "value": "+32%"}, {"label": "Weingut-Partner", "value": "75+"}, {"label": "Direktvertrieb", "value": "+28%"}], "country": "Deutschland", "features": [{"title": "Mosel-Lagenkarte", "description": "Vollständige Katalogisierung mit Terroir und Klimaprofilen"}, {"title": "Riesling-Expertise", "description": "Spezialisierung in Qualitätsstufen und Säure-Profile"}, {"title": "Direkte Weingut-Integration", "description": "Automatische Bestandsverwaltung mit lokalen Produzenten"}, {"title": "Verbraucherfestival-Management", "description": "Tools für Weinfest-Saison und Veranstaltungen"}], "problems": [{"title": "Mosel wird global unterschätzt", "description": "Gäste denken Mosel = einfach/leicht, verstehen nicht die Komplexität"}, {"title": "Säure-Wahrnehmung", "description": "Hohe Säure in Mosel-Riesling wird oft als Fehler interpretiert"}, {"title": "Kleine Produzenten-Vielfalt", "description": "Tausende von Mosel-Produzenten, viele mit begrenztem Output"}, {"title": "Saisonale Weinfest-Verwaltung", "description": "Mosel-Weinfeste bringen extreme Anstiege im Geschäftsvolumen"}, {"title": "Direktvertrieb-Koordination", "description": "Komplexe Verwaltung mit vielen verschiedenen Weingütern"}], "city_name": "Trier", "ticket_medio": "40-80€"}'::jsonb,
  '[{"q": "Wie erklären Sie hohe Säure in Mosel-Riesling?", "a": "System mit Verkostungs-Tipps, Paarungsempfehlungen und Säure-Profil-Erklärungen für Gäste"}, {"q": "Können Sie mit Mosel-Weingütern direkt arbeiten?", "a": "Ja, automatische Bestandsverwaltung und Bestellverwaltung mit lokalen Produzenten"}, {"q": "Bieten Sie Weinfest-Unterstützung?", "a": "Ja, spezialisierte Tools für Saisonspitzen mit Großmengen-Management und Verkaufsanalytics"}]'::jsonb,
  '["weinkarten-software-koblenz", "weinkarten-software-bernkastel-kues", "weinkarten-software-cochem"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'weinkarten-software-konstanz',
  'city',
  'de',
  'Weinkarten-Software in Konstanz | Winerim',
  'Weinkartenverwaltung am Bodensee. Spezialisiert auf Baden-Weine und internationale Qualität.',
  'Konstanz, Deutschland',
  'Weinkarten-Software für Restaurants in Konstanz',
  'Bodensee-Excellence in Weinkuration',
  'Demo anfordern',
  '/demo',
  'Meine Weinkarte analysieren',
  '/analisis-carta',
  '{"intro": "Konstanz, charmante Bodensee-Stadt, zieht Urlauber und Geschäftsreisende an. Restaurants in Konstanz müssen internationales Niveau bieten mit Baden-Wein-Fokus. Winerim bietet spezialisierte Lösungen für Tourismus-Premium-Gastronomie.", "stats": [{"label": "Touristen-Zufriedenheit", "value": "+28%"}, {"label": "Restaurants", "value": "110+"}, {"label": "Verkaufskonversion", "value": "+29%"}], "country": "Deutschland", "features": [{"title": "Baden-Wein-Basis", "description": "Katalogisierung der Bodensee-Baden-Subregion mit Terroir"}, {"title": "Internationale Qualität", "description": "Datenbank mit europäischen und außereuropäischen Premiumweinen"}, {"title": "Klimatische Integration", "description": "Automatische Sommer-/Winter-Empfehlungen für See-Region"}, {"title": "Mehrsprachige Beschreibungen", "description": "Deutsch, Englisch, Französisch, Italienisch für Touristen"}], "problems": [{"title": "Heterogene Gast-Basis", "description": "Deutsche, Schweizer und internationale Gäste mit verschiedenen Erwartungen"}, {"title": "Baden-Weine sind in Konstanz unterschätzt", "description": "Touristen denken automatisch an importierte Weine"}, {"title": "Bodensee-Spezialweine schwer zu verwalten", "description": "Kleine lokale Bodensee-Produzenten mit begrenztem Output"}, {"title": "Saisonale Tourismusflüsse", "description": "Konstanz hat extreme Sommer/Winter-Unterschiede"}, {"title": "Personalsprachenfähigkeit", "description": "Sommelier mit Fremdsprachenfähigkeit ist schwer zu finden"}], "city_name": "Konstanz", "ticket_medio": "50-100€"}'::jsonb,
  '[{"q": "Wie präsentieren Sie Baden-Weine für Touristen?", "a": "Mehrsprachige Beschreibungen mit Qualitäts-Fokus und internationalen Paarungsbeispielen"}, {"q": "Unterstützen Sie andere Sprachen?", "a": "Ja, Deutsch, Englisch, Französisch und Italienisch für Gast-Beschreibungen und Team-Training"}, {"q": "Wie handhaben Sie saisonale Schwankungen?", "a": "System mit konfigurierbaren Cartes nach Saison und automatischen Empfehlungen nach Jahreszeit"}]'::jsonb,
  '["weinkarten-software-freiburg", "weinkarten-software-baden-baden", "weinkarten-software-basel-region"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'weinkarten-software-baden-baden',
  'city',
  'de',
  'Weinkarten-Software in Baden-Baden | Winerim',
  'Premium-Weinkartenverwaltung in Baden-Baden. Spezialisiert auf gehobene Kurorte-Gastronomie.',
  'Baden-Baden, Deutschland',
  'Weinkarten-Software für Restaurants in Baden-Baden',
  'Luxus-Weinkuration für die eleganteste Stadt',
  'Demo anfordern',
  '/demo',
  'Meine Weinkarte analysieren',
  '/analisis-carta',
  '{"intro": "Baden-Baden ist Deutschlands elegantester Kurort mit anspruchsvollster Klientel. Restaurants in Baden-Baden müssen Premium-Weinkarten mit internationaler Reputation bieten. Winerim bietet White-Glove-Lösungen für Luxury-Gastronomie.", "stats": [{"label": "Premium-Restaurants", "value": "85+"}, {"label": "Michelin-Sterne", "value": "12+"}, {"label": "Kundenzufriedenheit", "value": "4.9/5"}], "country": "Deutschland", "features": [{"title": "Raritäten-Management", "description": "Spezialisiertes System für alte Jahrgänge und rare Flaschen"}, {"title": "Sommelier-Werkzeuge", "description": "Premium-Analytik für gehobene Sommelier-Arbeit"}, {"title": "VIP-Verwaltung", "description": "Dediziertes CRM für Stammgäste mit Vorlieben-Tracking"}, {"title": "Michelin-Integration", "description": "Menü-Pairing-Tools für Michelin-Restaurants"}], "problems": [{"title": "Erwartet Michelin-Standard-Wissen", "description": "Baden-Baden-Gäste sind kulinarisch sehr versiert"}, {"title": "Raritäten-Verwaltung komplex", "description": "Authentifizierung und Lagerbedingungen sind kritisch"}, {"title": "VIP-Erwartungen sehr hoch", "description": "Stammgäste haben extreme Spezialisierungserwartungen"}, {"title": "Sommelier-Retention-Problem", "description": "Top-Talente werden zu renommiertesten Restaurants abgeworben"}, {"title": "Konstant evolvierende Standards", "description": "Gäste erwarten ständig aktualisierte und verbesserte Angebote"}], "city_name": "Baden-Baden", "ticket_medio": "85-180€"}'::jsonb,
  '[{"q": "Wie managen Sie Raritäten?", "a": "Spezialisiertes System mit Provenance-Tracking, Authentifizierung und Lagerverwaltung"}, {"q": "Bieten Sie Michelin-Pairing?", "a": "Ja, spezialisierte Tools für Menü-Pairing, Weingangabfolge und Kostenpräsentation"}, {"q": "Was ist mit VIP-Management?", "a": "Umfassendes CRM mit Trinkgeschichte, Favoriten, Familie-Benachrichtigungen und white-glove Service"}]'::jsonb,
  '["weinkarten-software-heidelberg", "weinkarten-software-freiburg", "weinkarten-software-konstanz"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'weinkarten-software-bonn',
  'city',
  'de',
  'Weinkarten-Software in Bonn | Winerim',
  'Intelligente Weinkartenverwaltung in Bonn. Spezialisiert auf Rheingau-Weine und Politik-Gastronomie.',
  'Bonn, Deutschland',
  'Weinkarten-Software für Restaurants in Bonn',
  'Diplomatische Exzellenz in Weinkuration',
  'Demo anfordern',
  '/demo',
  'Meine Weinkarte analysieren',
  '/analisis-carta',
  '{"intro": "Bonn, Beethovens Stadt und ehemalige Bundeshauptstadt, zieht anspruchsvolle Gäste an. Restaurants in Bonn brauchen Rheingau-Spezialisierung und Diplomatische-Event-Unterstützung. Winerim bietet spezialisierte Lösungen für gehobene Geschäfts-Gastronomie.", "stats": [{"label": "Business-Events", "value": "+24%"}, {"label": "Premium-Restaurants", "value": "95+"}, {"label": "Großbankett-Wachstum", "value": "+31%"}], "country": "Deutschland", "features": [{"title": "Rheingau-Expertise", "description": "Vollständige Lagenkataloge mit Qualitäts-Fokus"}, {"title": "Event-Management", "description": "Spezialisierte Tools für diplomatische Bankette"}, {"title": "Großmengen-Planung", "description": "Kalkulatoren für 50-500+ Personen-Events"}, {"title": "Multinational-Support", "description": "Beschreibungen in 8+ Sprachen für internationale Gäste"}], "problems": [{"title": "Business-Event-Management kompliziert", "description": "Viele Events mit unterschiedlichen Anforderungen"}, {"title": "Diplomatische Sensibilität", "description": "Gäste aus verschiedenen Ländern mit verschiedenen Vorlieben"}, {"title": "Großmengen-Koordination schwer", "description": "Logistik für 100+ Personen ist extrem komplex"}, {"title": "Rheingau-Vielfalt überwältigend", "description": "Hunderte von Produzenten und Lagen"}, {"title": "Sprachliche Vielfalt erforderlich", "description": "Internationale Gäste sprechen verschiedene Sprachen"}], "city_name": "Bonn", "ticket_medio": "55-115€"}'::jsonb,
  '[{"q": "Wie unterstützen Sie Großbankette?", "a": "Spezialisierte Tools mit Menü-Integration, Kosten-Kalkulation und Logistik-Planung für bis zu 500 Gäste"}, {"q": "Welche Sprachoptionen?", "a": "8+ Sprachen inklusive Deutsch, Englisch, Französisch, Spanisch, Italienisch, Russisch, Chinesisch, Arabisch"}, {"q": "Bieten Sie Rheingau-Expertise?", "a": "Ja, vollständige Kataloge mit Terroir-Informationen und Paarungsempfehlungen"}]'::jsonb,
  '["weinkarten-software-koeln", "weinkarten-software-duesseldorf", "weinkarten-software-mainz"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'weinkarten-software-augsburg',
  'city',
  'de',
  'Weinkarten-Software in Augsburg | Winerim',
  'Weinkartenverwaltung in Augsburg. Spezialisiert auf schwäbische und bayerische Weine.',
  'Augsburg, Deutschland',
  'Weinkarten-Software für Restaurants in Augsburg',
  'Schwäbische Weinkultur professionell verwaltet',
  'Demo anfordern',
  '/demo',
  'Meine Weinkarte analysieren',
  '/analisis-carta',
  '{"intro": "Augsburg, mit 2000-jähriger Geschichte und reicher Gastronomie, benötigt spezialisierte Lösungen für schwäbische und bayerische Weine. Restaurants in Augsburg sollten regionale Qualität mit modernem Management kombinieren. Winerim bietet beides.", "stats": [{"label": "Regionale Wein-Verkäufe", "value": "+23%"}, {"label": "Aktive Restaurants", "value": "125+"}, {"label": "Effizienzgewinne", "value": "+59%"}], "country": "Deutschland", "features": [{"title": "Schwäbische Spezialisierung", "description": "Expertise in Württemberg und lokalen Sorten"}, {"title": "Bayerische Integration", "description": "Verbindung mit bayerischen Nachbarregionen"}, {"title": "Historische Restaurants", "description": "Spezialisierte Tools für traditionelle Augsburger Etablissements"}, {"title": "Regionale Weingut-Netzwerk", "description": "Integration mit lokalen Produzenten"}], "problems": [{"title": "Schwäbische Weine werden global unterschätzt", "description": "Internationale Gäste konzentrieren sich auf bekannte Regionen"}, {"title": "Traditionelle Restaurantkultur", "description": "Viele alte Gasthöfe mit manuellen Systemen"}, {"title": "Regionale Produzen-Vielfalt", "description": "Hunderte von kleinen Weingütern erfordern spezialisierte Verwaltung"}, {"title": "Historf-Modernisierungs-Balance", "description": "Tradition bewahren bei gleichzeitiger Modernisierung"}, {"title": "Personal-Schulung schwierig", "description": "Ältere Mitarbeiter haben oft keine technische Affinität"}], "city_name": "Augsburg", "ticket_medio": "40-80€"}'::jsonb,
  '[{"q": "Wie präsentieren Sie schwäbische Weine?", "a": "System mit Quality-Fokus-Beschreibungen und historischen Kontext für Augsburger Gastronomie-Tradition"}, {"q": "Können Sie mit traditionellen Gasthöfen arbeiten?", "a": "Ja, einsteigerfreundliche Schnittstelle speziell für ältere Restaurants ohne IT-Erfahrung"}, {"q": "Bieten Sie Schulung für älteres Personal?", "a": "Ja, dedizierte Schulungsprogramme mit Papier-Checklisten und Video-Tutorials"}]'::jsonb,
  '["weinkarten-software-muenchen", "weinkarten-software-ingolstadt", "weinkarten-software-landsberg"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'weinkarten-software-kiel',
  'city',
  'de',
  'Weinkarten-Software in Kiel | Winerim',
  'Weinkartenverwaltung in Kiel. Spezialisiert auf norddeutsche Weine und internationale Qualität.',
  'Kiel',
  'Weinkarten-Software für Restaurants in Kiel',
  'Nördliche Exzellenz in Weinkuration',
  'Demo anfordern',
  '/demo',
  'Meine Weinkarte analysieren',
  '/analisis-carta',
  '{"intro": "Kiel, Hafenstadt an der Ostsee, hat einzigartige kulinarische Anforderungen. Restaurants in Kiel brauchen spezialisierte Lösungen für Meeresfrüchte-Pairings und internationale Weine. Winerim bietet spezialisierte Tools für Küsten-Gastronomie.", "stats": [{"label": "Meeresfrüchte-Pairings", "value": "+27%"}, {"label": "Restaurants", "value": "85+"}, {"label": "Kundenzufriedenheit", "value": "4.7/5"}], "country": "Deutschland", "features": [{"title": "Fisch-Pairing-Spezialisierung", "description": "Automatische Empfehlungen für Ostsee-Spezialitäten"}, {"title": "Rheingau-Katalog", "description": "Weiß-Wein-Fokus mit Riesling-Expertise"}, {"title": "Internationale Qualitäts-Basis", "description": "Datenbank mit europäischen und weltweiten Premiumweinen"}, {"title": "Tourismus-Integration", "description": "Analytik für Bootsfahrer und Hafentouristen"}], "problems": [{"title": "Meeresfrüchte-Pairing komplex", "description": "Ostsee-Spezialitäten erfordern spezialisierte Empfehlungen"}, {"title": "Touristische Saisonalität", "description": "Extreme Sommer-/Winter-Unterschiede in Besucheraufkommen"}, {"title": "Internationale Gast-Basis", "description": "Viele Segler und Touristen mit verschiedenen Erwartungen"}, {"title": "Fisch-Frische und Weinpaarung", "description": "Tagesangebot ändert sich, aber Weinkarten bleiben statisch"}, {"title": "Personal mit Fachkompetenz", "description": "Schwierig, Sommeliers mit Fisch-Pairing-Expertise zu finden"}], "city_name": "Kiel", "ticket_medio": "45-90€"}'::jsonb,
  '[{"q": "Wie funktioniert Meeresfrüchte-Pairing?", "a": "System mit Datenbank von Ostsee-Spezialitäten und automatischen Wein-Empfehlungen pro Fischsorte"}, {"q": "Können Sie tägliche Fisch-Änderungen abbilden?", "a": "Ja, flexible Schnittstelle mit Echtzeit-Updates für Tagesangebote und entsprechende Wein-Vorschläge"}, {"q": "Bieten Sie Tourismus-Analytik?", "a": "Ja, Berichte zu Gast-Herkunft (Segler, Touristen) mit saisonalen Mustern"}]'::jsonb,
  '["weinkarten-software-luebeck", "weinkarten-software-hamburg", "weinkarten-software-kappeln"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'weinkarten-software-luebeck',
  'city',
  'de',
  'Weinkarten-Software in Lübeck | Winerim',
  'Intelligente Weinkartenverwaltung in Lübeck. Spezialisiert auf gehobene baltische Gastronomie.',
  'Lübeck, Deutschland',
  'Weinkarten-Software für Restaurants in Lübeck',
  'Hansestadt-Exzellenz in Weinkuration',
  'Demo anfordern',
  '/demo',
  'Meine Weinkarte analysieren',
  '/analisis-carta',
  '{"intro": "Lübeck, UNESCO-Welterbestadt und kulturelle Hansestadt, zieht wohlhabende und kultivierte Gäste an. Restaurants in Lübeck müssen gehobene Weinkarten mit historischer Authentizität bieten. Winerim bietet spezialisierte Premium-Lösungen.", "stats": [{"label": "Premium-Restaurants", "value": "65+"}, {"label": "Kulturelle Events", "value": "+35%"}, {"label": "Kundenzufriedenheit", "value": "4.8/5"}], "country": "Deutschland", "features": [{"title": "Hansestadt-Prestige", "description": "Tools für gehobene Restaurants mit kulturellem Anspruch"}, {"title": "Marzipan-Pairing", "description": "Unique-Funktion für berühmtes Lübecker Marzipan mit Dessert-Weinen"}, {"title": "Kulturelle Event-Integration", "description": "Management von Gourmet-Events und Kulturveranstaltungen"}, {"title": "Historische Weinkarten", "description": "Archive älterer Weinkarten für Restauration historischer Restaurants"}], "problems": [{"title": "Kulturelle Erwartungen sehr hoch", "description": "UNESCO-Welterbe-Status bedeutet extrem anspruchsvolle Klientel"}, {"title": "Historische Authentizität bewahren", "description": "Modernisierung darf traditionelle Identität nicht zerstören"}, {"title": "Marzipan-Pairing ist einzigartig", "description": "Keine Standard-Datenbanken für Marzipan-Harmonie"}, {"title": "Kulturelle Event-Verwaltung", "description": "Viele Veranstaltungen mit speziellem Weinprogramm"}, {"title": "Sommelier-Qualität kritisch", "description": "Gäste erwarten höchstes Sommelier-Wissen"}], "city_name": "Lübeck", "ticket_medio": "60-125€"}'::jsonb,
  '[{"q": "Wie funktioniert Marzipan-Pairing?", "a": "Einzigartige Funktion mit Dessert-Weinen speziell für Lübecker Marzipan-Tradition"}, {"q": "Können Sie kulturelle Events managen?", "a": "Ja, spezialisierte Tools für Gourmet-Events, Kammermusik-Diners und kulturelle Anlässe"}, {"q": "Gibt es Archive für historische Restaurants?", "a": "Ja, Archiv-Funktion zur Verwaltung und Restauration älterer Weinkarten mit historischen Daten"}]'::jsonb,
  '["weinkarten-software-hamburg", "weinkarten-software-kiel", "weinkarten-software-rostock"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'weinkarten-software-rostock',
  'city',
  'de',
  'Weinkarten-Software in Rostock | Winerim',
  'Weinkartenverwaltung in Rostock. Spezialisiert auf Ostsee-Tourismus und gehobene Küche.',
  'Rostock',
  'Weinkarten-Software für Restaurants in Rostock',
  'Hafenstadt-Qualität in Weinkuration',
  'Demo anfordern',
  '/demo',
  'Meine Weinkarte analysieren',
  '/analisis-carta',
  '{"intro": "Rostock, wieder aufgebaute Hafenstadt an der Ostsee, hat modernes Gastronomie-Potenzial. Restaurants in Rostock brauchen Lösungen für Tourismus-Gastronomie und Meeresfrüchte-Pairings. Winerim bietet spezialisierte Tools für Wachstum.", "stats": [{"label": "Tourismus-Wachstum", "value": "+26%"}, {"label": "Aktive Restaurants", "value": "72+"}, {"label": "Effizienzgewinne", "value": "+61%"}], "country": "Deutschland", "features": [{"title": "Tourismus-Fokus", "description": "Analytics für Besucherzahlen und Nationalitäten"}, {"title": "Fisch-Pairing-Datenbank", "description": "Ostsee-Spezialitäten mit automatischen Empfehlungen"}, {"title": "Mehrsprachige Schnittstelle", "description": "Deutsch, Englisch, Skandinavisch für internationale Gäste"}, {"title": "Event-Management", "description": "Tools für Schiff-Events und Hafentourismus"}], "problems": [{"title": "Rapides Tourismus-Wachstum", "description": "Rostock wächst schnell, aber Infrastruktur hinkt hinterher"}, {"title": "Gast-Heterogenität", "description": "Schiffs-Touristen, Geschäftsreisende und Urlauber mit unterschiedlichen Erwartungen"}, {"title": "Meeresfrüchte-Frische", "description": "Tagesangebote ändern sich, statische Weinkarten sind ungeeignet"}, {"title": "Sprachliche Vielfalt", "description": "Skandinavische Gäste haben andere Erwartungen als Deutsche"}, {"title": "Personal mit Expertise", "description": "Schwer, Sommelier mit Ostsee-Spezialitäts-Wissen zu finden"}], "city_name": "Rostock", "ticket_medio": "45-90€"}'::jsonb,
  '[{"q": "Wie managen Sie Tourismus-Dynamik?", "a": "Analytics-Dashboard mit Besucherzahlen nach Herkunft und saisonalen Mustern"}, {"q": "Bieten Sie Skandinavische Sprachunterstützung?", "a": "Ja, Deutsch, Englisch, Schwedisch, Norwegisch und Dänisch für internationale Gäste"}, {"q": "Funktioniert tägliche Menü-Änderung?", "a": "Ja, einfache Echtzeit-Updates für Tagesangebote mit automatischen Wein-Empfehlungen"}]'::jsonb,
  '["weinkarten-software-luebeck", "weinkarten-software-kiel", "weinkarten-software-wismar"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'weinkarten-software-potsdam',
  'city',
  'de',
  'Weinkarten-Software in Potsdam | Winerim',
  'Intelligente Weinkartenverwaltung in Potsdam. Spezialisiert auf gehobene Berlin-Region Gastronomie.',
  'Potsdam',
  'Weinkarten-Software für Restaurants in Potsdam',
  'Preußische Eleganz in moderner Weinkuration',
  'Demo anfordern',
  '/demo',
  'Meine Weinkarte analysieren',
  '/analisis-carta',
  '{"intro": "Potsdam, Stadt der Schlösser und preußischen Eleganz, hat anspruchsvolle kulinarische Erwartungen. Restaurants in Potsdam brauchen gehobene Weinkarten für Berlin-Region Tourismus. Winerim bietet spezialisierte Premium-Lösungen.", "stats": [{"label": "Gehobene Restaurants", "value": "80+"}, {"label": "Tourismus-Fokus", "value": "+28%"}, {"label": "Kundenzufriedenheit", "value": "4.8/5"}], "country": "Deutschland", "features": [{"title": "Preußische Kultur-Integration", "description": "Spezialisierte Beschreibungen für historische Restaurants"}, {"title": "Berlin-Region Expertise", "description": "Datenbank mit Berlin-Brandenburg Weinanbau und Imports"}, {"title": "Schloss-Event-Management", "description": "Tools für Gourmet-Events in historischen Venues"}, {"title": "Internationale VIP-Verwaltung", "description": "Premium-CRM für politische und kulturelle Gäste"}], "problems": [{"title": "Historische Authentizität bewahren", "description": "Modernisierung darf preußische Eleganz nicht zerstören"}, {"title": "Schloss-Venues sind spezialisiert", "description": "Event-Verwaltung in historischen Gebäuden ist komplex"}, {"title": "Internationale VIP-Gäste", "description": "Sehr hohe Erwartungen von prominenten und politischen Personen"}, {"title": "Berliner Nähe", "description": "Konkurrenz mit Berlin ist extrem intensiv"}, {"title": "Sommelier-Talente verloren", "description": "Top-Profis werden zu Berlin-Michelin-Restaurants abgeworben"}], "city_name": "Potsdam", "ticket_medio": "65-135€"}'::jsonb,
  '[{"q": "Wie unterstützen Sie Schloss-Events?", "a": "Spezialisierte Tools für historische Venues mit Menü-Integration, Kostenpräsentation und Logistik"}, {"q": "Bieten Sie VIP-Management?", "a": "Ja, Premium-CRM mit Diskretions-Features für politische und kulturelle Gäste"}, {"q": "Können Sie Sommelier-Wechsel managen?", "a": "Ja, Systembasis-Dokumentation ermöglicht schnelle Onboarding und Kontinuität"}]'::jsonb,
  '["weinkarten-software-berlin", "weinkarten-software-leipzig", "weinkarten-software-bad-saarow"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'weinkarten-software-weimar',
  'city',
  'de',
  'Weinkarten-Software in Weimar | Winerim',
  'Weinkartenverwaltung in Weimar. Spezialisiert auf Kultur-Gastronomie und klassische Eleganz.',
  'Weimar',
  'Weinkarten-Software für Restaurants in Weimar',
  'Goethes Stadt: Weinkuration mit Klassik-Anspruch',
  'Demo anfordern',
  '/demo',
  'Meine Weinkarte analysieren',
  '/analisis-carta',
  '{"intro": "Weimar, Deutschlands Kulturhauptstadt mit Goethe und Schiller, zieht Klassik-Liebhaber an. Restaurants in Weimar brauchen gehobene Weinkarten, die klassische Eleganz widerspiegeln. Winerim bietet Lösungen für Kultur-Gastronomie.", "stats": [{"label": "Kulturelle Events", "value": "+32%"}, {"label": "Restaurants", "value": "55+"}, {"label": "Kundenzufriedenheit", "value": "4.7/5"}], "country": "Deutschland", "features": [{"title": "Klassisches Deutschland", "description": "Spezialisierte Weinkarten für klassischen Geschmack"}, {"title": "Event-Management", "description": "Tools für Goethe-Jubiläen und Kulturveranstaltungen"}, {"title": "Historische Dokumentation", "description": "Archive für Restauration klassischer Weinkarten"}, {"title": "Künstler-Engagement", "description": "Integration mit Kulturprogramm und Künstler-Netzwerk"}], "problems": [{"title": "Klassische Erwartungshaltung", "description": "Gäste erwarten Verbindung zu klassischen Weinen und Goethe-Ära"}, {"title": "Kulturelle Events sind komplex", "description": "Viele Veranstaltungen mit speziellem Kontext erfordern Spezialisierung"}, {"title": "Kleine Restaurantszene", "description": "Weimar ist kleiner Markt mit begrenztem Volumen"}, {"title": "Tourist-Mix heterogen", "description": "Kultur-Touristen vs. Geschäftsreisende mit verschiedenen Erwartungen"}, {"title": "Sommelier-Knappheit", "description": "Schwer, klassisch-geschulte Sommeliers zu finden"}], "city_name": "Weimar", "ticket_medio": "45-95€"}'::jsonb,
  '[{"q": "Wie integrieren Sie Kulturprogramm?", "a": "Kalender-Integration mit Goethe-Zentrum Events und automatische Empfehlungen für Kulturveranstaltungen"}, {"q": "Bieten Sie Historische Archive?", "a": "Ja, Archiv-Funktion zur Dokumentation und Restauration klassischer Weinkarten"}, {"q": "Können Sie Künstler-Engagement unterstützen?", "a": "Ja, Tools für Künstler-Netzwerk-Integration und Event-Planung mit kulturellem Fokus"}]'::jsonb,
  '["weinkarten-software-erfurt", "weinkarten-software-leipzig", "weinkarten-software-jena"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'weinkarten-software-bamberg',
  'city',
  'de',
  'Weinkarten-Software in Bamberg | Winerim',
  'Fränkische Weinkartenverwaltung in Bamberg. Spezialisiert auf Silvaner und Bierkeller-Integration.',
  'Bamberg',
  'Weinkarten-Software für Restaurants in Bamberg',
  'Bamberger Weinkul in weltweit berühmter Stadt',
  'Demo anfordern',
  '/demo',
  'Meine Weinkarte analysieren',
  '/analisis-carta',
  '{"intro": "Bamberg, UNESCO-Welterbestadt mit weltberühmten Bierkellern, hat einzigartige kulinarische Kultur. Restaurants in Bamberg brauchen fränkische Wein-Spezialisierung neben Bier-Integration. Winerim bietet Lösungen für diese Dualität.", "stats": [{"label": "Silvaner-Verkäufe", "value": "+29%"}, {"label": "Restaurants", "value": "65+"}, {"label": "Effizienzgewinne", "value": "+64%"}], "country": "Deutschland", "features": [{"title": "Silvaner-Datenbank", "description": "Umfassende Katalogisierung fränkischer Silvaner"}, {"title": "Bier-Integration", "description": "Hybrid-System für Wein- und Bierverkauf-Management"}, {"title": "Welterbe-Marketing", "description": "Tools zur Vermarktung Bambergs UNESCO-Status"}, {"title": "Historische Brauerei-Integration", "description": "Verbindung mit berühmten Bamberger Brauereien"}], "problems": [{"title": "Bier dominiert Kultur", "description": "Weine müssen gegen Bier-Tradition konkurrieren"}, {"title": "Silvaner-Wahrnehmung schwach", "description": "Gäste denken automatisch an Bier, nicht Wein"}, {"title": "Duale Menü-Verwaltung", "description": "Gleichzeitige Verwaltung von Wein- und Bierkarten ist komplex"}, {"title": "UNESCO-Touristen haben Erwartungen", "description": "Gäste erwarten Authentizität und kulturelle Verbindung"}, {"title": "Kleine lokale Weingüter", "description": "Viele fränkische Weingüter sind sehr klein mit begrenztem Output"}], "city_name": "Bamberg", "ticket_medio": "38-80€"}'::jsonb,
  '[{"q": "Wie funktioniert Wein-Bier-Integration?", "a": "Hybrid-System mit separaten Katalogen aber integrierter Verwaltung und Inventar-Kontrolle"}, {"q": "Bieten Sie Silvaner-Spezialisierung?", "a": "Ja, Geschmakts-Profile, Paarungsempfehlungen und Terroir-Informationen speziell für Silvaner"}, {"q": "Können Sie UNESCO-Marketing unterstützen?", "a": "Ja, Tools zur Vermarktung Bambergs Welterbe-Status mit Kulturveranstaltungen-Integration"}]'::jsonb,
  '["weinkarten-software-nuernberg", "weinkarten-software-wuerzburg", "weinkarten-software-erlangen"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'weinkarten-software-rothenburg-ob-der-tauber',
  'city',
  'de',
  'Weinkarten-Software in Rothenburg o.d.T. | Winerim',
  'Weinkartenverwaltung in Rothenburg ob der Tauber. Spezialisiert auf Mittelalter-Tourismus und fränkische Weine.',
  'Rothenburg ob der Tauber',
  'Weinkarten-Software für Restaurants in Rothenburg o.d.T.',
  'Mittelalterliche Eleganz in Weinkuration',
  'Demo anfordern',
  '/demo',
  'Meine Weinkarte analysieren',
  '/analisis-carta',
  '{"intro": "Rothenburg ob der Tauber, Deutschlands berühmteste Mittelalter-Stadt, zieht Millionen von Touristen an. Restaurants in Rothenburg brauchen spezialisierte Lösungen für Tourismus-Gastronomie mit authentischer fränkischer Wein-Integration.", "stats": [{"label": "Tourismus-Fokus", "value": "+30%"}, {"label": "Restaurants", "value": "45+"}, {"label": "Durchschnittlicher Ticket", "value": "+38%"}], "country": "Deutschland", "features": [{"title": "Tourismus-Spezialisierung", "description": "Analytics für Besucherzahlen und internationales Publikum"}, {"title": "Franken-Wein-Katalog", "description": "Fränkische Spezialisierung für authentische regionale Angebote"}, {"title": "Mehrsprachige Erklärungen", "description": "7+ Sprachen für internationales Publikum"}, {"title": "Souvenir-Integration", "description": "Verwaltung von Flaschen zum Mitnehmen und Souvenir-Verkauf"}], "problems": [{"title": "Massiver Touristen-Strom", "description": "Bis zu 25.000 Besucher täglich in Hochsaison"}, {"title": "Große Sprachenvielfalt", "description": "Gäste sprechen Dutzende von Sprachen"}, {"title": "Mittelalter-Authentizität bewahren", "description": "Technologie darf historisches Ambiente nicht zerstören"}, {"title": "Schnelligkeit erforderlich", "description": "Kurze Verweildauer erfordert schnelle Empfehlungen"}, {"title": "Budget-Touristen", "description": "Viele Gäste haben begrenzte Budgets trotz touristischer Stellung"}], "city_name": "Rothenburg ob der Tauber", "ticket_medio": "35-75€"}'::jsonb,
  '[{"q": "Wie unterstützen Sie Touristen-Volumen?", "a": "Hochperformante Systeme für bis zu 25.000 Besucher täglich mit Quick-Service-Optionen"}, {"q": "Welche Sprachen unterstützen Sie?", "a": "7 Sprachen: Deutsch, Englisch, Französisch, Spanisch, Italienisch, Japanisch, Chinesisch"}, {"q": "Gibt es Souvenir-Integrationen?", "a": "Ja, Verwaltung von Flaschen zum Mitnehmen mit besonderen Preisen und Verpackung"}]'::jsonb,
  '["weinkarten-software-bamberg", "weinkarten-software-nuernberg", "weinkarten-software-wurzburg"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'weinkarten-software-muenster',
  'city',
  'de',
  'Weinkarten-Software in Münster | Winerim',
  'Weinkartenverwaltung in Münster. Spezialisiert auf Westfalen-Gastronomie und Rheingau-Fokus.',
  'Münster',
  'Weinkarten-Software für Restaurants in Münster',
  'Westfälische Authentizität in gehobener Weinkuration',
  'Demo anfordern',
  '/demo',
  'Meine Weinkarte analysieren',
  '/analisis-carta',
  '{"intro": "Münster, attraktive Universitätsstadt mit gehobener Restaurantszene, hat spezialisierte Anforderungen. Restaurants in Münster brauchen Rheingau-Spezialisierung mit westfälischer kulinarischer Integration. Winerim bietet beides mit Fokus auf akademisches Publikum.", "stats": [{"label": "Gehobene Restaurants", "value": "+22%"}, {"label": "Aktive Etablissements", "value": "85+"}, {"label": "Effizienz", "value": "+58%"}], "country": "Deutschland", "features": [{"title": "Rheingau-Spezialisierung", "description": "Vollständige Lagenkataloge mit akademischem Fokus"}, {"title": "Westfälische Küche", "description": "Spezialisierte Paarungen für traditionelle westfälische Gerichte"}, {"title": "Akademisches Publikum", "description": "Tools für Universitäts-Events und studentische Diskurse"}, {"title": "Preis-Bewusstsein", "description": "Optimierung für verschiedene Preis-Segmente"}], "problems": [{"title": "Akademisches Publikum hat hohe Erwartungen", "description": "Studierte Gäste erwarten Fachdiskurs"}, {"title": "Preis-Bewusstsein vs. Qualität", "description": "Balance zwischen Qualität und Studentenbudgets"}, {"title": "Westfälische Küche spezialisiert", "description": "Pairungen erfordern tiefes Wissen"}, {"title": "Saisonale Universitäts-Muster", "description": "Vorlesungszeiten vs. Ferien beeinflussen Volumen drastisch"}, {"title": "Schnelle Serviceerwartung", "description": "Akademisches Publikum erwartet schnelle und intelligente Bedienung"}], "city_name": "Münster", "ticket_medio": "45-90€"}'::jsonb,
  '[{"q": "Wie funktionieren akademische Diskurse?", "a": "Detaillierte Beschreibungen und Provenance-Informationen für Gäste, die Wissen-Tiefe erwarten"}, {"q": "Gibt es Preis-Segmentierung?", "a": "Ja, Tools zur Verwaltung verschiedener Preis-Ebenen mit Qualitäts-Fokus auf jeder Stufe"}, {"q": "Bieten Sie Westfälische Küche Spezialisierung?", "a": "Ja, Pairungen spezialisiert auf westfälische Traditionen wie Knackwurst und Pumpernickel"}]'::jsonb,
  '["weinkarten-software-hannover", "weinkarten-software-duesseldorf", "weinkarten-software-bonn"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'weinkarten-software-aachen',
  'city',
  'de',
  'Weinkarten-Software in Aachen | Winerim',
  'Weinkartenverwaltung in Aachen. Spezialisiert auf belgische, niederländische und deutsche Weine.',
  'Aachen',
  'Weinkarten-Software für Restaurants in Aachen',
  'Grenzstadt-Exzellenz in Weinkuration',
  'Demo anfordern',
  '/demo',
  'Meine Weinkarte analysieren',
  '/analisis-carta',
  '{"intro": "Aachen, an der Grenze zu Belgien und Niederlanden, hat einzigartige kulinarische Kultur. Restaurants in Aachen brauchen spezialisierte Lösungen für deutsche, belgische und niederländische Weine. Winerim bietet Grenzregion-Expertise.", "stats": [{"label": "Grenzregion-Spezialität", "value": "+24%"}, {"label": "Restaurants", "value": "75+"}, {"label": "Kundenumwandlung", "value": "+26%"}], "country": "Deutschland", "features": [{"title": "Rheingau-Datenbank", "description": "Deutsche Weine mit vollem Katalog"}, {"title": "Belgische Spezialisierung", "description": "Belgische Biere und Weinkultur-Integration"}, {"title": "Niederländische Weine", "description": "Kleine aber bedeutende niederländische Produktionen"}, {"title": "Grenzregion-Events", "description": "Management von internationalen Weinfesten"}], "problems": [{"title": "Sprachliche Vielfalt", "description": "Deutsch, Französisch, Niederländisch, Englisch erforderlich"}, {"title": "Unterschiedliche Weintraditionen", "description": "Gäste haben unterschiedliche regionale Erwartungen"}, {"title": "Belgische Bierkkultur dominant", "description": "Weine müssen gegen starke Biertradition konkurrieren"}, {"title": "Grenzregion-Tourismus", "description": "Wochenend-Shoppers mit anderen Erwartungen als Touristen"}, {"title": "Kleine niederländische Weinszene", "description": "Schwer, niederländische Weine auf den Markt zu bringen"}], "city_name": "Aachen", "ticket_medio": "45-95€"}'::jsonb,
  '[{"q": "Wie funktioniert Sprachunterstützung?", "a": "4 Sprachen integriert: Deutsch, Französisch, Niederländisch, Englisch mit lokalen Varianten"}, {"q": "Bieten Sie Belgische Weinintegration?", "a": "Ja, spezialisierte Kataloge belgischer Weine und Biere mit Hybrid-Management"}, {"q": "Können Sie Grenzregion-Events managen?", "a": "Ja, Tools für internationale Weinfeste mit Multi-Currency und Sprachen-Support"}]'::jsonb,
  '["weinkarten-software-bonn", "weinkarten-software-koeln", "weinkarten-software-duesseldorf"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'weinkarten-software-karlsruhe',
  'city',
  'de',
  'Weinkarten-Software in Karlsruhe | Winerim',
  'Intelligente Weinkartenverwaltung in Karlsruhe. Spezialisiert auf Baden-Weine und Pfalz-Qualität.',
  'Karlsruhe',
  'Weinkarten-Software für Restaurants in Karlsruhe',
  'Residenzstadt-Eleganz in Weinkuration',
  'Demo anfordern',
  '/demo',
  'Meine Weinkarte analysieren',
  '/analisis-carta',
  '{"intro": "Karlsruhe, ehemalige Residenzstadt mit Fächerplan-Eleganz, zieht anspruchsvolle Gäste an. Restaurants in Karlsruhe brauchen gehobene Weinkarten mit Baden- und Pfalz-Spezialisierung. Winerim bietet Premium-Lösungen.", "stats": [{"label": "Gehobene Restaurants", "value": "+25%"}, {"label": "Premium-Partner", "value": "95+"}, {"label": "Kundenzufriedenheit", "value": "4.8/5"}], "country": "Deutschland", "features": [{"title": "Baden-Expertise", "description": "Vollständige Lagenkataloge mit Terroir-Spezialisierung"}, {"title": "Pfalz-Datenbank", "description": "Pfalz-Weine mit Fokus auf experimentelle Sorten"}, {"title": "Residenzstadt-Marketing", "description": "Tools zur Betonung historischer Eleganz"}, {"title": "VIP-Management", "description": "Premium-CRM für gehobene Klientel"}], "problems": [{"title": "Hohe Erwartungen anspruchsvoller Klientel", "description": "Karlsruhe-Gäste sind kultiviert und versiert"}, {"title": "Baden-Weine sind zu unterschätzt", "description": "Gäste denken zuerst an Rheingau, nicht Baden"}, {"title": "Kleine Produzenten-Verwaltung", "description": "Viele Baden-Weingüter sind kleine Familienbetriebe"}, {"title": "VIP-Kundenverwaltung", "description": "Stammgäste mit extremen Spezialisierungserwartungen"}, {"title": "Preis-Volatilität", "description": "Hochwertige Baden und Pfalz-Weine haben dynamische Preise"}], "city_name": "Karlsruhe", "ticket_medio": "55-120€"}'::jsonb,
  '[{"q": "Wie präsentieren Sie Baden-Weine gegenüber Rheingau?", "a": "Positionierung mit Wärmestil-Unterschiede und Qualitäts-Fokus spezialisiert auf Baden-Stärken"}, {"q": "Bieten Sie VIP-CRM?", "a": "Ja, umfassendes System mit Trinkgeschichte, Favoriten und personalisierten Empfehlungen"}, {"q": "Welche Features für gehobene Restaurants?", "a": "Raritäten-Management, Michelin-Pairing-Tools und White-Glove-Sommelier-Support"}]'::jsonb,
  '["weinkarten-software-freiburg", "weinkarten-software-heidelberg", "weinkarten-software-mannheim"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'weinkarten-software-mannheim',
  'city',
  'de',
  'Weinkarten-Software in Mannheim | Winerim',
  'Weinkartenverwaltung in Mannheim. Spezialisiert auf Rheingau, Baden und Pfalz-Weine.',
  'Mannheim',
  'Weinkarten-Software für Restaurants in Mannheim',
  'Hafenstadt-Qualität in gehobener Weinkuration',
  'Demo anfordern',
  '/demo',
  'Meine Weinkarte analysieren',
  '/analisis-carta',
  '{"intro": "Mannheim, moderne Hafenstadt mit wohlhabender Bevölkerung, hat gehobenes kulinarisches Publikum. Restaurants in Mannheim brauchen Rheingau-, Baden- und Pfalz-Spezialisierung. Winerim bietet spezialisierte Premium-Lösungen.", "stats": [{"label": "Verkaufswachstum", "value": "+26%"}, {"label": "Gehobene Restaurants", "value": "105+"}, {"label": "Effizienz", "value": "+63%"}], "country": "Deutschland", "features": [{"title": "Rheingau-Expertise", "description": "Vollständige Lagenkartographie mit Qualitäts-Fokus"}, {"title": "Baden-Datenbank", "description": "Warme Baden-Weine mit Spätburgunder-Spezialisierung"}, {"title": "Pfalz-Integration", "description": "Experimentelle und traditionelle Pfalz-Weine"}, {"title": "Großhandelintegration", "description": "Direktverbindung mit Mannheim-Großhändlern"}], "problems": [{"title": "Wohlhabende, anspruchsvolle Klientel", "description": "Gäste erwarten Top-Qualität und Wissen"}, {"title": "Regionale Wein-Konkurrenz", "description": "Drei Regionen erfordern spezialisiertes Management"}, {"title": "Großhandelpreise dynamisch", "description": "Schnelle Preisänderungen erfordern Echtzeit-Anpassung"}, {"title": "Personal-Qualitätsanforderung", "description": "Sommeliers müssen in drei Regionen versiert sein"}, {"title": "Hochvolumige Events", "description": "Mannheim hat viele Corporate-Events mit großen Mengen"}], "city_name": "Mannheim", "ticket_medio": "50-110€"}'::jsonb,
  '[{"q": "Wie managen Sie drei Regionen?", "a": "Spezialisierte Datenbanken mit Vergleichs-Tools für Rheingau, Baden und Pfalz"}, {"q": "Gibt es Großhandelintegration?", "a": "Ja, Direktverbindung mit Mannheimer Distributoren für Echtzeit-Preis-Updates"}, {"q": "Welche Event-Features?", "a": "Corporate-Event-Management mit Menü-Pairing, Mengen-Kalkulatoren und Kostenpräsentationen"}]'::jsonb,
  '["weinkarten-software-heidelberg", "weinkarten-software-karlsruhe", "weinkarten-software-wiesbaden"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'weinkarten-software-dortmund',
  'city',
  'de',
  'Weinkarten-Software in Dortmund | Winerim',
  'Weinkartenverwaltung in Dortmund. Spezialisiert auf Rheingebiet-Weine und regionale Gastronomie.',
  'Dortmund',
  'Weinkarten-Software für Restaurants in Dortmund',
  'Industriestadt-Transformation: Modernes Wein-Management',
  'Demo anfordern',
  '/demo',
  'Meine Weinkarte analysieren',
  '/analisis-carta',
  '{"intro": "Dortmund, transformierte Industriestadt mit wachsender gehobener Gastronomie, braucht spezialisierte Lösungen. Restaurants in Dortmund benötigen Rheingebiet-Wein-Spezialisierung und modernem Management. Winerim bietet beides für Wachstum.", "stats": [{"label": "Gastronomie-Wachstum", "value": "+28%"}, {"label": "Aktive Restaurants", "value": "125+"}, {"label": "Effizienzgewinne", "value": "+60%"}], "country": "Deutschland", "features": [{"title": "Rheingau-Datenbank", "description": "Qualitätsweine aus Rheingau mit Fokus auf Seriöses"}, {"title": "Ruhr-Region-Integration", "description": "Verbindung mit lokalen Weingütern in Umgebung"}, {"title": "Moderne Systemarchitektur", "description": "Cloud-basiert für Skalierbarkeit und Updates"}, {"title": "KMU-freundliche Preisgestaltung", "description": "Spezialisierte günstige Pläne für aufstrebende Restaurants"}], "problems": [{"title": "Dortmund hat wenig Weinkulturtradition", "description": "Gäste erwarten eher Bier als Wein"}, {"title": "Kleine Restaurantszene", "description": "Begrenzter Markt erfordert Kosteneffizienz"}, {"title": "Personal mit Wein-Wissen selten", "description": "Schwer, Sommeliers mit Rheingau-Expertise zu finden"}, {"title": "Schnelle Markt-Transformation", "description": "Dortmund ändert sich rapide mit neuen Restaurants"}, {"title": "Budget-bewusste Gäste", "description": "Nicht alle Gäste haben Premium-Budget"}], "city_name": "Dortmund", "ticket_medio": "38-80€"}'::jsonb,
  '[{"q": "Wie helfen Sie, Weinkkultur zu bauen?", "a": "Schulungsmaterialien, automatische Empfehlungen und CRM-Tools zur Kundenbildung"}, {"q": "Gibt es Preis-Optionen für kleine Restaurants?", "a": "Ja, spezialisierte günstige Pläne mit Bare-Essentials für 20-50 Flaschen"}, {"q": "Können Sie mit lokalen Weingütern in der Umgebung arbeiten?", "a": "Ja, spezialisierte Integration mit Ruhr-Region und benachbarten Weingütern"}]'::jsonb,
  '["weinkarten-software-essen", "weinkarten-software-duesseldorf", "weinkarten-software-koeln"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'weinkarten-software-essen',
  'city',
  'de',
  'Weinkarten-Software in Essen | Winerim',
  'Weinkartenverwaltung in Essen. Spezialisiert auf Rheingebiet-Weine und moderne Gastronomie.',
  'Essen',
  'Weinkarten-Software für Restaurants in Essen',
  'Ruhr-Valley-Kulinarik mit modernem Wein-Management',
  'Demo anfordern',
  '/demo',
  'Meine Weinkarte analysieren',
  '/analisis-carta',
  '{"intro": "Essen, Kulturhauptstadt und Teil der Ruhr-Region-Renaissance, hat wachsende gehobene Gastronomie. Restaurants in Essen brauchen spezialisierte Lösungen für Rheingau und regionale Spezialisierung. Winerim bietet modernes Management.", "stats": [{"label": "Gastronomie-Transformation", "value": "+27%"}, {"label": "Restaurants", "value": "110+"}, {"label": "Kundenzufriedenheit", "value": "4.7/5"}], "country": "Deutschland", "features": [{"title": "Rheingau-Katalog", "description": "Vollständige Datenbank mit Qualitäts-Fokus"}, {"title": "Ruhr-Region-Weine", "description": "Regionale Spezialisierung und kleine Produzenten"}, {"title": "Kulturhauptstadt-Integration", "description": "Tools für Kunst-, Musik- und Kulturveranstaltungen"}, {"title": "KMU-Fokus", "description": "Einsteigerfreundliche Lösungen für aufstrebende Restaurateur"}], "problems": [{"title": "Ruhr-Region hat wenig Weintradition", "description": "Gäste erwarten eher Bier und regionale Speisen"}, {"title": "Kulturveranstaltungen sind komplex", "description": "Viele Events mit speziellen Anforderungen"}, {"title": "Kleine Weingüter schwer zu verwalten", "description": "Regionale Produzenten haben begrenzte Kapazitäten"}, {"title": "Schnelle Stadt-Transformation", "description": "Restaurant-Szene ändert sich schnell"}, {"title": "Budget-Bewusstsein", "description": "Nicht alle Gäste haben Premium-Budget für Weine"}], "city_name": "Essen", "ticket_medio": "40-85€"}'::jsonb,
  '[{"q": "Wie unterstützen Sie Kulturveranstaltungen?", "a": "Integrierte Planung mit Kunstveranstaltungen, Konzerten und Kulturprogramm-Koordination"}, {"q": "Können Sie kleine Weingüter managen?", "a": "Ja, spezialisierte Verwaltung für kleine Produzenten mit begrenztem Output"}, {"q": "Gibt es günstige Optionen?", "a": "Ja, flexible Preisgestaltung mit Basis-Plan für kleine Restaurants"}]'::jsonb,
  '["weinkarten-software-dortmund", "weinkarten-software-duesseldorf", "weinkarten-software-koeln"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'weinkarten-software-erfurt',
  'city',
  'de',
  'Weinkarten-Software in Erfurt | Winerim',
  'Weinkartenverwaltung in Erfurt. Spezialisiert auf deutsche Weine und Kultur-Gastronomie.',
  'Erfurt',
  'Weinkarten-Software für Restaurants in Erfurt',
  'Thüringische Kulturstadt mit Wein-Expertise',
  'Demo anfordern',
  '/demo',
  'Meine Weinkarte analysieren',
  '/analisis-carta',
  '{"intro": "Erfurt, Thüringens Kulturhauptstadt, hat wachsende Restaurantszene mit gehobenen Ansprüchen. Restaurants in Erfurt brauchen spezialisierte Lösungen für deutsche Weine mit Kultur-Fokus. Winerim bietet Integration beider Bereiche.", "stats": [{"label": "Kultur-Integration", "value": "+25%"}, {"label": "Restaurants", "value": "65+"}, {"label": "Effizienzgewinne", "value": "+56%"}], "country": "Deutschland", "features": [{"title": "Deutsche Wein-Allrounder", "description": "Kataloge aller 13 Anbaugebiete Deutschlands"}, {"title": "Kultur-Event-Integration", "description": "Tools für Museen, Theater und Kunstveranstaltungen"}, {"title": "Kleine Weingut-Verwaltung", "description": "Spezialisiert auf kleine regionale Produzenten"}, {"title": "Budget-freundliche Optionen", "description": "Skalierbare Preisgestaltung für verschiedene Restaurantgrößen"}], "problems": [{"title": "Kleine Restaurantszene", "description": "Begrenzte Marktgröße erfordert Kosteneffizienz"}, {"title": "Kultur-Event-Komplexität", "description": "Viele Veranstaltungen mit speziellen Anforderungen"}, {"title": "Kleine Weingüter", "description": "Viele regionale Produzenten mit kleinem Output"}, {"title": "Personal-Rotation", "description": "Hochqualifiziertes Personal wird zu größeren Städten abgeworben"}, {"title": "Budget-Bewusstsein Gäste", "description": "Nicht alle Gäste haben Premium-Budget"}], "city_name": "Erfurt", "ticket_medio": "38-78€"}'::jsonb,
  '[{"q": "Wie funktioniert Kultur-Event-Integration?", "a": "Kalender-Anbindung mit Museen, Theater und Kunstevents für thematische Weinkarten"}, {"q": "Können Sie kleine Weingüter managen?", "a": "Ja, spezialisierte Verwaltung mit einfachen Bestandsaktualisierungen"}, {"q": "Gibt es flexible Preisoptionen?", "a": "Ja, skalierbare Pläne vom Basis bis zum Premium"}]'::jsonb,
  '["weinkarten-software-weimar", "weinkarten-software-jena", "weinkarten-software-leipzig"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'weinkarten-software-schwerin',
  'city',
  'de',
  'Weinkarten-Software in Schwerin | Winerim',
  'Weinkartenverwaltung in Schwerin. Spezialisiert auf Mecklenburg-Tourismus und gehobene Küche.',
  'Schwerin',
  'Weinkarten-Software für Restaurants in Schwerin',
  'Schlossstadt-Eleganz in Weinkuration',
  'Demo anfordern',
  '/demo',
  'Meine Weinkarte analysieren',
  '/analisis-carta',
  '{"intro": "Schwerin, die Schlossstadt an der Ostsee, zieht Kultur- und Wellness-Touristen an. Restaurants in Schwerin benötigen gehobene Weinkarten mit Mecklenburg-Fokus. Winerim bietet spezialisierte Premium-Lösungen.", "stats": [{"label": "Tourismus-Fokus", "value": "+23%"}, {"label": "Gehobene Restaurants", "value": "55+"}, {"label": "Kundenzufriedenheit", "value": "4.7/5"}], "country": "Deutschland", "features": [{"title": "Schloss-Veranstaltungs-Management", "description": "Spezialisierte Tools für Schloss-Events"}, {"title": "Seenregion-Tourismus-Integration", "description": "Analytics für Besucherzahlen und Saisonmuster"}, {"title": "Wellness-Gastronomie", "description": "Spezialisierte Light-Wine-Optionen für Wellness-Gäste"}, {"title": "Mehrssprach-Support", "description": "Deutsch, Englisch, Skandinavisch für internationale Gäste"}], "problems": [{"title": "Schloss-Event-Verwaltung komplex", "description": "Historische Venues mit speziellen Anforderungen"}, {"title": "Touristische Saisonalität", "description": "Extreme Sommer/Winter-Unterschiede"}, {"title": "Wellness-Publikum", "description": "Gäste mögen leichte, gesunde Weine"}, {"title": "Kleine Restaurantszene", "description": "Begrenzte Anzahl von hochwertigen Etablissements"}, {"title": "Internationale Gast-Basis", "description": "Skandinavische und baltische Gäste haben unterschiedliche Erwartungen"}], "city_name": "Schwerin", "ticket_medio": "50-100€"}'::jsonb,
  '[{"q": "Wie managen Sie Schloss-Events?", "a": "Spezialisierte Tools mit historischen Venues-Katalog, Menü-Integration und Kostenpräsentationen"}, {"q": "Bieten Sie Wellness-Weinkarten?", "a": "Ja, leichte, sulfitarme und organische Optionen mit Salubrity-Fokus"}, {"q": "Welche Sprachen unterstützen Sie?", "a": "Deutsch, Englisch, Schwedisch, Norwegisch und Dänisch für baltische Gäste"}]'::jsonb,
  '["weinkarten-software-rostock", "weinkarten-software-luebeck", "weinkarten-software-greifswald"]'::jsonb,
  'Article',
  true
);

INSERT INTO seo_pages (slug, cluster, lang, meta_title, meta_description, hero_badge, hero_title, hero_subtitle, cta_primary_text, cta_primary_url, cta_secondary_text, cta_secondary_url, body, faqs, related_pages, schema_type, published)
VALUES (
  'weinkarten-software-passau',
  'city',
  'de',
  'Weinkarten-Software in Passau | Winerim',
  'Weinkartenverwaltung in Passau. Spezialisiert auf Donau-Tourismus und bayerische Weine.',
  'Passau',
  'Weinkarten-Software für Restaurants in Passau',
  'Donau-Dreiflüsse-Stadt: Tourismus-Exzellenz',
  'Demo anfordern',
  '/demo',
  'Meine Weinkarte analysieren',
  '/analisis-carta',
  '{"intro": "Passau, die Dreiflüsse-Stadt, ist einer der größten Anlandeplätze für Donau-Kreuzfahrten. Restaurants in Passau benötigen spezialisierte Lösungen für Tourismus-Gastronomie mit bayerischem Fokus. Winerim bietet beides mit Logistik-Expertise.", "stats": [{"label": "Kreuzfahrt-Touristen", "value": "+31%"}, {"label": "Restaurants", "value": "85+"}, {"label": "Durchschnittlicher Ticket", "value": "+40%"}], "country": "Deutschland", "features": [{"title": "Donau-Schiff-Integration", "description": "Verbindung mit Kreuzfahrtlinien für Koordination"}, {"title": "Bayern-Wein-Katalog", "description": "Spezialisierung auf bayerische und Donau-Weine"}, {"title": "Mehrsprachige Beschreibungen", "description": "6+ Sprachen für internationale Kreuzfahrer"}, {"title": "Schneller Service-Mode", "description": "Optimized für schnelle Gast-Durchlaufzeiten"}], "problems": [{"title": "Massive saisonale Fluktuation", "description": "Sommerkreuzfahrten vs. ruhige Wintermonate"}, {"title": "Internationale Gast-Heterogenität", "description": "Gäste aus Dutzenden von Ländern mit verschiedenen Erwartungen"}, {"title": "Kurze Verweildauer", "description": "Kreuzfahrtgäste haben oft nur 2-3 Stunden"}, {"title": "Logistik-Komplexität", "description": "Tausende von Gästen täglich während Saison"}, {"title": "Sommelier-Kontinuität", "description": "Personal-Rotation ist saisonal stark"}], "city_name": "Passau", "ticket_medio": "40-85€"}'::jsonb,
  '[{"q": "Wie funktioniert Kreuzfahrt-Integration?", "a": "Direkte Verbindung mit Kreuzfahrt-Linien für zeitliche Koordination und Gast-Prognosen"}, {"q": "Welche Sprachen?", "a": "6 Sprachen: Deutsch, Englisch, Französisch, Italienisch, Spanisch, Niederländisch"}, {"q": "Gibt es Quick-Service-Optionen?", "a": "Ja, optimiert für schnelle Empfehlungen und Bestellungen bei großen Gastzahlen"}]'::jsonb,
  '["weinkarten-software-regensburg", "weinkarten-software-landshut", "weinkarten-software-wien-region"]'::jsonb,
  'Article',
  true
);

COMMIT;
