# Radar Winerim de vinos nuevos y cartas de novedades

Fecha: 2026-07-05

## Hechos

- Winerim recibe solicitudes de vinos que no estan en su base actual de mas de 300.000 vinos.
- La senal nace de una necesidad real: un restaurante quiere anadir un vino concreto a su carta y no lo encuentra.
- Esa senal tiene valor operativo, editorial y comercial si se normaliza, se enriquece y se agrega sin exponer datos privados de clientes.
- El proyecto ya tiene piezas relacionadas:
  - Biblioteca del vino para fichas, entidades, uvas, regiones, estilos y maridajes.
  - Aprender vino para formar equipos y explicar criterios de decision.
  - CloudRIM para recibir documentos, albaranes, tarifas, cartas y datos dispersos.
  - SAVia para preguntar sobre carta, stock, margen, rotacion, ventas y oportunidades.
  - Blog, llms.txt, sitemap y prerender como superficie SEO/LLM.

## Decision recomendada

Crear una linea de producto y contenido llamada `Radar Winerim`.

Promesa:

> Los vinos que los restaurantes empiezan a pedir antes de que aparezcan en las cartas de todos.

El Radar no debe ser una lista publica indiscriminada de vinos faltantes. Debe funcionar como circuito:

1. Captura de solicitud de vino faltante.
2. Normalizacion y deduplicacion.
3. Enriquecimiento minimo verificable.
4. Activacion privada en la carta del cliente.
5. Decision editorial/comercial:
   - ficha interna;
   - ficha publica;
   - Vino del Dia;
   - carta `Novedades de Julio`;
   - newsletter Radar;
   - informe agregado para distribuidores o bodegas.

## Producto 1: Radar interno de solicitudes

Objetivo:

- Priorizar que vinos nuevos se enriquecen primero.
- Detectar gaps por bodega, region, pais, estilo, distribuidor o mercado.
- Dar a Customer Success una vista clara de solicitudes pendientes y resueltas.

Campos minimos:

- `raw_name`: nombre introducido por el cliente.
- `normalized_name`: nombre normalizado.
- `producer`: bodega o productor.
- `vintage`: anada si aplica.
- `country`, `region`, `appellation`.
- `wine_type`: tinto, blanco, rosado, espumoso, generoso, dulce, naranja u otro.
- `grapes`: uvas principales si se conocen.
- `restaurant_id`: privado.
- `requested_at`.
- `request_source`: editor, carta importada, albaran, tarifa, CloudRIM, soporte.
- `enrichment_status`: pendiente, en revision, enriquecido, publicado en cliente, descartado.
- `privacy_scope`: privado, agregado, publico con consentimiento.

Campos recomendados:

- distribuidor o proveedor aportado;
- coste, PVP botella y PVP copa si el cliente lo aporta;
- stock inicial;
- ventas tras incorporacion;
- margen estimado;
- imagen/ficha tecnica con permiso;
- argumento de sala;
- maridajes;
- motivo de alta: temporada, copa, evento, menu, sustitucion, cliente VIP.

Ranking interno:

- `solicitudes_30d`;
- recencia;
- cuentas estrategicas;
- calidad de datos;
- disponibilidad confirmada;
- oportunidad de carta por temporada, margen, copa o rotacion;
- gap de biblioteca actual.

## Producto 2: Cartas `Novedades de Julio`

Objetivo:

Convertir altas recientes en una seccion visible de carta que ayude a vender, no en una referencia enterrada dentro de una categoria.

Nombre por defecto:

- `Novedades de Julio`.

Variantes:

- `Recien llegados`;
- `Nuevas incorporaciones`;
- `Seleccion de verano`;
- `Ultimas botellas incorporadas`;
- `Descubrimientos del sumiller`;
- `Novedades por copa`.

Reglas minimas de inclusion:

- vino publicado en carta;
- anadido en los ultimos 30, 45 o 60 dias;
- disponible o con stock suficiente;
- no oculto por el restaurante;
- con descripcion corta, estilo o argumento de sala.

Reglas avanzadas:

- priorizar margen;
- priorizar vino por copa;
- priorizar stock alto;
- priorizar temporada;
- limitar a 5, 8 o 12 referencias;
- excluir vinos sin disponibilidad;
- caducar automaticamente la etiqueta de novedad.

Controles para el restaurante:

- activar/desactivar seccion;
- elegir periodo;
- cambiar nombre visible;
- fijar maximo de vinos;
- excluir una referencia;
- destacar una referencia;
- ordenar manualmente o por margen, stock, fecha, estilo o copa;
- generar PDF o version imprimible.

Ejemplo de copy:

```text
Novedades de Julio

Ultimas incorporaciones seleccionadas para esta temporada. Vinos pensados para platos de verano, venta por copa y clientes que quieren descubrir algo distinto sin salir de una carta equilibrada.

1. Nombre del vino 2024 - Bodega
Blanco fresco, salino y directo. Funciona especialmente bien con pescado, marisco y cocina de barra.

2. Nombre del vino 2022 - Bodega
Tinto ligero de fruta roja y tanino amable. Buena entrada para quien quiere un tinto gastronomico sin peso excesivo.
```

Encaje con SAVia:

- "Crea una seccion Novedades de Julio con vinos anadidos este mes y prioriza los de mayor margen."
- "Que novedades deberia explicar hoy el equipo de sala?"
- "Que vinos nuevos no se estan vendiendo?"
- "Que novedad puede ir por copa esta semana?"

