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
  "/producto/winerim-supply",
  "/en/product/winerim-supply",
  "/fr/produit/winerim-supply",
  "/it/prodotto/winerim-supply",
  "/de/produkt/winerim-supply",
  "/pt/produto/winerim-supply",
  "/producto/savia",
  "/en/product/savia",
  "/fr/produit/savia",
  "/it/prodotto/savia",
  "/de/produkt/savia",
  "/pt/produto/savia",
  "/integraciones",
  "/en/integrations",
  "/fr/integrations",
  "/it/integrazioni",
  "/de/integrationen",
  "/pt/integracoes",
  "/herramientas",
  "/en/tools",
  "/fr/outils",
  "/it/strumenti",
  "/de/tools",
  "/pt/ferramentas",
]);

const COMMERCIAL_AUDIT_ROUTES = new Set([
  "/software-carta-de-vinos",
  "/en/wine-list-management-software",
  "/it/software-carta-vini",
  "/fr/logiciel-carte-des-vins",
  "/de/weinkarten-software",
  "/pt/software-carta-vinhos",
  "/analisis-carta",
  "/en/wine-list-analysis",
  "/it/analisi-carta",
  "/fr/analyse-carte",
  "/de/weinkarten-analyse",
  "/pt/analise-carta",
]);

const REACT_ROUTES = new Set([
  ...PRODUCT_ARCHITECTURE_ROUTES,
  ...COMMERCIAL_AUDIT_ROUTES,
  "/precios-modulos-integraciones",
  "/herramientas/diagnostico-rentabilidad-bodega",
  "/simulador-carta",
  "/en/wine-list-simulator",
  "/fr/simulateur-carte",
  "/it/simulatore-carta",
  "/de/weinkarten-simulator",
  "/pt/simulador-carta",
  "/presentacion",
  "/presentacion/catalonia",
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

const PROFITABILITY_DIAGNOSTIC_ROUTE = "/herramientas/diagnostico-rentabilidad-bodega";
const PROFITABILITY_DIAGNOSTIC_URL = `https://winerim.wine${PROFITABILITY_DIAGNOSTIC_ROUTE}`;
const PROFITABILITY_DIAGNOSTIC_TITLE = "Diagnóstico de Rentabilidad de Bodega | Winerim";
const PROFITABILITY_DIAGNOSTIC_DESCRIPTION = "Calcula escenarios de ahorro en compras, margen adicional, horas recuperables y capital inmovilizado sin mezclar las magnitudes.";
const PROFITABILITY_DIAGNOSTIC_BOT_HTML = `
  <main id="winerim-profitability-diagnostic">
    <h1>Diagnóstico de rentabilidad de bodega</h1>
    <p>Compras, margen, tiempo y stock: cuatro lecturas separadas para decidir dónde actuar primero.</p>
    <section>
      <h2>Cuatro magnitudes sin atajos</h2>
      <p>El diagnóstico separa ahorro de costes, margen bruto de contribución adicional, capacidad operativa recuperable y capital circulante potencialmente liberable. Las cifras no se suman ni se presentan como ROI.</p>
    </section>
    <section>
      <h2>Supuestos transparentes y editables</h2>
      <p>Cada resultado muestra su fórmula y usa los datos introducidos por el usuario. Los mínimos y máximos son escenarios, no garantías ni intervalos estadísticos.</p>
    </section>
    <section>
      <h2>Resultado antes del contacto</h2>
      <p>El cálculo completo se realiza localmente en el navegador y aparece antes de cualquier invitación a solicitar una demo.</p>
    </section>
  </main>
`;

const ARTICLE_ROUTE_RE = /^\/(?:(?:en|fr|it|de|pt)\/)?article\/[^/]+$/;
const isReactRoute = (path) => REACT_ROUTES.has(path) || ARTICLE_ROUTE_RE.test(path);

const ARTICLE_MARKER_CLEANER_SCRIPT = `<script>
(() => {
  const markerPattern = /(?:<!--|&lt;!--)\\s*winerim-content-expansion-[\\s\\S]*?(?:-->|--&gt;)/gi;
  const cleanArticleMarkers = () => {
    if (!document.body) return;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let node;
    while ((node = walker.nextNode())) {
      markerPattern.lastIndex = 0;
      if (markerPattern.test(node.nodeValue || "")) nodes.push(node);
    }
    for (const textNode of nodes) {
      textNode.nodeValue = (textNode.nodeValue || "").replace(markerPattern, "").trimStart();
    }
  };
  const scheduleClean = () => setTimeout(cleanArticleMarkers, 0);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", cleanArticleMarkers, { once: true });
  } else {
    cleanArticleMarkers();
  }
  new MutationObserver(scheduleClean).observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true,
  });
})();
</script>`;

const CATALONIA_ROUTE = "/presentacion/catalonia";
const CATALONIA_ASSET_PREFIX = "/catalonia-assets/";
const LEGACY_CLIENT_ROUTE = "/presentacion/saddle";
const GENERIC_PROPOSAL_ROUTE = "/propuesta-comercial";
const REVO_PROPOSAL_ROUTE = "/propuesta-comercial-revo";
const COMMERCIAL_ASSET_PREFIX = "/commercial-assets/";
const PRIVATE_ROUTES = new Set(["/deck", "/presentacion-anterior"]);
PRIVATE_ROUTES.add(CATALONIA_ROUTE);
PRIVATE_ROUTES.add(GENERIC_PROPOSAL_ROUTE);
PRIVATE_ROUTES.add(REVO_PROPOSAL_ROUTE);
const BACKEND_HUMAN_ROUTES = new Set(["/precios-modulos-integraciones"]);

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
const isNoindexRoute = (path) => NOINDEX_ROUTES.has(path) || path.startsWith("/legal/");

const acceptsEnglish = (request) => {
  const firstLanguage = (request.headers.get("Accept-Language") || "")
    .split(",")[0]
    .trim()
    .toLowerCase();
  return firstLanguage === "en" || firstLanguage.startsWith("en-");
};

const shouldRedirectUsHomeToEnglish = (request, path, ua) => (
  path === "/"
  && request.method === "GET"
  && !BOT_REGEX.test(ua)
  && (request.cf?.country === "US" || acceptsEnglish(request))
);

const getClientCacheControl = (path) => {
  if (path.startsWith("/assets/")) return "public, max-age=31536000, immutable";
  if (PRIVATE_ROUTES.has(path)) return "no-store, max-age=0";
  if (REACT_ROUTES.has(path)) return "no-store, max-age=0";
  if (ARTICLE_ROUTE_RE.test(path)) return "no-store, max-age=0";
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

const fetchCataloniaOrigin = async (request, env, path) => {
  const frontendOrigin = new URL(env.CATALONIA_ORIGIN);
  const target = new URL(request.url);
  target.protocol = frontendOrigin.protocol;
  target.hostname = frontendOrigin.hostname;
  target.port = frontendOrigin.port;
  if (path.startsWith(CATALONIA_ASSET_PREFIX)) {
    target.pathname = path.slice("/catalonia-assets".length);
  }

  return fetch(new Request(target, {
    method: request.method === "HEAD" ? "GET" : request.method,
    headers: request.headers,
    body: request.method === "GET" || request.method === "HEAD" ? undefined : request.body,
    redirect: "follow",
  }));
};

const fetchCommercialOrigin = async (request, env, path) => {
  const frontendOrigin = new URL(env.COMMERCIAL_ORIGIN);
  const target = new URL(request.url);
  target.protocol = frontendOrigin.protocol;
  target.hostname = frontendOrigin.hostname;
  target.port = frontendOrigin.port;
  if (
    path.startsWith(COMMERCIAL_ASSET_PREFIX)
    && !path.startsWith(`${COMMERCIAL_ASSET_PREFIX}product-proof/`)
  ) {
    target.pathname = path.slice("/commercial-assets".length);
  }

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
  if (isReactRoute(path)) {
    headers.set("Pragma", "no-cache");
    headers.set("Expires", "0");
  } else {
    headers.delete("Pragma");
    headers.delete("Expires");
  }
  if (isNoindexRoute(path)) {
    headers.set("X-Robots-Tag", "noindex, follow");
  } else {
    headers.delete("X-Robots-Tag");
  }

  const nextResponse = new Response(requestMethod === "HEAD" ? null : response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });

  if (
    ARTICLE_ROUTE_RE.test(path)
    && requestMethod !== "HEAD"
    && (headers.get("Content-Type") || "").includes("text/html")
  ) {
    return new HTMLRewriter()
      .on("body", {
        element(element) {
          element.append(ARTICLE_MARKER_CLEANER_SCRIPT, { html: true });
        },
      })
      .transform(nextResponse);
  }

  return nextResponse;
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
      ...(isNoindexRoute(path) ? { "X-Robots-Tag": "noindex, follow" } : {}),
    },
  });
};

