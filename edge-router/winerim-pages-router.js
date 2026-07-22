const BOT_REGEX = /googlebot|bingbot|yandexbot|duckduckbot|baiduspider|slurp|facebot|facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegrambot|applebot|semrushbot|ahrefsbot|mj12bot|chatgpt-user|gptbot|oai-searchbot|claudebot|anthropic-ai|perplexitybot|cohere-ai|bytespider|google-extended|ccbot|petalbot|sogou|exabot/i;

const PRODUCT_ARCHITECTURE_ROUTES = new Set([
  "/",
  "/en",
  "/fr",
  "/it",
  "/de",
  "/pt",
  "/funcionalidades",
  "/en/features",
  "/fr/fonctionnalites",
  "/it/funzionalita",
  "/de/funktionen",
  "/pt/funcionalidades",
  "/producto/winerim-core",
  "/en/product/winerim-core",
  "/fr/produit/winerim-core",
  "/it/prodotto/winerim-core",
  "/de/produkt/winerim-core",
  "/pt/produto/winerim-core",
  "/producto/cloudrim",
  "/en/product/cloudrim",
  "/fr/produit/cloudrim",
  "/it/prodotto/cloudrim",
  "/de/produkt/cloudrim",
  "/pt/produto/cloudrim",
]);

const REACT_ROUTES = new Set([
  ...PRODUCT_ARCHITECTURE_ROUTES,
  "/precios-modulos-integraciones",
  "/presentacion",
  "/presentacion-anterior",
  "/deck",
  "/en/presentation",
  "/fr/presentation",
  "/it/presentazione",
  "/de/praesentation",
  "/pt/apresentacao",
  "/politica-privacidad",
  "/privacidad",
  "/terminos-y-condiciones-del-contrato",
  "/terminos",
  "/en/privacy",
  "/en/terms",
  "/it/privacy",
  "/it/termini",
  "/fr/confidentialite",
  "/fr/conditions",
  "/de/datenschutz",
  "/de/agb",
  "/pt/privacidade",
  "/pt/termos",
]);

const PRIVATE_ROUTES = new Set(["/deck", "/presentacion-anterior"]);

const LEGAL_ROUTES = new Set([
  "/politica-privacidad",
  "/privacidad",
  "/terminos-y-condiciones-del-contrato",
  "/terminos",
  "/en/privacy",
  "/en/terms",
  "/it/privacy",
  "/it/termini",
  "/fr/confidentialite",
  "/fr/conditions",
  "/de/datenschutz",
  "/de/agb",
  "/pt/privacidade",
  "/pt/termos",
]);

const NOINDEX_ROUTES = new Set([...LEGAL_ROUTES, ...PRIVATE_ROUTES]);

const getClientCacheControl = (path) => {
  if (path.startsWith("/assets/")) return "public, max-age=31536000, immutable";
  if (path.startsWith("/legal/")) return "public, max-age=3600, s-maxage=86400";
  if (REACT_ROUTES.has(path)) return "no-store, max-age=0";
  return "public, max-age=60, s-maxage=300";
};

const PRICING_ARCHITECTURE_BOT_HTML = `
  <section class="legal-section">
    <h2>Cómo funciona cada módulo dentro de Winerim</h2>
    <p><strong>Core:</strong> recibe la carta, catálogo, precios, formatos, disponibilidad y estructura de bodega. Organiza las referencias y conecta carta, stock, Wine Cellar y Wine Lockers para crear una base operativa común.

<strong>TPV:</strong> recibe artículos, tickets, unidades e ingresos. Mapea las referencias del punto de venta con los vinos de Winerim y entrega rotación, ticket medio y rendimiento real.

<strong>Gestión:</strong> recibe albaranes, facturas, tarifas, pedidos, distribuidores y reportes de stock. CloudRIM clasifica la información y Gestión la convierte en inventario, costes, compras y reposición trazables.

<strong>Márgenes:</strong> cruza coste real, PVP, ventas, formatos y existencias. Calcula margen y rotación, detecta fugas y stock dormido, y prepara criterio de pricing, copa, retirada o reposición.

<strong>Intelligence:</strong> recibe las señales de Core, TPV, Gestión y Márgenes. Los RIMs™ preparan propuestas; SAVia explica el razonamiento y el impacto; el equipo aprueba cualquier acción crítica.

<strong>Full / Managed:</strong> consolida Core Full, RIMs™, SAVia, Winerim Supply, multi-local, API, reporting ejecutivo y acompañamiento para operaciones de mayor complejidad.</p>
  </section>
`;