## Producto 3: Vino del Dia

Objetivo:

Crear una pieza diaria o rotativa que convierta una novedad en una recomendacion facil de entender.

Tipos:

- global Radar;
- especifico de restaurante;
- margen;
- stock;
- temporada;
- formacion de sala;
- patrocinado, solo si se etiqueta con claridad.

Formula editorial:

```text
Hoy destacamos [vino] porque [motivo concreto].
Es un [tipo/estilo] de [region] que funciona especialmente bien con [plato/situacion].
En sala, la forma mas simple de venderlo es: [argumento de una frase].
```

No elegir un vino si:

- no hay disponibilidad;
- los datos de region, bodega o anada son dudosos;
- revela informacion privada de un cliente;
- no tiene argumento claro;
- solo existe por patrocinio sin senal editorial.

## Producto 4: Newsletter Radar Winerim

Cadencia recomendada:

- MVP quincenal.
- Semanal cuando haya volumen suficiente y seleccion editorial estable.

Audiencia inicial:

- restaurantes;
- hoteles;
- grupos de restauracion;
- sumilleres y F&B managers;
- distribuidores en segmento separado;
- bodegas en segmento separado.

Estructura:

1. Senal de la semana.
2. 5 vinos o perfiles nuevos.
3. Vino del Dia.
4. Accion recomendada para carta.
5. CTA a analisis de carta, demo o lead magnet.

Asuntos posibles:

- `Radar Winerim: vinos nuevos que empiezan a moverse en carta`;
- `5 senales de vino para tu carta este mes`;
- `Novedades de Julio: que destacar y que no`;
- `Vinos nuevos, margen y rotacion: senales para restauracion`.

## Lead magnet recomendado

Nombre:

- `Plantilla Radar de Novedades para Carta de Vinos`.

Promesa:

> Detecta que vinos nuevos merece la pena destacar este mes y convierte altas dispersas en una seccion de carta que vende.

Formato MVP:

- PDF de 4-6 paginas;
- checklist;
- ejemplo de carta `Novedades de Julio`;
- matriz simple de margen, temporada, disponibilidad, historia y encaje con cocina;
- guion de sala para cinco incorporaciones.

Landing posible:

- `/recursos/plantilla-novedades-carta-vinos`.

CTA:

- `Descargar plantilla`;
- `Crear mis novedades del mes`;
- `Solicitar analisis de carta`.

## Monetizacion

Restaurantes:

- incluido en planes Core/Pro para adopcion;
- add-on premium para grupos con multi-local, informes y automatizacion avanzada;
- salida PDF/QR/newsletter para comunicar novedades.

Distribuidores:

- informes agregados y anonimizados de demanda por zona, estilo, categoria y rango de precio;
- oportunidades de catalogo;
- sponsorship editorial separado de la senal organica.

Bodegas:

- alta verificada de fichas;
- kit de datos estructurados para entrar mejor en cartas Winerim;
- informe agregado de presencia y competencia por estilo.

B2C:

- posponer hasta que el B2B este solido.
- posible fase posterior: newsletter de descubrimiento con restaurantes participantes.

## Hipotesis a validar

- Las solicitudes de vinos faltantes son una senal de demanda mas valiosa que una tendencia editorial generica.
- `Novedades de Julio` puede aumentar rotacion de vinos nuevos si la carta los destaca con argumento de sala.
- El Radar puede convertirse en lead magnet para restaurantes y en inteligencia agregada para distribuidores.
- La newsletter debe empezar B2B; abrir B2C demasiado pronto puede diluir el foco comercial de Winerim.
- SAVia puede ser la interfaz natural para convertir solicitudes, stock y ventas en decisiones de novedades.

## MVP 30 dias

Semana 1:

- Definir evento de solicitud de vino faltante.
- Registrar campos minimos.
- Separar datos privados, agregados y publicables.
- Definir estados de enriquecimiento.

Semana 2:

- Crear vista interna `Radar Winerim`.
- Ranking simple por numero de solicitudes, recencia y calidad de datos.
- Primer flujo de aviso al cliente cuando el vino queda enriquecido.

Semana 3:

- Prototipo de seccion `Novedades de Julio` para un restaurante piloto.
- Generacion manual/asistida de copy de sala.
- Validar que el equipo entiende la seccion y puede usarla en servicio.

Semana 4:

- Primer lead magnet `Plantilla Radar de Novedades`.
- Primera newsletter piloto B2B.
- Primer informe interno de gaps por region, bodega y estilo.

## Tareas pendientes

- Confirmar donde se almacena hoy cada solicitud de vino inexistente en Winerim.
- Extraer una muestra anonima de 30-90 dias:
  - volumen total;
  - duplicados;
  - bodegas mas repetidas;
  - regiones;
  - tipo de restaurante;
  - tiempo medio de resolucion.
- Decidir si `Radar Winerim` vive primero como modulo interno, pantalla de admin o vista dentro del editor.
- Disenar la UI de `Novedades de Julio` dentro del editor de carta.
- Crear la landing del lead magnet cuando exista la primera plantilla.
- Definir reglas de privacidad y consentimiento antes de publicar cualquier vino asociado a cliente.
- Conectar el futuro contenido publico con Biblioteca del vino, Aprender vino, CloudRIM, SAVia, sitemap, prerender y `llms.txt`.