const withProfitabilityDiagnosticBotMetadata = (response, requestMethod = "GET") => {
  if (requestMethod === "HEAD") return response;
  const contentType = response.headers.get("Content-Type") || "";
  if (!contentType.includes("text/html")) return response;

  return new HTMLRewriter()
    .on("html", {
      element(element) {
        element.setAttribute("lang", "es");
      },
    })
    .on("title", {
      element(element) {
        element.setInnerContent(PROFITABILITY_DIAGNOSTIC_TITLE);
      },
    })
    .on('meta[name="description"]', {
      element(element) {
        element.setAttribute("content", PROFITABILITY_DIAGNOSTIC_DESCRIPTION);
      },
    })
    .on('meta[name="robots"]', {
      element(element) {
        element.setAttribute("content", "index, follow");
      },
    })
    .on('link[rel="canonical"]', {
      element(element) {
        element.setAttribute("href", PROFITABILITY_DIAGNOSTIC_URL);
      },
    })
    .on("body", {
      element(element) {
        element.append(PROFITABILITY_DIAGNOSTIC_BOT_HTML, { html: true });
      },
    })
    .transform(response);
};

const fetchSitemapWithProfitabilityDiagnostic = async (request, env) => {
  const response = await env.BACKEND.fetch(request);
  const contentType = response.headers.get("Content-Type") || "";
  if (!response.ok || !contentType.includes("xml") || request.method === "HEAD") return response;

  const xml = await response.text();
  if (xml.includes(`<loc>${PROFITABILITY_DIAGNOSTIC_URL}</loc>`)) {
    return new Response(xml, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  }

  const entry = `<url><loc>${PROFITABILITY_DIAGNOSTIC_URL}</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`;
  const patchedXml = xml.replace("</urlset>", `${entry}</urlset>`);
  const headers = new Headers(response.headers);
  headers.delete("Content-Length");
  headers.set("X-Winerim-Sitemap-Patch", "profitability-diagnostic");
  return new Response(patchedXml, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};

const withCataloniaDocumentMetadata = (response, requestMethod = "GET") => {
  if (requestMethod === "HEAD") return response;
  const contentType = response.headers.get("Content-Type") || "";
  if (!contentType.includes("text/html")) return response;

  return new HTMLRewriter()
    .on("title", {
      element(element) {
        element.setInnerContent("Catalonia Group · Condiciones | Winerim");
      },
    })
    .on('link[rel="canonical"]', {
      element(element) {
        element.setAttribute("href", "https://winerim.wine/presentacion/catalonia");
      },
    })
    .on("head", {
      element(element) {
        element.append('<meta name="robots" content="noindex, follow">', { html: true });
      },
    })
    .transform(response);
};

const fetchCataloniaPage = async (request, env, path) => {
  const cache = caches.default;
  const cacheUrl = new URL(request.url);
  cacheUrl.searchParams.set("__catalonia_release", env.CATALONIA_RELEASE || "default");
  const cacheKey = new Request(cacheUrl, { method: "GET" });
  const cached = await cache.match(cacheKey);
  if (cached) {
    return withCataloniaDocumentMetadata(
      withFrontendHeaders(cached, path, request.method),
      request.method,
    );
  }

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetchCataloniaOrigin(request, env, path);
      if (response.ok && (response.headers.get("Content-Type") || "").includes("text/html")) {
        const cacheHeaders = new Headers(response.headers);
        cacheHeaders.set("Cache-Control", "public, max-age=31536000, immutable");
        const cacheable = new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: cacheHeaders,
        });
        await cache.put(cacheKey, cacheable.clone());
        return withCataloniaDocumentMetadata(
          withFrontendHeaders(cacheable, path, request.method),
          request.method,
        );
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
      "X-Winerim-Router": "catalonia-pages-unavailable",
      "X-Robots-Tag": "noindex, follow",
    },
  });
};