const PRODUCT_ARCHITECTURE_BOT_COPY = {
  es: {
    title: "Arquitectura Winerim: del dato a la decisión aprobada",
    core: "Winerim Core reúne Core Carta y Core Bodega. Core Bodega incluye Wine Cellar para localizar cada botella y Wine Lockers para controlar reservas privadas, mientras Márgenes cruza costes, PVP, ventas y stock.",
    cloudrim: "CloudRIM recoge cartas, ventas, albaranes, stock, reportes TPV y tarifas de distribuidores, los clasifica y los enruta dentro de Winerim.",
    supply: "Winerim Supply convierte compras, proveedores, tarifas y reposición en una operación trazable.",
    rims: "Los RIMs especializados, incluidos MarginRIM, StockRIM, FocusRIM, ClimateRIM, CleanRIM y SmartRIM, preparan señales y propuestas.",
    savia: "SAVia permite preguntar por carta, ventas, stock, costes, márgenes y oportunidades, explica cada propuesta y mantiene la aprobación humana antes de cualquier acción crítica.",
  },
  en: {
    title: "Winerim architecture: from data to an approved decision",
    core: "Winerim Core brings together Core List and Core Cellar. Core Cellar includes Wine Cellar to locate every bottle and Wine Lockers to control private reserves, while Margins connects costs, prices, sales and stock.",
    cloudrim: "CloudRIM collects wine lists, sales, delivery notes, stock, POS reports and distributor price lists, then classifies and routes them inside Winerim.",
    supply: "Winerim Supply turns purchasing, suppliers, price lists and replenishment into a traceable operation.",
    rims: "Specialised RIMs, including MarginRIM, StockRIM, FocusRIM, ClimateRIM, CleanRIM and SmartRIM, prepare signals and proposals.",
    savia: "SAVia answers questions about the list, sales, stock, costs, margins and opportunities, explains every proposal and keeps human approval before any critical action.",
  },
  fr: {
    title: "Architecture Winerim : de la donnée à la décision approuvée",
    core: "Winerim Core réunit Core Carte et Core Cave. Core Cave comprend Wine Cellar pour localiser chaque bouteille et Wine Lockers pour contrôler les réserves privées, tandis que Marges croise coûts, prix, ventes et stock.",
    cloudrim: "CloudRIM collecte cartes, ventes, bons de livraison, stocks, rapports de caisse et tarifs distributeurs, puis les classe et les achemine dans Winerim.",
    supply: "Winerim Supply transforme achats, fournisseurs, tarifs et réapprovisionnement en une opération traçable.",
    rims: "Les RIMs spécialisés, dont MarginRIM, StockRIM, FocusRIM, ClimateRIM, CleanRIM et SmartRIM, préparent signaux et propositions.",
    savia: "SAVia répond aux questions sur la carte, les ventes, le stock, les coûts, les marges et les opportunités, explique chaque proposition et maintient l'approbation humaine avant toute action critique.",
  },
  it: {
    title: "Architettura Winerim: dal dato alla decisione approvata",
    core: "Winerim Core riunisce Core Carta e Core Cantina. Core Cantina include Wine Cellar per localizzare ogni bottiglia e Wine Lockers per controllare le riserve private, mentre Margini incrocia costi, prezzi, vendite e stock.",
    cloudrim: "CloudRIM raccoglie carte, vendite, bolle, stock, report POS e listini dei distributori, quindi li classifica e li instrada in Winerim.",
    supply: "Winerim Supply trasforma acquisti, fornitori, listini e riordino in un'operazione tracciabile.",
    rims: "I RIMs specializzati, tra cui MarginRIM, StockRIM, FocusRIM, ClimateRIM, CleanRIM e SmartRIM, preparano segnali e proposte.",
    savia: "SAVia risponde alle domande su carta, vendite, stock, costi, margini e opportunità, spiega ogni proposta e mantiene l'approvazione umana prima di qualsiasi azione critica.",
  },
  de: {
    title: "Winerim-Architektur: von Daten zur freigegebenen Entscheidung",
    core: "Winerim Core verbindet Core Weinkarte und Core Weinkeller. Core Weinkeller umfasst Wine Cellar zur Ortung jeder Flasche und Wine Lockers zur Verwaltung privater Reserven, während Margen Kosten, Preise, Verkäufe und Bestand verknüpft.",
    cloudrim: "CloudRIM erfasst Weinkarten, Verkäufe, Lieferscheine, Bestände, Kassensystem-Berichte und Händlerpreislisten, klassifiziert sie und leitet sie in Winerim weiter.",
    supply: "Winerim Supply macht Einkauf, Lieferanten, Preislisten und Nachbestellung zu einem nachvollziehbaren Prozess.",
    rims: "Spezialisierte RIMs wie MarginRIM, StockRIM, FocusRIM, ClimateRIM, CleanRIM und SmartRIM bereiten Signale und Vorschläge vor.",
    savia: "SAVia beantwortet Fragen zu Weinkarte, Verkauf, Bestand, Kosten, Margen und Chancen, erklärt jeden Vorschlag und verlangt vor kritischen Aktionen eine menschliche Freigabe.",
  },
  pt: {
    title: "Arquitetura Winerim: dos dados à decisão aprovada",
    core: "O Winerim Core reúne Core Carta e Core Garrafeira. Core Garrafeira inclui Wine Cellar para localizar cada garrafa e Wine Lockers para controlar reservas privadas, enquanto Margens cruza custos, preços, vendas e stock.",
    cloudrim: "O CloudRIM recolhe cartas, vendas, guias, stock, relatórios de POS e tarifas de distribuidores, classifica-os e encaminha-os dentro do Winerim.",
    supply: "O Winerim Supply transforma compras, fornecedores, tarifas e reposição numa operação rastreável.",
    rims: "Os RIMs especializados, incluindo MarginRIM, StockRIM, FocusRIM, ClimateRIM, CleanRIM e SmartRIM, preparam sinais e propostas.",
    savia: "A SAVia responde a perguntas sobre carta, vendas, stock, custos, margens e oportunidades, explica cada proposta e mantém a aprovação humana antes de qualquer ação crítica.",
  },
};

