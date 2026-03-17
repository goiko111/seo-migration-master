import { ShoppingCart } from "lucide-react";
import type { DeepAreaContent } from "./margenesPricing";

const comprasReposicionEN: DeepAreaContent = {
  name: "Purchasing & Replenishment",
  tagline: "Buy with data, not intuition",
  intro: "This section helps you make better purchasing and replenishment decisions. It's not about buying cheap — it's about buying what will sell, at the right price, in the right quantity. Every purchasing decision directly impacts your margin, stock, and wine list coherence.",
  icon: ShoppingCart,
  accent: "text-blue-500",
  bg: "bg-blue-500/10",
  audiences: ["compras-fb", "direccion"],
  topErrors: [
    { error: "Buying out of habit or supplier pressure", porQueOcurre: "Because the supplier calls every week and it's easier to repeat the order than review it. Routine replaces analysis.", consecuencia: "Your cellar fills up with what they sell you, not what you need. Stock grows without any relation to actual demand." },
    { error: "Evaluating suppliers only by list price", porQueOcurre: "Because the per-bottle price is the most visible number. But you ignore shipping, minimums, rebates, payment terms and returns.", consecuencia: "You choose the 'cheapest' supplier who actually costs more per bottle served once you add everything up." },
    { error: "Not cross-referencing orders with sales data", porQueOcurre: "Because purchasing and floor staff operate as separate departments. The person ordering doesn't look at what's selling.", consecuencia: "You buy what doesn't sell and run out of what does. The misalignment grows with every order." },
    { error: "Restocking without checking current cellar inventory", porQueOcurre: "Because counting stock takes time and seems unnecessary when 'we always need more'. But often you already have enough.", consecuencia: "You accumulate excess stock on references you already had covered. Capital gets tied up unnecessarily." },
    { error: "Only negotiating when there's a problem", porQueOcurre: "Because the supplier relationship is taken for granted. It's only reviewed when there's an issue or a price increase.", consecuencia: "You miss the chance to proactively improve conditions. The supplier assumes you're satisfied and offers nothing better." },
  ],
  links: [
    { label: "Winerim Supply", href: "/producto/winerim-supply", description: "Purchasing intelligence: price comparison, overprice alerts and data-driven replenishment", type: "product" },
    { label: "Smart Purchase Calculator", href: "/herramientas/calculadora-compra-inteligente", description: "Assess whether a purchase makes sense by crossing rotation, margin and current stock", type: "tool" },
    { label: "Template: Multi-location Group Control", href: "/recursos/plantilla-control-grupo-restauracion", description: "Coordinate purchasing and assortment across locations in the same group", type: "resource" },
    { label: "Template: Monthly Wine List Review", href: "/recursos/plantilla-revision-mensual-carta", description: "Monthly process to connect wine list performance with purchasing decisions", type: "resource" },
    { label: "Blog: Are You Buying Wine Wrong?", href: "/blog/como-saber-si-estas-comprando-mal-vino-restaurante", description: "Signs that your purchasing process needs a review", type: "article" },
    { label: "Blog: Which Wines Are Worth Restocking?", href: "/blog/que-vinos-merece-la-pena-reponer", description: "Criteria for deciding what goes into your next order", type: "article" },
  ],
  miniCases: [
    {
      profile: "Casual group with 4 locations",
      situation: "Each location ordered from the supplier independently, with no coordination. The same wine was purchased at 3 different prices depending on who negotiated.",
      action: "Centralised purchasing for the 15 shared references. Negotiated a single price with aggregated volume and shipping included.",
      result: "Average 11% savings on purchase cost. €4,200/year on shared references alone.",
    },
    {
      profile: "Independent fine-dining restaurant",
      situation: "The sommelier bought by intuition and catalogue. Orders were never cross-referenced with sales data. Result: 30% of the monthly order went to low-rotation references.",
      action: "Before each order, exports the top 20 by rotation and the dead stock list. Only restocks what rotates and tests 2 new references per month.",
      result: "Reduced monthly orders by 20% without losing sales. Investment is concentrated on what works.",
    },
  ],
  subtopics: [
    {
      id: "comprando-mal",
      title: "How to tell if you're buying wrong",
      priority: "inmediato",
      porQueTeLoMostramos: { detected: "Winerim has cross-referenced your recent orders with sales data and detected that part of your budget goes to references with no real demand.", whyMatters: "If you buy wrong, your stock inflates, your margin compresses and your list fills with what nobody orders.", riskIfIgnored: "Every order placed out of habit funds a recurring mistake that erodes your profitability month after month." },
      queSignifica:
        "Buying wrong isn't just overpaying. It's buying what doesn't sell, in quantities you don't need, from suppliers you haven't compared, or restocking by inertia without looking at data. The clearest sign of poor purchasing is stock that grows while sales don't. If your cellar is fuller every month but your average ticket isn't rising, something is wrong with your buying.",
      porQueImporta:
        "Because purchasing is the first decision that conditions everything else. If you buy wrong, your stock inflates, your margin compresses and your list fills with references nobody orders. Fixing purchasing has a positive cascade effect across the entire operation: better stock, better margin, better list.",
      queHacer: [
        "Cross-reference your last order with the past 30 days of sales data. How many ordered references had no real demand?",
        "Calculate what percentage of your purchasing budget goes to references with low or zero rotation.",
        "Identify whether you have stockouts on references your customers actually request (a sign you're buying the wrong things).",
        "Check whether you restock by inertia (same order every month) or by data (adjusting to actual demand).",
      ],
      errores: [
        { mistake: "Repeating the same order every month without reviewing sales", consequence: "You accumulate what doesn't sell and run out of what does." },
        { mistake: "Buying in volume for a discount without real demand", consequence: "The 10% discount doesn't offset 6 months of idle stock." },
        { mistake: "No visibility of cellar stock before ordering", consequence: "You duplicate stock on references you already had, tying up capital." },
      ],
    },
    {
      id: "cuando-no-reponer",
      title: "When not to restock a reference",
      priority: "esta semana",
      porQueTeLoMostramos: { detected: "Winerim has detected references with sustained low rotation that continue to be restocked automatically.", whyMatters: "Restocking by inertia is the most common way to accumulate dead stock. Every restock without data is money that doesn't come back.", riskIfIgnored: "You fund a recurring mistake every month, buying what doesn't sell while what does runs out." },
      queSignifica:
        "Not restocking is an active decision, not an oversight. You stop restocking when data tells you that reference no longer justifies its space: sustained low rotation, insufficient margin, cannibalisation with a better reference, or a shift in your customer profile. The key is that the decision is conscious and documented, not that it simply runs out and you don't reorder.",
      porQueImporta:
        "Because restocking by inertia is the most common way to accumulate dead stock. Every reference you restock without justification takes budget away from one that could actually sell. And every month you restock a wine that doesn't rotate, you're funding a recurring mistake.",
      queHacer: [
        "Before each order, review references with rotation < 1x/month. Do you really need to restock?",
        "If a reference has had 2 consecutive months of low rotation, quarantine it: don't restock until it runs out, then evaluate.",
        "If once depleted neither you nor your customers miss it, don't buy it again.",
        "Document every non-restock decision so the team knows why and doesn't reorder it.",
      ],
      errores: [
        { mistake: "Restocking everything that runs out without evaluating performance", consequence: "You treat all references as equal when they're not." },
        { mistake: "Not restocking without telling the floor team", consequence: "The waiter promises a wine that's no longer available and the guest is disappointed." },
        { mistake: "Letting the supplier decide ('I'll send you the usual')", consequence: "Your list is decided by whoever sells to you, not whoever manages your business." },
      ],
    },
    {
      id: "precios-compra",
      title: "How to read purchase prices",
      priority: "este mes",
      porQueTeLoMostramos: { detected: "Winerim has analysed your purchase costs including transport, minimums and conditions to calculate the true total cost.", whyMatters: "Every euro of difference in purchasing is a direct euro on your margin. €0.80 extra on 50 bottles/month is €480/year lost on a single reference.", riskIfIgnored: "You choose suppliers by list price, not real cost. Your margin erodes without it showing in the unit price." },
      queSignifica:
        "The purchase price isn't just the number on the invoice. It's that number plus transport, order minimums, rebates, payment terms and return conditions. Two suppliers can offer you the same wine at 'the same price' with very different real costs. Reading a purchase price correctly means understanding the total cost of acquisition, not just the unit price.",
      porQueImporta:
        "Because every euro of difference in purchasing is a direct euro on your margin. If you buy 50 bottles/month of one reference and pay €0.80 more than necessary, that's €480/year lost on a single reference. Multiply by 10 poorly purchased references and you're looking at nearly €5,000 annually.",
      queHacer: [
        "For each key reference, calculate total cost: price + transport per unit + cost of capital (paying at 30 days vs. 60 days).",
        "Compare total cost between suppliers, not just list price.",
        "Check whether your return conditions cover wastage: a supplier who accepts returns may be cheaper even if the price is higher.",
        "Negotiate with data: bring your purchase history to the supplier meeting.",
      ],
      errores: [
        { mistake: "Comparing only unit price between suppliers", consequence: "You choose the cheapest on paper but the most expensive in real cost." },
        { mistake: "Not reviewing prices after the initial negotiation", consequence: "Your supplier raises prices 5% every year and you don't notice until you check margins." },
        { mistake: "Not factoring in minimum order costs", consequence: "You buy 24 bottles to get the price but only need 6." },
      ],
    },
    {
      id: "detectar-sobreprecio",
      title: "How to detect overpricing",
      priority: "inmediato",
      porQueTeLoMostramos: { detected: "Winerim has compared your purchase prices with market data and detected references where you may be paying more than necessary.", whyMatters: "Overpricing is invisible until you look for it. In a group, 8% overpayment on 20 references can mean tens of thousands of euros per year.", riskIfIgnored: "You keep overpaying because you don't compare. Supplier loyalty shouldn't be incompatible with good management." },
      queSignifica:
        "Overpricing is when you pay more than the market asks for a reference or for a wine with equivalent characteristics. It's not always the supplier's fault: sometimes it's because you haven't compared, because you've been buying from the same one for years without negotiating, or because your volume has changed and your conditions haven't been updated. Detecting overpricing requires comparing, not guessing.",
      porQueImporta:
        "Because overpricing is invisible until you look for it. It doesn't show as an extra expense in your P&L: it simply reduces your margin without you knowing. In a restaurant group with centralised purchasing, 8% overpricing on 20 references can mean tens of thousands of euros per year.",
      queHacer: [
        "Select your 10 highest-volume references and request quotes from at least 2 alternative suppliers.",
        "Compare not just price but conditions: payment terms, minimums, transport, returns.",
        "If you detect a difference > 10%, negotiate with your current supplier using the data as leverage.",
        "Establish a price review at least every six months. Markets change and your conditions must adapt.",
      ],
      errores: [
        { mistake: "Never comparing because 'my supplier is trustworthy'", consequence: "Trust isn't incompatible with comparison. Comparing is managing." },
        { mistake: "Comparing only once a year or at the start of the relationship", consequence: "Prices change quarterly. If you don't review, you fall behind." },
        { mistake: "Switching supplier only for price without valuing service", consequence: "A cheap but unreliable supplier costs more in stockouts and logistics issues." },
      ],
    },
    {
      id: "decidir-entre-similares",
      title: "How to choose between similar references",
      priority: "esta semana",
      porQueTeLoMostramos: { detected: "Winerim has detected pairs of references competing in the same segment of your list: same type, similar price.", whyMatters: "Keeping two redundant wines cannibalises sales, splits attention and doubles stock. Consolidating frees space and improves purchasing conditions.", riskIfIgnored: "Both sell poorly instead of one selling well. You lose margin, efficiency and the chance to fill a real gap." },
      queSignifica:
        "When you have two or more wines competing in the same segment (same type, similar price, similar profile), you need a clear criterion to choose which stays and which goes. That criterion should combine three variables: margin (which yields more), rotation (which sells more) and role in the list (which better fulfils the function you need to cover).",
      porQueImporta:
        "Because keeping two similar references cannibalises sales, splits the guest's attention and doubles the stock needed. Every pair of redundant wines is a missed opportunity to fill a real gap in your list or to concentrate volume and improve purchasing conditions.",
      queHacer: [
        "Identify pairs or trios of references competing in the same segment (same type, ±€3 difference).",
        "Compare: which has better margin? Which rotates more? Which does the floor team recommend more?",
        "Decide which stays and remove the other. If you have stock of the outgoing one, move it to by-the-glass or promotion.",
        "Use the freed space to fill a real gap or to negotiate better volume on the winning reference.",
      ],
      errores: [
        { mistake: "Keeping both 'because they both sell a bit'", consequence: "Both sell poorly instead of one selling well. You lose margin and efficiency." },
        { mistake: "Deciding only by margin without looking at rotation", consequence: "You keep the most profitable per bottle but the one nobody orders." },
        { mistake: "Deciding by the sommelier's or chef's personal taste", consequence: "Your list satisfies whoever designs it, not whoever consumes it." },
      ],
    },
    {
      id: "decision-compra-integrada",
      title: "How to combine rotation, margin and stock in a purchase decision",
      priority: "este mes",
      porQueTeLoMostramos: { detected: "Winerim automatically crosses rotation, margin and stock level to classify each reference in a decision matrix.", whyMatters: "Looking at a single metric leads to partial decisions. Only when you cross all three do you see the full picture of each reference.", riskIfIgnored: "You buy what you don't need, restock what doesn't rotate and run out of what does sell." },
      queSignifica:
        "The best purchasing decision doesn't look at a single data point: it crosses three. Rotation tells you if the wine sells. Margin tells you if it's worth selling. Stock tells you if you need more or already have plenty. When all three point in the same direction, the decision is clear. When they contradict, you need to prioritise according to your strategy.",
      porQueImporta:
        "Because looking at a single metric leads to partial decisions. A wine with good rotation but poor margin makes you work hard for little gain. One with good margin but no rotation fills your cellar with idle capital. And buying more of something you already have in excess is throwing money away. Only when you cross all three do you see the full picture.",
      queHacer: [
        "Before each order, classify every reference in a 2×2 matrix: high/low rotation × high/low margin.",
        "High rotation + high margin → restock without hesitation, negotiate volume.",
        "High rotation + low margin → reprice or renegotiate cost before restocking.",
        "Low rotation + high margin → push in-room or by-the-glass before restocking.",
        "Low rotation + low margin → do not restock. Deplete stock and remove.",
        "Add the stock variable: if you already have 3 months of inventory, you don't need to restock even if it rotates well.",
      ],
      errores: [
        { mistake: "Basing purchasing decisions only on rotation", consequence: "You restock the best seller without checking if it yields enough margin." },
        { mistake: "Deciding only by margin", consequence: "You buy what yields most per bottle but nobody orders." },
        { mistake: "Not checking current stock before ordering", consequence: "You duplicate inventory on references you already had enough of." },
      ],
    },
  ],
  nextStep: {
    label: "Evaluate your next purchase",
    href: "/herramientas/calculadora-compra-inteligente",
    description: "Cross rotation, margin and current stock to decide if a purchase makes sense before placing the order.",
  },
};

export default comprasReposicionEN;