const fetchCataloniaAsset = async (request, env, path) => {
  try {
    const response = await fetchCataloniaOrigin(request, env, path);
    const contentType = response.headers.get("Content-Type") || "";
    if (response.ok && !contentType.includes("text/html")) {
      const headers = new Headers(response.headers);
      headers.set("Cache-Control", "public, max-age=31536000, immutable");
      headers.set("X-Winerim-Router", "catalonia-pages-asset");
      return new Response(request.method === "HEAD" ? null : response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    }
  } catch {
    // Return an explicit failure instead of falling through to another release.
  }

  return new Response("Asset no disponible", {
    status: 404,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Winerim-Router": "catalonia-pages-asset-missing",
    },
  });
};

const withProposalDocumentMetadata = (response, path, requestMethod = "GET") => {
  if (requestMethod === "HEAD") return response;
  const contentType = response.headers.get("Content-Type") || "";
  if (!contentType.includes("text/html")) return response;

  return new HTMLRewriter()
    .on("title", {
      element(element) {
        element.setInnerContent(path === REVO_PROPOSAL_ROUTE
          ? "Propuesta comercial REVO | Winerim"
          : "Propuesta comercial | Winerim");
      },
    })
    .on('link[rel="canonical"]', {
      element(element) {
        element.setAttribute("href", `https://winerim.wine${path}`);
      },
    })
    .on("head", {
      element(element) {
        element.append('<meta name="robots" content="noindex, follow">', { html: true });
      },
    })
    .transform(response);
};

