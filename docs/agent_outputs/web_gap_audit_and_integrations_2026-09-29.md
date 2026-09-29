# Auditoria de huecos web e integraciones - 2026-09-29

## Alcance

Revision del inventario aportado por el usuario, de la fuente local viva y de las superficies publicas de Winerim. Este bloque no publica ni despliega cambios.

## Hechos confirmados

- La web ya comunica Wine Lockers, margenes y vino por copa, RIMs, CloudRIM/OCR, SAVia, grupos, Winerim Supply, Wine Cellar y analitica.
- Herramientas y Recursos ya ofrecen una entrada guiada por problema y enlazan los diagnosticos de rentabilidad y tiempo operativo.
- La calculadora de tiempo operativo existe en castellano y en ingles:
  - `/herramientas/calculadora-tiempo-operativo`
  - `/en/tools/operational-time-calculator`
- Ambas versiones calculan localmente, muestran la formula, separan tiempo recuperable de ahorro salarial y permiten descargar el escenario sin formulario obligatorio.
- El diagnostico de rentabilidad tambien existe en ES y EN/USD:
  - `/herramientas/diagnostico-rentabilidad-bodega`
  - `/en/tools/wine-cellar-profitability-diagnostic`
- El recorrido USA mantiene separadas compras, margen, tiempo y capital, usa USD por defecto y entrega resultados antes del CTA de demo.
- Existen fichas verificables para Agora y REVO en ES/EN. Incluyen datos, direccion, preflight, mapeo, piloto y readback sin prometer compatibilidad universal.
- App, sitemap, prerender, Cloudflare Worker y router Pages contienen las mismas rutas y metadata.
- Se retiraron afirmaciones sin respaldo suficiente: `22+ integraciones TPV`, disponibilidad universal y porcentajes fijos de mejora.
- Validacion local: TypeScript, build, `25` archivos y `221/221` pruebas, sintaxis de ambos Workers y `git diff --check` verdes.
- QA visual en `390x844` y `1440x900`: canonical, `lang`, enlaces, calculo y layout correctos; sin overflow ni mezcla ES/EN.

## Decisiones

- Publicar solo capacidades que puedan explicarse con alcance, datos, frecuencia, limites y evidencia por conexion.
- Mantener IT/FR/DE/PT de las fichas de proveedor en `noindex` hasta disponer de localizacion editorial completa.
- No convertir el changelog aportado en promesa comercial automatica. CRM, costes internos de IA, agent bus, impersonacion y diagnosticos de infraestructura no son contenido publico.
- No desplegar este paquete hasta coordinar una revision unica para Pages, Worker y Edge Functions.

## Hipotesis

- Una entrada por objetivo y dos diagnosticos transparentes facilitaran que el visitante entienda que hacer primero.
- Las fichas por proveedor reduciran dudas comerciales si mantienen el alcance condicionado a version, permisos, muestra, mapeo y piloto.
- Para Estados Unidos, mantener la continuidad de idioma desde anuncio hasta demo y completar las paginas de producto tendra mas impacto que añadir nuevas herramientas aisladas.

## Contradicciones y deuda

- La web no esta traducida al 100%. Los dos diagnosticos prioritarios ya estan en EN, pero otros tramos de producto y conversion siguen incompletos para USA.
- Las rutas IT/FR/DE/PT de integraciones son tecnicas y `noindex`; no equivalen a fichas comerciales localizadas.
- Carta Architect, Armonias, control de mermas, pedido recomendado y conciliacion TPV/stock existen en producto o en evidencia interna, pero carecen de paginas publicas completas y verificables.
- Falta una superficie publica de Novedades que excluya capacidades internas.
- Deno no esta instalado en este host, por lo que el check de Edge Functions queda pendiente en un entorno compatible.
- Persisten avisos anteriores: clave duplicada en `Precios`, React Router v7, Browserslist desactualizado y chunks grandes. No bloquean este paquete.

## Prioridades

### P0

- No se ha detectado un P0 nuevo en este bloque local.

### P1

1. Crear la pagina publica de Carta Architect con evidencia real y limites claros.
2. Crear paginas o un recorrido de operacion diaria para Armonias, mermas, pedido recomendado y conciliacion TPV/stock.
3. Consolidar Git, ejecutar Deno check y coordinar un release unico con QA productiva.

### P2

1. Crear Novedades/changelog publico filtrando funciones internas.
2. Localizar las fichas Agora/REVO en IT/FR/DE/PT.
3. Completar la auditoria global de idioma, canonical, hreflang, shell inicial y paridad humano/bot.

### P3

1. Corregir la clave duplicada de `Precios`.
2. Planificar React Router v7 y actualizacion de Browserslist.
3. Reducir chunks grandes mediante division de codigo donde aporte mejora medible.

## Quick wins completados

- Calculadora de tiempo ES/EN con ejemplo ficticio: `6 h/semana`, `26 h/mes`, `312 h/ano` y cobertura `8/8`.
- Diagnostico de rentabilidad ES/EN con USD por defecto en la ruta inglesa y cuatro magnitudes no agregadas.
- Entrada guiada en Herramientas/Recursos.
- Fichas Agora/REVO ES/EN.
- Limpieza de claims no demostrados.
- Paridad de rutas y SEO entre frontend, sitemap, prerender y Workers.

## Gate de release

No publicar hasta tener una revision coordinada, Deno check, origenes alineados y QA productiva de humano, Googlebot, OAI, sitemap, canonical, hreflang, home, funcionalidades y legales.

Commits locales: `41d354d1` (integraciones y tiempo ES/EN) y `05167b22` (rentabilidad EN/USD).
