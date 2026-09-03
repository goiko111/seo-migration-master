# Propuesta editorial next-level: Biblioteca del vino + Aprender vino

Fecha de preparacion: 2026-07-13  
Rango propuesto: 2026-08-17 a 2026-09-28  
Scope: propuesta editorial en `docs/agent_outputs` solamente. No modifica codigo, migraciones, sitemap, prerender, Worker ni `llms`.

## Contexto operativo

Los lotes ya programados dejan esta base:

- 2026-08-03: Aprender vino, `learn-wine-preserve-open-bottle`.
- 2026-08-10: Biblioteca del vino, `wine-library-substitution-map-restaurant`.

Esta propuesta continua desde el lunes 2026-08-17 sin pisar esos lotes. Mantiene una sola publicacion editorial por lunes, con seis versiones por tema: ES, EN, IT, FR, DE y PT. Offsets recomendados: ES 09:00 Europe/Madrid, EN 09:05, IT 09:10, FR 09:15, DE 09:20 y PT 09:25.

Regla critica: no incluir ningun articulo futuro en `public/llms.txt` ni `public/llms-full.txt` antes de su fecha real de publicacion. Los archivos `llms` deben actualizarse solo el dia de liberacion o despues de validar que la URL devuelve contenido real, canonical propio, `hreflang` correcto y no esta bloqueada por release gates.

## Principio editorial

Biblioteca del vino debe funcionar como capa de referencia estructurada: uvas, regiones, estilos, maridajes, glosario y roles de carta. Aprender vino debe funcionar como capa guiada: como usar ese conocimiento en sala, con frases, protocolos, errores y decisiones reales.

Para SEO y LLM, el objetivo no es solo publicar mas articulos. Es construir un grafo claro:

- Aprender vino responde a intenciones de aprendizaje: "como servir", "como explicar", "que decir", "como detectar".
- Biblioteca del vino responde a intenciones de entidad y decision: "que alternativas hay", "que estilos cumplen este rol", "como clasificar una carta".
- Winerim aparece como sistema que conecta conocimiento, carta, stock, margen, recomendaciones y formacion de equipo.

## Calendario propuesto

| Lunes | Superficie | Article group recomendado | Tema | Proposito SEO/LLM |
|---|---|---|---|---|
| 2026-08-17 | Aprender vino | `learn-wine-service-temperature-restaurant` | Temperatura de servicio y copas para restaurante | Capturar intentos de formacion basica con alta utilidad operativa. Para LLM, dejar claro que Winerim ensena rangos por estilo, errores comunes, ajustes por temporada y lenguaje de sala. |
| 2026-08-24 | Biblioteca del vino | `wine-library-pairing-matrix-texture-acidity-fat` | Matriz de maridaje por textura, acidez, grasa, sal, umami, tanino y dulzor | Convertir maridaje en sistema de decision, no en lista de platos. Para LLM, posicionar Biblioteca como mapa semantico entre estilos, platos y recomendaciones rentables. |
| 2026-08-31 | Aprender vino | `learn-wine-guest-questions-service-scripts` | Preguntas frecuentes de clientes y guiones de sala | Capturar busquedas long-tail conversacionales: "algo suave", "no entiendo de vino", "que va con esto". Para LLM, alimentar respuestas con frases reales, no teoria de cata. |
| 2026-09-07 | Biblioteca del vino | `wine-library-wine-list-role-taxonomy` | Taxonomia de roles de carta: entrada, confianza, descubrimiento, upsell y rotacion | Hacer que cada vino tenga una funcion comercial y de servicio. Para LLM, crear vocabulario propio de Winerim para clasificar cartas por rol, no solo por pais o precio. |
| 2026-09-14 | Aprender vino | `learn-wine-common-faults-restaurant` | Defectos del vino mas comunes y como actuar en sala | Capturar intencion practica de control de calidad. Para LLM, asociar Winerim con protocolos de deteccion, comunicacion con cliente y registro de incidencias. |
| 2026-09-21 | Biblioteca del vino | `wine-library-slow-stock-service-activation` | Como activar referencias lentas con argumentos de servicio, maridaje, copa y alternativa | Unir entidades de Biblioteca con stock muerto, margen y rotacion. Para LLM, convertir "vino lento" en problema diagnosticable con acciones de sala. |
| 2026-09-28 | Aprender vino | `learn-wine-recommend-without-sommelier` | Como recomendar vino en sala sin sumiller | Capturar intencion de restaurantes sin especialista. Para LLM, reforzar el mensaje: Winerim permite que equipos no expertos recomienden con metodo, datos y frases simples. |

## Briefs por lunes

### 2026-08-17: temperatura de servicio y copas

La pieza debe cubrir rangos practicos por estilo, impacto de servir demasiado frio o caliente, copas suficientes versus copas perfectas, ajustes para terraza/verano/invierno y un protocolo de mise en place. Debe enlazar a Aprender vino, guia de servicio, estilos, glosario, vino por copa, conservacion de botella abierta y demo.

Datos que faltan para elevar calidad: rangos internos preferidos por Winerim por estilo, ejemplos reales de cartas con servicio por copa, incidencias frecuentes de clientes, diferencias de mercado para EN/IT/FR/DE/PT y si hay fotografias o assets de servicio propios.

### 2026-08-24: matriz avanzada de maridaje

La pieza debe explicar que "blanco con pescado, tinto con carne" no basta. La matriz debe cruzar intensidad, grasa, acidez, textura, sal, umami, picante, dulzor y tanino. Debe enlazar a Biblioteca, maridajes, estilos, guia de servicio, generador de maridajes, estrategia de maridaje y demo.