const fetchCommercialPage = async (request, env, path) => {
  const cache = caches.default;
  const cacheUrl = new URL(request.url);
  cacheUrl.searchParams.set("__commercial_release", env.COMMERCIAL_RELEASE || "default");
  const cacheKey = new Request(cacheUrl, { method: "GET" });
  const cached = await cache.match(cacheKey);
  if (cached) {
    return withProposalDocumentMetadata(
      withFrontendHeaders(cached, path, request.method),
      path,
      request.method,
    );
  }

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetchCommercialOrigin(request, env, path);
      if (response.ok && (response.headers.get("Content-Type") || "").includes("text/html")) {
        const cacheHeaders = new Headers(response.headers);
        cacheHeaders.set("Cache-Control", "public, max-age=31536000, immutable");
        const cacheable = new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: cacheHeaders,
        });
        await cache.put(cacheKey, cacheable.clone());
        return withProposalDocumentMetadata(
          withFrontendHeaders(cacheable, path, request.method),
          path,
          request.method,
        );
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
      "X-Winerim-Router": "commercial-pages-unavailable",
      "X-Robots-Tag": "noindex, follow",
    },
  });
};

const fetchCommercialAsset = async (request, env, path) => {
  try {
    const response = await fetchCommercialOrigin(request, env, path);
    const contentType = response.headers.get("Content-Type") || "";
    if (response.ok && !contentType.includes("text/html")) {
      const headers = new Headers(response.headers);
      headers.set("Cache-Control", "public, max-age=31536000, immutable");
      headers.set("X-Winerim-Router", "commercial-pages-asset");
      return new Response(request.method === "HEAD" ? null : response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    }
  } catch {
    // Return an explicit failure instead of falling through to another release.
  }

  return new Response("Asset no disponible", {
    status: 404,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Winerim-Router": "commercial-pages-asset-missing",
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

    if (shouldRedirectUsHomeToEnglish(request, path, ua)) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: "https://winerim.wine/en",
          "Cache-Control": "no-store, max-age=0",
          "X-Winerim-Router": "us-home-locale-redirect",
        },
      });
    }

    if (path === LEGACY_CLIENT_ROUTE) {
      return new Response(null, {
        status: 301,
        headers: {
          Location: "https://winerim.wine/propuesta-comercial",
          "Cache-Control": "no-store, max-age=0",
          "X-Robots-Tag": "noindex, follow",
          "X-Winerim-Router": "legacy-commercial-redirect",
        },
      });
    }

    if (path === CATALONIA_ROUTE) {
      return fetchCataloniaPage(request, env, path);
    }

    if (path.startsWith(CATALONIA_ASSET_PREFIX)) {
      return fetchCataloniaAsset(request, env, path);
    }

    if (path === GENERIC_PROPOSAL_ROUTE || path === REVO_PROPOSAL_ROUTE) {
      return fetchCommercialPage(request, env, path);
    }

    if (path === "/sitemap.xml" || path === "/sitemap") {
      return fetchSitemapWithProfitabilityDiagnostic(request, env);
    }

    if (path.startsWith(COMMERCIAL_ASSET_PREFIX)) {
      return fetchCommercialAsset(request, env, path);
    }

    if (PRIVATE_ROUTES.has(path)) {
      return fetchReactPage(request, env, path);
    }

    if (!BOT_REGEX.test(ua) && BACKEND_HUMAN_ROUTES.has(path)) {
      return env.BACKEND.fetch(request);
    }

    if (BOT_REGEX.test(ua)) {
      if (path === PROFITABILITY_DIAGNOSTIC_ROUTE) {
        const response = await fetchReactPage(request, env, path);
        return withProfitabilityDiagnosticBotMetadata(response, request.method);
      }
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

    if (isReactRoute(path)) {
      return fetchReactPage(request, env, path);
    }

    if (path.startsWith("/assets/")) {
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
