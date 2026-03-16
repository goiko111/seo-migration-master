import { Wine } from "lucide-react";
import type { DeepAreaContent } from "./margenesPricing";

const vinoPorCopaContent: DeepAreaContent = {
  name: "Vino por copa",
  tagline: "El programa de copa como motor de margen",
  intro: "Esta sección te ayuda a diseñar, ejecutar y controlar un programa de vino por copa rentable. La copa no es solo 'servir por unidades más pequeñas': es una palanca de margen, una herramienta de conversión y un test de mercado en tiempo real. Pero mal gestionada, es la mayor fuente de pérdida invisible en un restaurante.",
  icon: Wine,
  accent: "text-purple-500",
  bg: "bg-purple-500/10",
  links: [
    { label: "Calculadora precio por copa", href: "/herramientas/calculadora-precio-vino-por-copa", description: "Calcula el precio de copa incluyendo merma real y margen objetivo" },
    { label: "Guía: Vino por copa", href: "/guias/como-implantar-vino-por-copa-sin-perder-margen", description: "Paso a paso para montar un programa de copa rentable" },
    { label: "Plantilla: Estrategia de vinos por copa", href: "/recursos/plantilla-estrategia-vinos-por-copa", description: "Diseña tu selección de copas con criterio de negocio" },
    { label: "Plantilla: Formación exprés para sala", href: "/recursos/plantilla-formacion-expres-sala", description: "Forma a tu equipo para recomendar copa con criterio en 30 minutos" },
    { label: "Winerim Core", href: "/producto/winerim-core", description: "Monitoriza rotación, merma y rentabilidad por copa automáticamente" },
    { label: "Blog: Precio por copa sin comerse el margen", href: "/article/como-calcular-precio-por-copa-sin-comerte-margen", description: "Fórmula correcta para fijar precios de copa con merma real" },
    { label: "Blog: Qué vinos ofrecer por copa", href: "/article/que-vinos-ofrecer-por-copa-segun-tipo-local", description: "Selección de copa según tipo de local y perfil de cliente" },
  ],
  subtopics: [
    {
      id: "cuando-conviene-copa",
      title: "Cuándo conviene sacar un vino por copa",
      porQueTeLoMostramos: { detected: "Winerim ha identificado referencias con demanda potencial por copa: buena valoración, baja rotación por botella y perfil resistente a la oxidación.", whyMatters: "La copa reduce la barrera de entrada del comensal. Un vino que nadie pide en botella a 35 € puede venderse fácilmente a 9 € la copa.", riskIfIgnored: "Pierdes conversión, ticket medio y exploración. El comensal que no se atreve con la botella simplemente no pide vino." },
      queSignifica:
        "Un vino es buen candidato para copa cuando cumple tres condiciones a la vez: tiene demanda potencial (el comensal lo pediría si pudiera probar sin comprometerse con una botella), aguanta abierto al menos 24-48 horas sin perder calidad, y su rotación esperada por copa permite terminar la botella antes de que se degrade. Si falla una de las tres, no es buen candidato.",
      porQueImporta:
        "Porque la copa reduce la barrera de entrada del comensal. El cliente que no se atreve con una botella de 35 € sí pide una copa de 9 €. Eso aumenta la conversión, el ticket medio y la exploración. Además, la copa te permite rotar referencias que por botella serían lentas. Bien elegida, una copa es tu mejor vendedor silencioso.",
      queHacer: [
        "Revisa tus referencias con buena valoración pero baja rotación por botella: son candidatas naturales a copa.",
        "Comprueba que el vino aguanta abierto al menos 24h (consulta al proveedor o pruébalo tú mismo).",
        "Estima cuántas copas puedes vender por semana de esa referencia. Si son menos de 3, probablemente no compensa.",
        "Empieza con 4-6 copas bien seleccionadas antes de ampliar. Mejor pocas que roten que muchas que se pierdan.",
      ],
      errores: [
        { mistake: "Poner por copa el vino más barato de la carta", consequence: "El comensal asocia copa con calidad baja. Pierdes la oportunidad de vender margen." },
        { mistake: "Elegir copas sin pensar en la rotación", consequence: "Abres botellas que no terminas. Cada botella a medias es dinero tirado." },
        { mistake: "No probar si el vino aguanta abierto antes de ponerlo por copa", consequence: "Sirves la tercera copa de una botella que ya ha perdido calidad. El comensal no repite." },
      ],
    },
    {
      id: "cuando-no-conviene-copa",
      title: "Cuándo no conviene sacar un vino por copa",
      queSignifica:
        "No todo vino funciona por copa. No conviene cuando: el vino no aguanta abierto más de unas horas (vinos muy delicados, espumosos sin sistema de conservación), cuando la rotación esperada es tan baja que la merma se come el margen, cuando el precio de copa resultante es tan alto que el comensal no lo percibe como accesible, o cuando ya tienes otra copa en la misma franja que cubre esa necesidad.",
      porQueImporta:
        "Porque poner por copa un vino que no debería estar es peor que no tener copa. Generas merma, servicio de mala calidad (vino oxidado) y una percepción negativa del programa completo. Un programa de 4 copas bien elegidas es infinitamente mejor que uno de 10 donde 6 generan pérdida.",
      queHacer: [
        "Descarta cualquier vino que no aguante al menos 24h abierto, salvo que tengas sistema de conservación (Coravin, argón).",
        "Descarta referencias con precio de copa > 15 € salvo que tu clientela lo justifique (gastronómico alto, hotel premium).",
        "Si ya tienes una copa en la misma franja (mismo tipo, ±2 € de diferencia), no dupliques. Elige una.",
        "No pongas por copa un vino solo porque quieres liquidar stock: la copa no es un canal de descuento.",
      ],
      errores: [
        { mistake: "Usar la copa como canal de liquidación de stock muerto", consequence: "Sirves vino mediocre por copa y el comensal asocia tu programa de copa con baja calidad." },
        { mistake: "Ofrecer espumoso por copa sin sistema de conservación", consequence: "A la segunda copa ya no tiene burbujas. Estás vendiendo un producto inferior." },
        { mistake: "Tener demasiadas copas activas 'para tener variedad'", consequence: "La variedad genera merma. Si abres 10 botellas y vendes 3 copas de cada una, pierdes 7 fondos de botella." },
      ],
    },
    {
      id: "fijar-precio-copa",
      title: "Cómo fijar precio sin perder margen",
      queSignifica:
        "El precio de copa NO se calcula dividiendo el precio de la botella entre 5. Esa fórmula ignora la merma (el vino que se pierde al final de la botella o por no vender todas las copas), el coste de servicio y el margen objetivo. La fórmula correcta parte del coste real por copa (coste de botella ÷ copas reales que vas a servir, incluyendo merma) y aplica el multiplicador objetivo sobre ese coste.",
      porQueImporta:
        "Porque un error de 1 € en el precio de copa se multiplica por cada copa que sirves. Si vendes 15 copas a la semana de una referencia y tu precio está 1,50 € por debajo de lo que debería, pierdes más de 1.100 € al año en esa sola referencia. Y si tienes 6 copas mal calculadas, el impacto puede superar los 5.000 € anuales.",
      queHacer: [
        "Calcula el coste real por copa: (precio de botella ÷ 4 copas reales) + 25% de merma = coste real.",
        "Aplica tu multiplicador objetivo (mínimo ×3 sobre coste real para copa).",
        "Compara el resultado con el precio de la copa más cercana en tu carta: ¿es coherente?",
        "Usa la Calculadora de Precio por Copa para simular escenarios con distintos niveles de merma.",
      ],
      errores: [
        { mistake: "Dividir el precio de botella entre 5 copas", consequence: "No cubres merma. De una botella sacas 4-4,5 copas reales, no 5. Vendes a pérdida desde la primera copa." },
        { mistake: "No contabilizar la merma en el cálculo", consequence: "Tu margen teórico no existe. La realidad es un 20-30% peor de lo que crees." },
        { mistake: "Fijar todos los precios de copa con el mismo multiplicador", consequence: "Un vino de 8 € y uno de 30 € necesitan estrategias de copa diferentes." },
      ],
    },
    {
      id: "evitar-canibalizacion-copa",
      title: "Cómo evitar canibalización entre copa y botella",
      queSignifica:
        "La canibalización ocurre cuando la copa le quita ventas a la botella sin aportar más margen. Si un comensal que habría pedido una botella de 28 € acaba pidiendo 2 copas de 8 € (16 € total), has perdido 12 € de venta y probablemente margen. El objetivo no es que la copa sustituya a la botella: es que capture ventas nuevas (el comensal que no habría pedido botella).",
      porQueImporta:
        "Porque si tu programa de copa canibaliza la botella, estás trabajando más para ganar menos. El objetivo es que la copa aumente el ticket medio total, no que lo redistribuya. La canibalización es el riesgo menos visible de un programa de copa: no se nota hasta que miras los datos.",
      queHacer: [
        "Monitoriza el ratio copa/botella mes a mes. Si la venta de botella cae al introducir copa, investiga.",
        "Posiciona la copa como exploración y la botella como compromiso: no compiten, se complementan.",
        "Evita poner por copa tus referencias estrella por botella. La copa debe cubrir un espacio distinto.",
        "Forma al equipo para sugerir botella cuando la mesa pide 3+ copas del mismo vino.",
      ],
      errores: [
        { mistake: "Poner por copa el mismo vino que más vendes por botella", consequence: "Le das al comensal una razón para gastar menos. Tu mejor botella ahora se vende a trozos." },
        { mistake: "No formar al equipo para gestionar la transición copa → botella", consequence: "Dos comensales piden 2 copas cada uno del mismo vino. Nadie les sugiere la botella. Pierdes venta." },
        { mistake: "No medir si la copa suma o resta al ticket medio global", consequence: "Crees que tu programa de copa va bien porque se venden copas, pero el ticket medio ha bajado." },
      ],
    },
    {
      id: "medir-rotacion-rentabilidad",
      title: "Cómo medir rotación y rentabilidad por copa",
      queSignifica:
        "La rotación por copa mide cuántas botellas abiertas terminas en un periodo. Si abres 3 botellas a la semana y vendes todas las copas, tu rotación es excelente. Si abres 3 y tiras fondo de 2, tu rotación real es un desastre disfrazado de ventas. La rentabilidad por copa no es solo el margen teórico: es el margen menos la merma real, menos el coste de servicio, menos las copas que no vendes.",
      porQueImporta:
        "Porque la copa puede parecer rentable en la teoría y ser ruinosa en la práctica. El margen por copa sobre papel puede ser del 75%, pero si pierdes el 30% en merma y el 10% en servicio adicional, tu margen real es del 35%. Sin medición, operas a ciegas. Con medición, optimizas cada semana.",
      queHacer: [
        "Registra cada botella abierta para copa y el número de copas realmente servidas (no las teóricas).",
        "Calcula tu merma real semanal: (copas teóricas - copas servidas) × coste por copa.",
        "Compara el margen real por copa (descontando merma) con el margen por botella de la misma referencia.",
        "Si el margen real por copa es inferior al de la botella, tienes un problema de rotación o de pricing.",
      ],
      errores: [
        { mistake: "Medir solo las copas vendidas sin contar las botellas abiertas", consequence: "Vendes 20 copas pero abres 8 botellas. Tu merma es del 37% y no lo sabes." },
        { mistake: "Asumir que toda botella abierta se vende entera por copas", consequence: "Tu cálculo de rentabilidad es ficción. La realidad es un 20-30% peor." },
        { mistake: "No comparar la rentabilidad por copa con la de botella", consequence: "Puede que estés vendiendo por copa un vino que te rendiría más por botella." },
      ],
    },
    {
      id: "errores-tipicos-copeo",
      title: "Errores típicos en el copeo",
      queSignifica:
        "El copeo es una de las operaciones más delicadas de un restaurante: combina gestión de stock (botellas abiertas), control de merma (vino que se pierde), servicio de sala (recomendación y venta) y pricing (precio que cubre todo lo anterior). Los errores típicos no son de desconocimiento: son de falta de proceso. El equipo sabe que la merma existe, pero nadie la mide. Saben que el precio debería ser otro, pero nadie lo recalcula.",
      porQueImporta:
        "Porque los errores en el copeo son recurrentes: se repiten cada día, cada turno, cada servicio. Un error puntual de pricing se corrige. Pero un proceso de copeo sin control genera pérdidas acumulativas que al final del año pueden suponer miles de euros. Los restaurantes que mejor gestionan el copeo no son los que tienen mejores vinos: son los que tienen mejor proceso.",
      queHacer: [
        "Establece un protocolo de apertura de botella para copa: quién decide cuándo abrir, cuántas botellas activas máximo.",
        "Define un momento de revisión diario: al cierre, ¿cuántas botellas abiertas quedan? ¿Cuántas se terminaron?",
        "Forma al equipo cada trimestre con la Plantilla de formación exprés: 30 minutos bastan.",
        "Revisa el pricing de copa cada vez que cambie un coste o cada 3 meses como mínimo.",
      ],
      errores: [
        { mistake: "No tener protocolo de apertura de botellas para copa", consequence: "Cada camarero abre cuando quiere. Al final del turno hay 6 botellas abiertas con 2 copas servidas de cada una." },
        { mistake: "No formar al equipo para vender copa", consequence: "El camarero dice 'tenemos vino por copa' sin convicción. El comensal pide un refresco." },
        { mistake: "No revisar precios de copa tras cambios de coste", consequence: "Tu proveedor subió un 8% hace 4 meses. Tus copas siguen al precio antiguo. Vendes a pérdida." },
        { mistake: "No medir la merma nunca", consequence: "No sabes cuánto pierdes. Y lo que no mides, no lo puedes mejorar." },
      ],
    },
  ],
};

export default vinoPorCopaContent;