const getArchitectureLocale = (path) => {
  const locale = path.split("/").filter(Boolean)[0];
  return ["en", "fr", "it", "de", "pt"].includes(locale) ? locale : "es";
};

const renderProductArchitectureBotHtml = (path) => {
  const copy = PRODUCT_ARCHITECTURE_BOT_COPY[getArchitectureLocale(path)];
  return `
    <section id="winerim-product-architecture" aria-labelledby="winerim-product-architecture-title">
      <h2 id="winerim-product-architecture-title">${copy.title}</h2>
      <p><strong>Winerim Core:</strong> ${copy.core}</p>
      <p><strong>CloudRIM:</strong> ${copy.cloudrim}</p>
      <p><strong>Winerim Supply:</strong> ${copy.supply}</p>
      <p><strong>RIMs:</strong> ${copy.rims}</p>
      <p><strong>SAVia:</strong> ${copy.savia}</p>
    </section>
  `;
};

const fetchFrontend = async (request, env) => {
  const frontendOrigin = new URL(env.FRONTEND_ORIGIN);
  const target = new URL(request.url);
  target.protocol = frontendOrigin.protocol;
  target.hostname = frontendOrigin.hostname;
  target.port = frontendOrigin.port;

  return fetch(new Request(target, {
    method: request.method === "HEAD" ? "GET" : request.method,
    headers: request.headers,
    body: request.method === "GET" || request.method === "HEAD" ? undefined : request.body,
    redirect: "follow",
  }));
};

