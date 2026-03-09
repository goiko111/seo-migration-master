import PainTemplate from "@/components/templates/PainTemplate";
import type { PainPageData } from "@/components/templates/PainTemplate";

const data: PainPageData = {
  slug: "problemas/carta-de-vinos-no-vende",
  metaTitle: "¿Tu Carta de Vinos No Vende? Diagnóstico y Solución",
  metaDescription: "¿Tu carta de vinos no genera ventas? Descubre las 5 causas más comunes y cómo solucionarlas con datos, estrategia y tecnología.",
  heroTitle: "Tu carta de vinos no vende",
  heroSubtitle: "Es uno de los problemas más frecuentes en restauración. La buena noticia: tiene solución. Te explicamos por qué ocurre y cómo corregirlo.",
  heroBadge: "Diagnóstico",
  ctaPrimaryText: "Analiza tu carta gratis",
  ctaPrimaryUrl: "/analisis-carta",
  ctaFinalTitle: "No dejes que tu carta siga perdiendo dinero",
  ctaFinalDescription: "Con Winerim puedes diagnosticar tu carta de vinos en minutos y recibir recomendaciones accionables para mejorar tus ventas.",

  symptom: "Tienes una carta de vinos con buenas referencias, pero las ventas de vino son bajas. Los comensales piden ʻel vino de la casaʼ o directamente no piden vino. El ticket medio en vino está estancado.",
  symptomDetails: "Este problema afecta a más del 60% de los restaurantes. No se trata de la calidad de los vinos, sino de cómo se presentan, se estructuran y se recomiendan.",

  causes: [
    "La carta tiene demasiadas referencias y el cliente se bloquea ante tanta elección. La parálisis de decisión hace que elija lo más barato o no pida nada.",
    "Los precios no están bien estructurados. No hay una franja de precio clara que invite a comprar, o el vino más barato es demasiado caro.",
    "La carta no ofrece orientación. Sin notas de cata, maridajes o categorías claras, el cliente no sabe qué elegir y depende de un camarero que no siempre puede recomendar.",
    "El personal de sala no tiene formación ni herramientas para recomendar vino. Sin confianza, evitan la recomendación.",
    "La carta no se actualiza. Vinos sin rotación, precios desactualizados y referencias que no encajan con el menú actual.",
  ],

  economicImpact: "Un restaurante con 100 cubiertos diarios que mejore su ratio de venta de vino del 30% al 50% puede generar entre 3.000€ y 8.000€ adicionales al mes solo en vino.",
  economicImpactDetails: "El impacto no es solo en ingresos. El vino tiene un margen bruto superior al de la comida (60-75% vs 30-40%), por lo que cada botella vendida contribuye desproporcionadamente al beneficio del restaurante.",

  solution: [
    {
      step: "Audita tu carta actual",
      description: "Analiza cuántas referencias tienes, cuáles se venden y cuáles no. Identifica los vinos con más de 90 días sin venta y elimínalos o sustitúyelos. Usa datos reales, no intuición.",
    },
    {
      step: "Reestructura por estilo, no por región",
      description: "Organiza la carta en categorías que el cliente entienda: blancos frescos, tintos elegantes, espumosos... Evita la jerga técnica. El objetivo es que cualquier comensal pueda elegir sin sentirse perdido.",
    },
    {
      step: "Optimiza el pricing",
      description: "Revisa la curva de precios. Asegúrate de tener opciones atractivas en la franja de 20-35€ que es la más vendida. Aplica márgenes escalonados, no un multiplicador fijo.",
    },
    {
      step: "Añade orientación a la carta",
      description: "Incluye notas de cata breves, iconos de intensidad, sugerencias de maridaje y destacados del sommelier. Cada elemento que ayude al cliente a decidir es una oportunidad de venta.",
    },
    {
      step: "Implementa herramientas digitales",
      description: "Una carta digital con filtros, recomendaciones y maridajes automáticos multiplica la conversión. El cliente puede explorar sin depender exclusivamente del personal de sala.",
    },
    {
      step: "Mide y optimiza continuamente",
      description: "Establece KPIs: ratio de mesas que piden vino, ticket medio en vino, rotación de referencias. Revisa estos datos mensualmente y ajusta la carta en consecuencia.",
    },
  ],

  winerimModules: [
    {
      name: "Carta digital interactiva",
      description: "Permite al comensal explorar la carta con filtros por estilo, precio, maridaje y región. Elimina la parálisis de elección.",
    },
    {
      name: "Recomendador inteligente",
      description: "Sugiere vinos basándose en las preferencias del cliente y el menú elegido. Funciona como un sommelier digital disponible 24/7.",
    },
    {
      name: "Maridajes automáticos",
      description: "Vincula cada plato del menú con los vinos más adecuados de la carta. Facilita la venta cruzada sin depender de la formación del personal.",
    },
    {
      name: "Analítica de ventas",
      description: "Dashboard con datos reales de qué se vende, qué no rota, qué márgenes genera cada referencia y cómo evoluciona el ticket medio.",
    },
    {
      name: "Gestión de vino por copa",
      description: "Módulo específico para gestionar la oferta de vino por copa, optimizar precios y rotar referencias de forma inteligente.",
    },
    {
      name: "Optimización de precios",
      description: "Herramientas de pricing inteligente que analizan tu carta y sugieren ajustes para maximizar el margen bruto sin perder competitividad.",
    },
  ],

  faqs: [
    {
      q: "¿Cómo sé si mi carta de vinos no está funcionando?",
      a: "Los indicadores principales son: menos del 40% de las mesas piden vino, más del 30% de las referencias no se venden en 90 días, y el ticket medio en vino lleva 6+ meses estancado.",
    },
    {
      q: "¿Cuánto tiempo tarda en verse el impacto de optimizar la carta?",
      a: "Los cambios en estructura, pricing y presentación suelen mostrar resultados en 4-8 semanas. Los restaurantes que implementan carta digital suelen ver un aumento del 15-25% en ventas de vino en el primer trimestre.",
    },
    {
      q: "¿Necesito un sommelier para tener una buena carta?",
      a: "No necesariamente. Con las herramientas adecuadas (como Winerim), cualquier restaurante puede tener una carta profesional con recomendaciones, maridajes y pricing optimizado sin depender de un sommelier a tiempo completo.",
    },
    {
      q: "¿Cuántas referencias debería tener mi carta?",
      a: "Depende de tu tipo de restaurante, pero la regla general es: mejor 50 referencias bien seleccionadas y que roten que 150 que generan confusión y stock muerto. Cada vino debe justificar su presencia con datos de venta.",
    },
  ],

  relatedLinks: [
    { label: "Cómo hacer una carta de vinos rentable", url: "/como-hacer-una-carta-de-vinos" },
    { label: "Cómo vender más vino en un restaurante", url: "/como-vender-mas-vino-en-un-restaurante" },
    { label: "Calculadora de margen de vino", url: "/calculadora-margen-vino" },
    { label: "Analizador de carta de vinos", url: "/analisis-carta" },
    { label: "Carta papel vs carta digital", url: "/carta-papel-vs-digital" },
    { label: "Software de carta de vinos", url: "/software-carta-de-vinos" },
  ],
};

const CartaNoVende = () => <PainTemplate data={data} />;

export default CartaNoVende;