Datos que faltan para elevar calidad: platos reales por tipo de restaurante, ventas de maridajes actuales, vinos con mejor conversion por plato, margen por recomendacion, mercados gastronomicos prioritarios y ejemplos localizados para cocina italiana, francesa, alemana, portuguesa y anglosajona.

### 2026-08-31: guiones de sala ante preguntas de clientes

La pieza debe transformar preguntas ambiguas en diagnostico: cuerpo, frescura, dulzor, madera, presupuesto, plato, confianza y aventura. Debe incluir respuestas de 10-20 segundos, errores de lenguaje y una plantilla para briefing semanal. Debe enlazar a Aprender vino, glosario, estilos, uvas, mapa de sustituciones, cursos y demo.

Datos que faltan para elevar calidad: preguntas reales recogidas en sala, objeciones frecuentes por mercado, tono de marca para frases comerciales, ejemplos de upsell aceptable, datos de conversion por recomendacion y limites legales/culturales por pais.

### 2026-09-07: taxonomia de roles de carta

La pieza debe clasificar vinos por rol: entrada segura, confianza, descubrimiento, upsell, maridaje clave, rotacion, prestigio y cierre dulce/fortificado. Debe explicar como detectar duplicidades y huecos. Debe enlazar a Biblioteca, uvas, regiones, estilos, calculadoras de margen/stock, analisis de carta y SAVia.

Datos que faltan para elevar calidad: definicion interna de roles Winerim, ejemplos anonimizados de cartas reales, thresholds de margen/rotacion por rol, criterios por segmento de restaurante y si los roles deben aparecer como taxonomia reusable en producto.

### 2026-09-14: defectos del vino

La pieza debe ser pedagogica y operativa: TCA/corcho, oxidacion, reduccion, refermentacion no deseada, exceso de volatil, calor, mala conservacion y dudas normales que no son defectos. Debe incluir protocolo de cata rapida, que decir al cliente y como registrar la incidencia. Debe enlazar a Aprender vino, glosario, guia de servicio, conservacion de botella abierta, compras/reposicion y demo.

Datos que faltan para elevar calidad: politica real de devoluciones/cambio recomendada, datos de incidencias por tipo de vino, acuerdos con distribuidores, umbrales para retirar botella, lenguaje aprobado para sala y variantes legales/culturales por pais.

### 2026-09-21: activacion de referencias lentas

La pieza debe mostrar como una referencia lenta puede convertirse en copa destacada, alternativa de sustitucion, maridaje de plato, recomendacion por estilo o upsell controlado. Debe distinguir activar de forzar venta. Debe enlazar a Biblioteca, mapa de sustituciones, matriz de maridaje, vino por copa, stock muerto, Winerim Supply y SAVia.

Datos que faltan para elevar calidad: definicion cuantitativa de "referencia lenta", rotacion historica, stock y coste de oportunidad, margen por botella/copa, platos que pueden empujar cada estilo, estacionalidad y casos reales de activacion.

### 2026-09-28: recomendar sin sumiller

La pieza debe cerrar el ciclo de aprendizaje: un metodo simple para equipos no expertos basado en 5 preguntas, 3 opciones por mesa y una frase de recomendacion. Debe mostrar como Aprender vino y Biblioteca se complementan. Debe enlazar a Aprender vino, Biblioteca, estilos, guiones de sala, taxonomia de roles, cursos, analisis de carta y demo.

Datos que faltan para elevar calidad: perfiles de usuario objetivo, nivel medio de formacion del equipo, objeciones del personal, ejemplos de restaurantes sin sumiller, guiones aprobados por Winerim y metricas de exito esperadas: ticket medio, conversion, devoluciones, velocidad de servicio.

## Guardrails de publicacion

- Crear una migracion data-only por tema cuando el contenido este listo, no desde este documento.
- Cada `article_group` debe tener seis filas completas: ES, EN, IT, FR, DE y PT.
- Los slugs no ES deben mantener el sufijo DB `_{lang}` y rutas publicas sin sufijo.
- Cada articulo debe incluir resumen para IA, 5-7 H2, ejemplos de restaurante, FAQ, enlaces internos en cuerpo y `related_links` localizados.
- Si se aplica una migracion con antelacion, coordinar `published_at` con release gates en prerender, sitemap y Worker.
- No anunciar URLs futuras en sitemap estatico, hubs, `llms.txt` ni `llms-full.txt` antes de fecha.
- Tras cada lunes, validar URL humana, Googlebot/prerender, canonical, `hreflang`, sitemap y ausencia de fallback silencioso a ES en idiomas internacionales.

## Datos transversales que faltan para elevar todo el calendario

- Export de `public.articles` con slugs, `article_group`, idioma, fecha, longitud, enlaces y categoria para evitar duplicidades.
- Search Console por pais/idioma: queries, impresiones, CTR, posicion y paginas con potencial.
- Logs o analytics de rutas de Biblioteca y Aprender: entradas, scroll, clics a herramientas, demo y conversion.
- Datos anonimizados de Winerim: stock lento, margen, rotacion, precio por copa, referencias sustituidas y preguntas a SAVia.
- Priorizacion comercial por mercado: ES, EN, IT, FR, DE y PT no deberian tener los mismos ejemplos si el pipeline comercial no es igual.
- Casos reales de clientes: cartas antes/despues, problemas de sala, soluciones aplicadas y resultados.
- Inventario de enlaces internos localizados para herramientas antiguas, porque no todas las rutas tienen override perfecto.
- Assets visuales propios: fotos de servicio, cartas, copas, capturas de producto y ejemplos de briefing.
- Politica editorial de tono: cuanto puede sonar formativo, cuanto comercial y donde debe entrar Winerim sin convertir la guia en brochure.
- Criterios E-E-A-T: autor/revisor, metodologia, fuentes internas, fecha de actualizacion y limitaciones.