const withFrontendHeaders = (response, path, requestMethod = "GET") => {
  const headers = new Headers(response.headers);
  headers.set("X-Winerim-Router", "react-pages");
  headers.set("X-Frame-Options", "SAMEORIGIN");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Cache-Control", getClientCacheControl(path));
  if (REACT_ROUTES.has(path)) {
    headers.set("Pragma", "no-cache");
    headers.set("Expires", "0");
  } else {
    headers.delete("Pragma");
    headers.delete("Expires");
  }
  if (NOINDEX_ROUTES.has(path)) {
    headers.set("X-Robots-Tag", "noindex, follow");
  } else {
    headers.delete("X-Robots-Tag");
  }

  return new Response(requestMethod === "HEAD" ? null : response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};

const fetchReactPage = async (request, env, path) => {
  const cache = caches.default;
  const cacheUrl = new URL(request.url);
  cacheUrl.searchParams.set("__frontend_release", env.FRONTEND_RELEASE || "default");
  const cacheKey = new Request(cacheUrl, { method: "GET" });
  const cached = await cache.match(cacheKey);
  if (cached) return withFrontendHeaders(cached, path, request.method);

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetchFrontend(request, env);
      if (response.ok && (response.headers.get("Content-Type") || "").includes("text/html")) {
        const cacheHeaders = new Headers(response.headers);
        cacheHeaders.set("Cache-Control", "public, max-age=31536000, immutable");
        const cacheable = new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: cacheHeaders,
        });
        await cache.put(cacheKey, cacheable.clone());
        return withFrontendHeaders(cacheable, path, request.method);
      }
    } catch {
      // Retry transient Pages propagation or network failures.
    }
  }

  return new Response("Servicio temporalmente no disponible", {
    status: 503,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Retry-After": "15",
      "X-Winerim-Router": "react-pages-unavailable",
      ...(NOINDEX_ROUTES.has(path) ? { "X-Robots-Tag": "noindex, follow" } : {}),
    },
  });
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname.length > 1 && url.pathname.endsWith("/")
      ? url.pathname.slice(0, -1)
      : url.pathname;
    const ua = request.headers.get("User-Agent") || "";

    if (url.hostname !== "winerim.wine") {
      return env.BACKEND.fetch(request);
    }

    if (PRIVATE_ROUTES.has(path)) {
      return fetchReactPage(request, env, path);
    }

    if (BOT_REGEX.test(ua)) {
      const response = await env.BACKEND.fetch(request);
      const contentType = response.headers.get("Content-Type") || "";
      if (
        path === "/precios-modulos-integraciones"
        && request.method === "GET"
        && response.ok
        && contentType.includes("text/html")
      ) {
        return new HTMLRewriter()
          .on("article", {
            element(element) {
              element.append(PRICING_ARCHITECTURE_BOT_HTML, { html: true });
            },
          })
          .transform(response);
      }
      if (
        PRODUCT_ARCHITECTURE_ROUTES.has(path)
        && request.method === "GET"
        && response.ok
        && contentType.includes("text/html")
      ) {
        return new HTMLRewriter()
          .on("body", {
            element(element) {
              element.append(renderProductArchitectureBotHtml(path), { html: true });
            },
          })
          .transform(response);
      }
      return response;
    }

    if (REACT_ROUTES.has(path)) {
      return fetchReactPage(request, env, path);
    }

    if (path.startsWith("/assets/") || path.startsWith("/legal/")) {
      try {
        const response = await fetchFrontend(request, env);
        const contentType = response.headers.get("Content-Type") || "";
        if (response.ok && !contentType.includes("text/html")) {
          return withFrontendHeaders(response, path);
        }
      } catch {
        // Fall through to the existing origin for previous frontend assets.
      }
    }

    return env.BACKEND.fetch(request);
  },
};
