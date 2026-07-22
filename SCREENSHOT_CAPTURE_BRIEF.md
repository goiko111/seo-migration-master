# Winerim: brief de capturas de producto

## Objetivo

Crear un banco corto de capturas reales que sirva a la vez para la web y para `/presentacion`. No hacen falta dos versiones de cada pantalla: se reutilizara la misma captura maestra y el frontend ajustara el encuadre.

## Especificacion comun

- Resolucion recomendada: `1600 x 1000 px` o `1440 x 900 px`.
- Formato: PNG.
- Vista de escritorio, zoom del navegador al 100 % y sin barra del navegador.
- Sin cursor, tooltips abiertos, menús accidentales ni datos personales.
- Usar un restaurante de demostracion con suficientes filas y valores para evitar estados vacios.
- Mantener visibles el nombre del modulo, los indicadores principales y las columnas que justifican la decision.

## Capturas necesarias

### 1. CloudRIM: bandeja documental poblada

Archivo: `feature-cloudrim-inbox-current.png`

Mostrar una sola bandeja con varios documentos y, cuando existan, tipo, origen, fecha, estado de lectura/clasificacion y destino. Esta sera la unica captura de CloudRIM en la presentacion y la principal de `/producto/cloudrim`.

### 2. Margenes: vision general

Archivo: `feature-margins-overview.png`

Mostrar el modulo real de Margenes con los indicadores que esten disponibles: valor de stock, coste, PVP, margen real, rotacion, stock dormido u oportunidades. Debe quedar claro en cinco segundos que es una pantalla de rentabilidad, no solo de rendimiento de carta.

### 3. Margenes: detalle por referencia

Archivo: `feature-margins-wine-detail.png`

Mostrar una tabla o ficha con vino, distribuidor, coste actual, PVP, margen en euros, margen porcentual, stock/rotacion y accion sugerida, segun lo que exista en producto.

### 4. Supply: comparacion de tarifas

Archivo: `feature-supply-tariff-comparison.png`

Mostrar el mismo vino o referencia comparado entre distribuidores, con precio, disponibilidad, formato o condiciones relevantes.

### 5. Supply: propuesta de reposicion o pedido

Archivo: `feature-supply-replenishment.png`

Mostrar una propuesta con referencia, cantidad, motivo, proveedor y estado. Si existe aprobacion humana, debe verse.

### 6. RIMs: Decision Center

Archivo: `feature-rims-decision-center.png`

Mostrar varias propuestas con nombre del RIM, evidencia, impacto esperado, estado y accion de aprobar/revisar. Priorizar MarginRIM, StockRIM o RotationRIM.

### 7. SAVia: respuesta con evidencia

Archivo: `feature-savia-margin-answer.png`

Mostrar una conversacion sobre margen, stock o rotacion. La respuesta debe incluir datos o fuentes y una propuesta preparada, sin aparentar que ejecuta una accion critica sin aprobacion.

### 8. Multi-local: panel ejecutivo

Archivo: `feature-multilocal-dashboard.png`

Mostrar comparacion entre varios locales con margen, rotacion, stock u oportunidades. Es la captura mas util para grupos, hoteles y partners.

## Capturas ya validas

- Wine Cellar: mapa de bodega de Grupo Jorge.
- Wine Lockers: operativa de Premium Grille.
- Carta digital y experiencia del comensal: activos actuales.

Solo es necesario repetirlas si se dispone de una version mas limpia o de mayor resolucion.

## Uso previsto

| Captura | Web | Presentacion |
| --- | --- | --- |
| CloudRIM | `/producto/cloudrim`, `/funcionalidades` | CloudRIM |
| Margenes overview + detalle | Winerim Core, funcionalidades | Margenes |
| Supply comparacion + reposicion | Supply, funcionalidades | Winerim Supply |
| RIMs Decision Center | Inteligencia dinamica, funcionalidades | RIMs |
| SAVia | `/producto/savia`, inteligencia dinamica | SAVia |
| Multi-local | Grupos, hoteles, funcionalidades | Escala operativa |
