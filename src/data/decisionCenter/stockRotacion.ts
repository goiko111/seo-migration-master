import { Package } from "lucide-react";
import type { DeepAreaContent } from "./margenesPricing";

const stockRotacionContent: DeepAreaContent = {
  name: "Stock y rotación",
  tagline: "Detecta lo que no se mueve antes de que sea tarde",
  intro: "Esta sección te ayuda a identificar vinos parados, cuantificar el capital que tienes inmovilizado y tomar decisiones concretas: impulsar, mover a copa, retirar o liquidar. No se trata de teoría de inventarios. Se trata de que cada botella en tu bodega tenga un plan.",
  icon: Package,
  accent: "text-emerald-500",
  bg: "bg-emerald-500/10",
  links: [
    { label: "Calculadora de stock muerto", href: "/herramientas/calculadora-stock-muerto", description: "Cuantifica el capital inmovilizado en referencias sin venta" },
    { label: "Checklist: Detección de vinos muertos", href: "/recursos/checklist-deteccion-vinos-muertos", description: "Proceso paso a paso para identificar y actuar sobre stock parado" },
    { label: "Scorecard mensual", href: "/recursos/scorecard-mensual", description: "Monitoriza la salud de tu stock cada mes con métricas clave" },
    { label: "Winerim Core", href: "/producto/winerim-core", description: "El motor analítico que detecta rotación baja automáticamente" },
    { label: "Winerim Supply", href: "/producto/winerim-supply", description: "Conecta rotación con decisiones de compra y reposición" },
    { label: "Blog: Cómo detectar stock muerto", href: "/article/como-detectar-stock-muerto-carta-vinos", description: "Señales de alerta y proceso para identificar vinos sin rotación" },
    { label: "Blog: Qué vinos merece la pena reponer", href: "/article/que-vinos-merece-la-pena-reponer", description: "Criterios para decidir qué entra y qué sale del próximo pedido" },
  ],
  subtopics: [
    {
      id: "stock-muerto",
      title: "Qué se considera stock muerto",
      porQueTeLoMostramos: {
        detected: "Winerim ha identificado referencias en tu carta con 0 ventas en más de 60 días.",
        whyMatters: "Entre el 10% y el 25% de la carta de un restaurante medio está en stock muerto sin saberlo. Es capital que no trabaja.",
        riskIfIgnored: "Cada mes que pasa, ese dinero sigue parado. No mejora con el tiempo: solo se acumula.",
      },
      queSignifica:
        "Stock muerto es cualquier referencia que lleva más de 60 días sin venta y no tiene una justificación estratégica clara (reserva especial, vino de guarda para evento, etc.). No es lo mismo que stock lento: un vino que vende 2 botellas al mes es lento pero vivo. Uno que lleva 3 meses sin moverse es muerto. La diferencia importa porque la acción es distinta.",
      porQueImporta:
        "Porque cada botella parada es dinero que no trabaja. Un restaurante medio tiene entre el 10% y el 25% de su carta en stock muerto sin saberlo. Si tienes 20 referencias muertas a un coste medio de 8 €, con 3 botellas de media, son 480 € inmovilizados que podrían estar generando margen en referencias que sí rotan.",
      queHacer: [
        "Filtra todas las referencias con 0 ventas en los últimos 60 días.",
        "Separa las que tienen justificación estratégica (evento, reserva de cliente) de las que simplemente están olvidadas.",
        "Para las olvidadas, decide ahora: ¿impulso en sala, copa, descuento o retirada?",
        "Establece una regla: cualquier referencia sin venta en 60 días entra automáticamente en revisión.",
      ],
      errores: [
        { mistake: "Considerar que 'stock muerto' solo son vinos viejos o deteriorados", consequence: "El stock muerto más caro suele ser vino perfectamente bebible que nadie pide." },
        { mistake: "No distinguir entre stock muerto y stock estratégico", consequence: "Retiras vinos que deberías mantener o mantienes los que deberían irse." },
        { mistake: "Esperar a que el problema se resuelva solo", consequence: "El vino no mejora con el tiempo en una bodega de restaurante. El capital sigue parado." },
      ],
    },
    {
      id: "capital-inmovilizado",
      title: "Cómo detectar capital inmovilizado",
      porQueTeLoMostramos: {
        detected: "Winerim ha calculado el valor total de las botellas sin venta en tu bodega.",
        whyMatters: "Es dinero real invertido que no genera retorno. Invisible en la cuenta de resultados, pero muy real en tu tesorería.",
        riskIfIgnored: "Sin acción, el capital inmovilizado crece cada mes con cada nuevo pedido que no se ajusta a la demanda.",
      },
      queSignifica:
        "El capital inmovilizado es el valor total de compra de todas las botellas que tienes en bodega y no se están vendiendo. No es un número abstracto: son euros reales que invertiste y que no están generando retorno. Para calcularlo, multiplica el coste de compra de cada referencia sin venta por el número de botellas en stock.",
      porQueImporta:
        "Porque es dinero invisible. No aparece como gasto en tu cuenta de resultados, pero tampoco genera ingresos. Es la forma más silenciosa de perder rentabilidad. Un grupo de restauración puede tener miles de euros inmovilizados sin que nadie lo sepa, porque el stock se reparte entre locales y nadie lo suma.",
      queHacer: [
        "Calcula el valor total de stock sin venta en los últimos 60 días (coste × unidades).",
        "Ordénalo de mayor a menor: las primeras 5 referencias probablemente concentran el 50% del problema.",
        "Pon un objetivo: reducir el capital inmovilizado un 30% en los próximos 60 días.",
        "Establece un indicador mensual: capital inmovilizado como % del stock total.",
      ],
      errores: [
        { mistake: "No calcular nunca el capital inmovilizado", consequence: "No sabes cuánto dinero tienes parado. No puedes mejorar lo que no mides." },
        { mistake: "Contar solo las unidades, no el valor en euros", consequence: "20 botellas de 3 € no son lo mismo que 20 botellas de 25 €. El impacto es radicalmente distinto." },
        { mistake: "Revisar el stock total sin separar lo que rota de lo que no", consequence: "Tu inventario parece razonable, pero dentro hay una capa de capital muerto que no ves." },
      ],
    },
    {
      id: "cuando-impulsar",
      title: "Cuándo impulsar una referencia",
      queSignifica:
        "Impulsar significa darle una segunda oportunidad activa a un vino que no se está vendiendo pero que tiene potencial. No es esperar: es poner al equipo de sala a trabajar con esa referencia durante un periodo concreto (7-14 días) y medir si responde. Si el vino es bueno, está bien posicionado y el comensal simplemente no lo conoce, un impulso de sala puede reactivarlo.",
      porQueImporta:
        "Porque muchos vinos no se venden por falta de visibilidad, no por falta de calidad. Si el equipo de sala no lo conoce, no lo recomienda. Si no lo recomienda, no se vende. Y si no se vende, lo retiras sin saber si realmente no tenía demanda.",
      queHacer: [
        "Selecciona 2-3 referencias con baja rotación pero buen margen y buena relación calidad-precio.",
        "Forma al equipo de sala: que lo prueben, sepan describirlo y tengan un argumento de venta claro.",
        "Define un periodo de impulso (7-14 días) y un objetivo mínimo de ventas.",
        "Si al final del periodo no ha respondido, pasa al siguiente nivel: copa o retirada.",
      ],
      errores: [
        { mistake: "Impulsar todo a la vez", consequence: "El equipo no puede recomendar 10 vinos nuevos al mismo tiempo. Focaliza." },
        { mistake: "Impulsar sin formar al equipo", consequence: "Si el camarero no sabe qué decir, el impulso no funciona." },
        { mistake: "No poner fecha límite al impulso", consequence: "Sin deadline, el 'impulso' se convierte en una esperanza eterna." },
      ],
    },
    {
      id: "cuando-sacar-por-copa",
      title: "Cuándo sacarla por copa",
      queSignifica:
        "Mover una referencia lenta a copa es una estrategia de rescate: en vez de esperar a que alguien pida la botella, la ofreces por copa para acelerar la rotación y recuperar al menos parte de la inversión. Funciona bien con vinos que son buenos pero que el comensal no se atreve a pedir en botella (precio alto, uva desconocida, región poco habitual).",
      porQueImporta:
        "Porque la copa reduce la barrera de entrada del comensal. Un vino que nadie pide en botella a 35 € puede venderse fácilmente a 8 € la copa. Además, la copa te permite recuperar capital en días en vez de meses. Pero solo funciona si el vino tiene rotación suficiente por copa para terminar la botella antes de que se oxide.",
      queHacer: [
        "Evalúa si el vino aguanta 24-48h abierto sin perder calidad (si no, descártalo para copa).",
        "Calcula el precio de copa incluyendo merma real (mínimo 20-25% de pérdida sobre la botella).",
        "Comunica al equipo de sala que es una referencia prioritaria para recomendar por copa.",
        "Si en 2 semanas no has vendido al menos 2-3 copas semanales, retírala y libera el espacio.",
      ],
      errores: [
        { mistake: "Poner por copa un vino que no aguanta abierto", consequence: "Sirves un vino oxidado, pierdes la confianza del comensal y desperdicias la botella." },
        { mistake: "No ajustar el precio de copa para cubrir merma", consequence: "Vendes por copa pero pierdes dinero porque la botella no se termina nunca." },
        { mistake: "Mantener demasiadas copas activas de vinos lentos", consequence: "Abres 8 botellas, vendes 2 copas de cada una y tiras el resto." },
      ],
    },
    {
      id: "cuando-retirar",
      title: "Cuándo retirar una referencia",
      queSignifica:
        "Retirar es la última opción, pero a veces es la mejor. Un vino debe salir de carta cuando: ha pasado por impulso y copa sin resultado, su margen no justifica el esfuerzo, o simplemente ya no encaja con tu concepto. Retirar no es un fracaso: es gestión. Lo peor que puedes hacer es mantener una referencia que ocupa espacio sin generar nada.",
      porQueImporta:
        "Porque cada referencia que mantienes sin justificación le quita espacio (físico y mental) a otra que sí podría vender. Tu carta tiene un número óptimo de referencias, y superarlo diluye la atención del comensal, complica la operativa y aumenta el coste de gestión.",
      queHacer: [
        "Si una referencia no ha respondido a impulso ni a copa en 30 días, retírala.",
        "Decide qué hacer con el stock restante: liquidar, devolver al proveedor o consumo interno.",
        "Actualiza la carta y comunica al equipo que la referencia ya no está disponible.",
        "Documenta la decisión para no repetir la compra en el futuro.",
      ],
      errores: [
        { mistake: "Mantener 'por si alguien la pide'", consequence: "Nadie la va a pedir. Mientras tanto, ocupa espacio y capital." },
        { mistake: "Retirar sin documentar la razón", consequence: "El próximo sumiller o responsable de compras puede volver a comprarla." },
        { mistake: "No tener un proceso claro de retirada", consequence: "Las decisiones se aplazan indefinidamente y el stock muerto se acumula." },
      ],
    },
    {
      id: "evolucion-stock",
      title: "Cómo interpretar la evolución de stock",
      queSignifica:
        "La evolución de stock no es un snapshot: es una tendencia. Lo que importa no es cuánto stock tienes hoy, sino cómo ha cambiado respecto al mes pasado. ¿Ha subido el capital inmovilizado? ¿Han aparecido nuevas referencias sin venta? ¿El porcentaje de carta con rotación baja está mejorando o empeorando? Leer la evolución te permite anticipar problemas antes de que se conviertan en crisis.",
      porQueImporta:
        "Porque un stock que empeora cada mes es una señal de que algo falla en tu proceso de compra, en tu carta o en tu equipo de sala. Si no miras la tendencia, solo reaccionas cuando el problema ya es grande. Si la miras, puedes corregir el rumbo antes de que el capital inmovilizado se dispare.",
      queHacer: [
        "Compara 3 indicadores cada mes: capital inmovilizado total, nº de referencias sin venta en 60 días y % de carta con rotación < 1/mes.",
        "Si alguno de los tres sube respecto al mes anterior, investiga la causa antes de que se acumule.",
        "Correlaciona la evolución del stock con tus decisiones de compra: ¿estás comprando más de lo que vendes?",
        "Establece un objetivo trimestral de mejora y revísalo con tu equipo cada mes.",
      ],
      errores: [
        { mistake: "Mirar solo el stock total sin desglosar por rotación", consequence: "Tu inventario puede parecer estable mientras el stock muerto crece por dentro." },
        { mistake: "Revisar el stock solo cuando hay un problema visible", consequence: "Cuando lo ves, ya has perdido meses de capital inmovilizado." },
        { mistake: "No conectar la evolución de stock con las decisiones de compra", consequence: "Sigues comprando lo que no se vende porque nadie cruza los datos." },
      ],
    },
  ],
};

export default stockRotacionContent;
