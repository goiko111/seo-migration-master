# 2Ampliar Biblioteca del vino - criterios de aceptacion

Fecha: 2026-09-28

Alcance: cierre tecnico y editorial local de Biblioteca del vino, Aprender vino y
su conexion con Blog. Este paquete no autoriza despliegues, migraciones remotas,
publicaciones en Lovable ni acciones en Search Console.

## Hechos confirmados

- El repositorio fuente vigente es `https://github.com/goiko111/seo-migration-master.git`.
- El trabajo se aisla desde `8879ef49` en el worktree
  `/Users/GOIKO/codex-workspaces/winerim-wine-library-complete-20260928`.
- La produccion devuelve `200` y prerender localizado para una muestra de Biblioteca,
  pero el HTML inicial humano mantiene `lang=es`, title de home y canonical de home.
- El prerender aleman de `carnes-rojas` conserva el nombre espanol en el title.
- El frontend actual del Blog vuelve a contenido ES cuando un idioma no tiene filas.
- Seis temas publicables del calendario 2026-08-17 a 2026-09-28 no existian en el
  repositorio vigente como lotes editoriales completos de seis idiomas. El lote del
  2026-09-21 sigue congelado para evitar canibalizacion con el blog del 2026-09-28.

## Contradiccion externa descartada

El adjunto recibido junto a esta ejecucion contiene SQL de otro producto. No es una
especificacion de Winerim, no se ha aplicado y no se ha incorporado al paquete.

## Decisiones

- No reutilizar el commit antiguo `9c374e5` completo: su diff efectivo arrastraba
  contenido editorial no autorizado. Se portaran solo soluciones verificadas y
  compatibles con la rama vigente.
- No publicar ni desplegar. Se prepara un candidato local reproducible.
- No mostrar contenido ES bajo URL internacional. Si no existe una pieza localizada,
  la interfaz debe usar contenido estatico del mismo idioma o un estado vacio localizado.
- Cada tema editorial nuevo tendra seis variantes completas: ES, EN, IT, FR, DE y PT.

## Criterios de aceptacion

### Fuente y seguridad

- [x] El diff parte de `8879ef49` y no mezcla cambios no relacionados del checkout comercial.
- [x] No aparecen identificadores, tablas, buckets ni funciones del producto ajeno.
- [x] Las migraciones editoriales son data-only, idempotentes y no relajan RLS.

### SEO e internacionalizacion

- [x] `SEOHead` evita sufijos de marca duplicados en todos los separadores soportados.
- [x] Las fichas de uva no entregan titles de entrada que ya incluyan `Winerim`.
- [x] El HTML inicial resuelve idioma, title, description y canonical por ruta; React
      completa los alternates localizados.
- [x] El prerender localiza nombres de entidades en title, H1, breadcrumbs y schema.
- [x] Las seis familias de rutas de Biblioteca tienen canonical propio y alternates completos.
- [x] Sitemap y prerender conocen todos los lotes publicados y excluyen contenido futuro.
- [x] No existen marcadores internos, tokens, secretos ni comentarios editoriales visibles.

### UX y contenido

- [x] Biblioteca conserva su funcion de referencia estructurada por entidades.
- [x] Aprender vino conserva su funcion de aprendizaje operativo guiado.
- [x] Blog no muestra contenido ES bajo rutas EN/IT/FR/DE/PT.
- [x] Cada articulo nuevo incluye resumen para IA, al menos cinco H2, ejemplos de
      restaurante, FAQ y enlaces internos localizados.
- [x] Los seis temas publicables del calendario editorial estan preparados en seis idiomas
      con `article_group`, slugs, fechas y `related_links` coherentes. El septimo permanece
      congelado por decision editorial documentada.
- [x] Las paginas clave son utilizables a 390 px y escritorio, sin overflow ni solapes.

### Gates

- [x] TypeScript y build terminan correctamente.
- [x] Pasan las suites focales de Biblioteca, SEO, i18n y articulos.
- [x] Worker y scripts JavaScript pasan comprobacion de sintaxis.
- [x] Las Edge Functions pasan comprobacion TypeScript/Deno.
- [x] El validador de release verifica cobertura de sitemap, prerender y enlaces.
- [x] Playwright valida rutas representativas en seis idiomas y dos viewports.
- [x] Se deja evidencia, diff revisado y paquete de release sin publicarlo.

## Hipotesis por verificar

- Los lotes editoriales antiguos preparados fuera de la rama vigente no llegaron a
  formar parte de la cadena de migraciones canonica; el estado remoto debe confirmarse
  antes de aplicar migraciones para evitar duplicar una ejecucion manual previa.

## Pendientes de produccion

- Autorizacion explicita de release.
- Aplicacion remota controlada de migraciones editoriales, si supera todos los gates.
- Despliegue coordinado de frontend, Worker y Edge Functions sin version drift.
- QA productiva humano/bot y, solo despues, inspeccion selectiva en Search Console.
