import { ShoppingCart } from "lucide-react";
import type { DeepAreaContent } from "./margenesPricing";

const comprasReposicionContent: DeepAreaContent = {
  name: "Compras y reposición",
  tagline: "Compra con datos, no con intuición",
  intro: "Esta sección te ayuda a tomar mejores decisiones de compra y reposición. No se trata de comprar barato: se trata de comprar lo que se va a vender, al precio correcto, en la cantidad justa. Cada decisión de compra impacta directamente en tu margen, tu stock y la coherencia de tu carta.",
  icon: ShoppingCart,
  accent: "text-blue-500",
  bg: "bg-blue-500/10",
  links: [
    { label: "Winerim Supply", href: "/producto/winerim-supply", description: "Inteligencia de compras: comparativa de precios, alertas de sobreprecio y reposición basada en datos" },
    { label: "Calculadora de compra inteligente", href: "/herramientas/calculadora-compra-inteligente", description: "Evalúa si una compra tiene sentido cruzando rotación, margen y stock actual" },
    { label: "Plantilla: Control grupo restauración", href: "/recursos/plantilla-control-grupo-restauracion", description: "Coordina compras y surtido entre locales de un mismo grupo" },
    { label: "Plantilla: Revisión mensual de carta", href: "/recursos/plantilla-revision-mensual-carta", description: "Proceso mensual para conectar rendimiento de carta con decisiones de compra" },
    { label: "Blog: ¿Estás comprando mal vino?", href: "/blog/como-saber-si-estas-comprando-mal-vino-restaurante", description: "Señales de que tu proceso de compra necesita una revisión" },
    { label: "Blog: ¿Qué vinos merece la pena reponer?", href: "/blog/que-vinos-merece-la-pena-reponer", description: "Criterios para decidir qué entra y qué sale de tu próximo pedido" },
  ],
  subtopics: [
    {
      id: "comprando-mal",
      title: "Cómo saber si estás comprando mal",
      porQueTeLoMostramos: { detected: "Winerim ha cruzado tus pedidos recientes con los datos de venta y ha detectado que parte de tu presupuesto va a referencias sin demanda real.", whyMatters: "Si compras mal, tu stock se infla, tu margen se comprime y tu carta se llena de lo que nadie pide.", riskIfIgnored: "Cada pedido por inercia financia un error recurrente que erosiona tu rentabilidad mes a mes." },
      queSignifica:
        "Comprar mal no es solo pagar demasiado. Es comprar lo que no se vende, en cantidades que no necesitas, a proveedores que no has comparado, o reponer por inercia sin mirar datos. La señal más clara de una mala compra es un stock que crece mientras las ventas no lo hacen. Si tu bodega está más llena cada mes pero tu ticket medio no sube, algo falla en la compra.",
      porQueImporta:
        "Porque la compra es la primera decisión que condiciona todo lo demás. Si compras mal, tu stock se infla, tu margen se comprime y tu carta se llena de referencias que nadie pide. Corregir la compra tiene un efecto cascada positivo en toda la operación: mejor stock, mejor margen, mejor carta.",
      queHacer: [
        "Cruza tu último pedido con los datos de venta de los últimos 30 días. ¿Cuántas referencias del pedido no tenían demanda real?",
        "Calcula qué porcentaje de tu presupuesto de compra va a referencias con rotación baja o nula.",
        "Identifica si tienes rupturas de stock en referencias que sí pide tu cliente (señal de que compras lo que no toca).",
        "Revisa si repones por inercia (mismo pedido cada mes) o por datos (ajustando a la demanda real).",
      ],
      errores: [
        { mistake: "Repetir el mismo pedido cada mes sin revisar ventas", consequence: "Acumulas lo que no se vende y te quedas sin lo que sí se pide." },
        { mistake: "Comprar por volumen para obtener descuento sin demanda real", consequence: "El descuento del 10% no compensa 6 meses de stock parado." },
        { mistake: "No tener visibilidad de lo que hay en bodega antes de pedir", consequence: "Duplicas stock de referencias que ya tenías y el capital se inmoviliza." },
      ],
    },
    {
      id: "cuando-no-reponer",
      title: "Cuándo no reponer una referencia",
      porQueTeLoMostramos: { detected: "Winerim ha detectado referencias con rotación baja sostenida que siguen reponerse automáticamente.", whyMatters: "Reponer por inercia es la forma más común de acumular stock muerto. Cada reposición sin datos es dinero que no vuelve.", riskIfIgnored: "Financias un error recurrente cada mes, comprando lo que no se vende mientras lo que sí se pide se agota." },
      queSignifica:
        "No reponer es una decisión activa, no un olvido. Dejas de reponer cuando los datos te dicen que esa referencia ya no justifica su espacio: baja rotación sostenida, margen insuficiente, canibalización con otra referencia mejor, o cambio en el perfil de tu clientela. La clave es que la decisión sea consciente y documentada, no que simplemente se te acabe y no la pidas más.",
      porQueImporta:
        "Porque reponer por inercia es la forma más común de acumular stock muerto. Cada referencia que repones sin justificación le quita presupuesto a otra que sí podría vender. Y cada mes que repones un vino que no rota, estás financiando un error recurrente.",
      queHacer: [
        "Antes de cada pedido, revisa las referencias con rotación < 1 vez/mes. ¿Realmente necesitas reponer?",
        "Si una referencia lleva 2 meses consecutivos con rotación baja, ponla en cuarentena: no repones hasta que se agote y evalúas.",
        "Si al agotarse no la echas de menos (ni tus clientes la piden), no la vuelvas a comprar.",
        "Documenta cada decisión de no reposición para que el equipo sepa por qué y no la pida de nuevo.",
      ],
      errores: [
        { mistake: "Reponer todo lo que se agota sin evaluar rendimiento", consequence: "Tratas todas las referencias como iguales cuando no lo son." },
        { mistake: "No reponer sin comunicar al equipo de sala", consequence: "El camarero promete un vino que ya no está y el comensal se decepciona." },
        { mistake: "Dejar que la decisión la tome solo el proveedor ('te mando lo de siempre')", consequence: "Tu carta la decide quien te vende, no quien gestiona tu negocio." },
      ],
    },
    {
      id: "precios-compra",
      title: "Cómo leer precios de compra",
      queSignifica:
        "El precio de compra no es solo el número en la factura. Es ese número más el transporte, los mínimos de pedido, los rappels, los plazos de pago y las condiciones de devolución. Dos proveedores pueden ofrecerte el mismo vino a 'el mismo precio' con costes reales muy distintos. Leer bien un precio de compra significa entender el coste total de adquisición, no solo el precio unitario.",
      porQueImporta:
        "Porque cada euro de diferencia en compra es un euro directo en tu margen. Si compras 50 botellas al mes de una referencia y pagas 0,80 € más de lo necesario, son 480 € al año perdidos en una sola referencia. Multiplicado por 10 referencias mal compradas, hablamos de casi 5.000 € anuales.",
      queHacer: [
        "Para cada referencia clave, calcula el coste total: precio + transporte por unidad + coste del capital (si pagas a 30 días vs. 60 días).",
        "Compara el coste total entre proveedores, no solo el precio de tarifa.",
        "Revisa si tus condiciones de devolución cubren la merma: un proveedor que acepta devoluciones puede ser más barato aunque su precio sea mayor.",
        "Negocia con datos: lleva tu histórico de compras a la reunión con el proveedor.",
      ],
      errores: [
        { mistake: "Comparar solo el precio unitario entre proveedores", consequence: "Eliges al más barato en tarifa pero al más caro en coste real." },
        { mistake: "No revisar precios tras la primera negociación", consequence: "Tu proveedor sube un 5% cada año y tú no te enteras hasta que miras los márgenes." },
        { mistake: "No considerar el coste de los mínimos de pedido", consequence: "Compras 24 botellas para conseguir el precio, pero solo necesitas 6." },
      ],
    },
    {
      id: "detectar-sobreprecio",
      title: "Cómo detectar sobreprecio",
      queSignifica:
        "Un sobreprecio es cuando pagas más de lo que el mercado pide por una referencia o por un vino de características equivalentes. No siempre es culpa del proveedor: a veces es porque no has comparado, porque llevas años comprando al mismo sin negociar, o porque tu volumen ha cambiado y tus condiciones no se han actualizado. Detectar sobreprecio requiere comparar, no intuir.",
      porQueImporta:
        "Porque el sobreprecio es invisible hasta que lo buscas. No aparece como un gasto extra en tu cuenta de resultados: simplemente reduces tu margen sin saberlo. En un grupo de restauración con compras centralizadas, un sobreprecio del 8% en 20 referencias puede suponer decenas de miles de euros al año.",
      queHacer: [
        "Selecciona tus 10 referencias de mayor volumen de compra y solicita presupuesto a al menos 2 proveedores alternativos.",
        "Compara no solo precio sino condiciones: plazo de pago, mínimos, transporte, devoluciones.",
        "Si detectas una diferencia > 10%, negocia con tu proveedor actual usando los datos como palanca.",
        "Establece una revisión de precios semestral como mínimo. Los mercados cambian y tus condiciones deben adaptarse.",
      ],
      errores: [
        { mistake: "No comparar nunca porque 'mi proveedor es de confianza'", consequence: "La confianza no es incompatible con la comparación. Comparar es gestionar." },
        { mistake: "Comparar solo una vez al año o al inicio de la relación", consequence: "Los precios cambian trimestralmente. Si no revisas, te quedas atrás." },
        { mistake: "Cambiar de proveedor solo por precio sin valorar servicio", consequence: "Un proveedor barato pero poco fiable te sale más caro en roturas de stock y problemas logísticos." },
      ],
    },
    {
      id: "decidir-entre-similares",
      title: "Cómo decidir entre referencias similares",
      queSignifica:
        "Cuando tienes dos o más vinos que compiten en la misma franja (mismo tipo, precio similar, perfil parecido), necesitas un criterio claro para elegir cuál se queda y cuál se va. Ese criterio debe combinar tres variables: margen (cuál deja más), rotación (cuál se vende más) y rol en carta (cuál cumple mejor la función que necesitas cubrir).",
      porQueImporta:
        "Porque mantener dos referencias similares canibaliza ventas, divide la atención del comensal y duplica el stock necesario. Cada par de vinos redundantes es una oportunidad perdida para cubrir un hueco real en tu carta o para concentrar volumen y mejorar condiciones de compra.",
      queHacer: [
        "Identifica pares o tríos de referencias que compiten en la misma franja (mismo tipo, ±3 € de diferencia).",
        "Compara: ¿cuál tiene mejor margen? ¿Cuál rota más? ¿Cuál recomienda más el equipo de sala?",
        "Decide cuál se queda y retira la otra. Si tienes stock de la que sale, muévela a copa o promoción.",
        "Usa el espacio liberado para cubrir un hueco real o para negociar mejor volumen en la referencia ganadora.",
      ],
      errores: [
        { mistake: "Mantener ambas 'porque las dos se venden algo'", consequence: "Ambas venden poco en vez de una vender bien. Pierdes margen y eficiencia." },
        { mistake: "Decidir solo por margen sin mirar rotación", consequence: "Te quedas con la más rentable por botella pero que nadie pide." },
        { mistake: "Decidir por gusto personal del sumiller o del chef", consequence: "Tu carta satisface a quien la diseña, no a quien la consume." },
      ],
    },
    {
      id: "decision-compra-integrada",
      title: "Cómo combinar rotación, margen y stock en una decisión de compra",
      queSignifica:
        "La mejor decisión de compra no mira un solo dato: cruza tres. Rotación te dice si el vino se vende. Margen te dice si vale la pena venderlo. Stock te dice si necesitas más o ya tienes de sobra. Cuando los tres datos apuntan en la misma dirección, la decisión es clara. Cuando se contradicen, necesitas priorizar según tu estrategia.",
      porQueImporta:
        "Porque mirar un solo dato te lleva a decisiones parciales. Un vino con buena rotación pero mal margen te hace trabajar mucho para ganar poco. Uno con buen margen pero sin rotación te llena la bodega de capital parado. Y comprar más de algo que ya tienes en exceso es tirar dinero. Solo cuando cruzas los tres ves la realidad completa.",
      queHacer: [
        "Antes de cada pedido, clasifica cada referencia en una matriz de 2×2: rotación alta/baja × margen alto/bajo.",
        "Rotación alta + margen alto → reponer sin dudar, negociar volumen.",
        "Rotación alta + margen bajo → repricing o renegociar coste antes de reponer.",
        "Rotación baja + margen alto → impulso en sala o copa antes de reponer.",
        "Rotación baja + margen bajo → no reponer. Agotar stock y retirar.",
        "Añade la variable stock: si ya tienes 3 meses de inventario, no necesitas reponer aunque rote bien.",
      ],
      errores: [
        { mistake: "Decidir la compra solo por rotación", consequence: "Repones lo que más se vende sin comprobar si te deja margen suficiente." },
        { mistake: "Decidir solo por margen", consequence: "Compras lo que más deja por botella pero que nadie pide." },
        { mistake: "No comprobar el stock actual antes de pedir", consequence: "Duplicas inventario de referencias que ya tenías suficientes." },
      ],
    },
  ],
};

export default comprasReposicionContent;
