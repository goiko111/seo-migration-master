import { Package } from "lucide-react";
import type { DeepAreaContent } from "./margenesPricing";

const stockRotacionEN: DeepAreaContent = {
  name: "Stock & Rotation",
  tagline: "Spot what isn't moving before it's too late",
  intro: "This section helps you identify stagnant wines, quantify the capital you have tied up and make concrete decisions: push, move to glass, delist or liquidate. This isn't inventory theory. It's about making sure every bottle in your cellar has a plan.",
  icon: Package,
  accent: "text-emerald-500",
  bg: "bg-emerald-500/10",
  audiences: ["sala", "compras-fb", "direccion"],
  topErrors: [
    { error: "Keeping slow references 'because they'll sell someday'", porQueOcurre: "Because delisting a wine feels like admitting a buying mistake. It's easier to wait.", consecuencia: "Capital stays tied up, the wine loses value over time and occupies list space that could generate real sales." },
    { error: "Not quantifying the real cost of dead stock", porQueOcurre: "Because dead stock doesn't show up as an expense on the P&L. You only see it when you write it off.", consecuencia: "You don't feel the urgency. 20 bottles at €12 cost is €240 that could be invested in references that actually rotate." },
    { error: "Pushing a reference without measuring the result", porQueOcurre: "Because you tell the team 'recommend it' but nobody tracks the outcome. Without measurement, there's no learning.", consecuencia: "You don't know if the action worked. You repeat the cycle: push without measuring, wait without data, delist too late." },
    { error: "Automatically reordering everything that runs out", porQueOcurre: "Because reordering is on autopilot. The same order goes out every week without checking if demand has changed.", consecuencia: "You fund stock that will sit idle. Orders should be based on actual rotation, not last month's list." },
    { error: "Confusing 'expensive wine' with 'dead stock'", porQueOcurre: "Because a €60 wine that takes time to sell looks like dead stock, but it may serve an image or high-ticket role.", consecuencia: "You delist strategic wines that do serve a purpose and replace them with more of the mid-range you've already saturated." },
  ],
  links: [
    { label: "Dead stock calculator", href: "/herramientas/calculadora-stock-muerto", description: "Quantify the capital tied up in references with no sales", type: "tool" },
    { label: "Checklist: Dead wine detection", href: "/recursos/checklist-deteccion-vinos-muertos", description: "Step-by-step process to identify and act on stagnant stock", type: "resource" },
    { label: "Monthly scorecard", href: "/recursos/scorecard-mensual", description: "Monitor your stock health every month with key metrics", type: "resource" },
    { label: "Winerim Core", href: "/producto/winerim-core", description: "The analytics engine that detects low rotation automatically", type: "product" },
    { label: "Winerim Supply", href: "/producto/winerim-supply", description: "Connect rotation with purchasing and replenishment decisions", type: "product" },
    { label: "Blog: How to detect dead stock", href: "/article/como-detectar-stock-muerto-carta-vinos", description: "Warning signs and process to identify wines with no rotation", type: "article" },
    { label: "Blog: Which wines are worth reordering", href: "/article/que-vinos-merece-la-pena-reponer", description: "Criteria for deciding what stays and what goes from the next order", type: "article" },
  ],
  miniCases: [
    {
      profile: "Hotel restaurant with 90 references",
      situation: "22 references had gone over 90 days without a single sale. Tied-up capital: €3,400.",
      action: "Delisted 15 references. Moved 5 to by-the-glass with aggressive pricing. Returned the remaining 2 to the supplier.",
      result: "Freed €2,800 in capital that was reinvested in 8 new references with validated demand. Dead stock dropped from 24% to 6%.",
    },
    {
      profile: "Urban bistro with 28 references",
      situation: "Only looked at weekly sales. Didn't notice that 6 wines had gone 45 days without rotation because 'one sold recently'.",
      action: "Set up an automatic alert in Winerim at 30 days without a sale. Every Monday reviews the list and decides: push, glass or delist.",
      result: "In 3 months went from 6 dead wines to 1. Average list rotation improved 18%.",
    },
  ],
  subtopics: [
    {
      id: "stock-muerto",
      title: "What counts as dead stock",
      priority: "inmediato",
      porQueTeLoMostramos: {
        detected: "Winerim has identified references on your list with zero sales in over 60 days.",
        whyMatters: "Between 10% and 25% of the average restaurant's list is dead stock without them knowing. It's capital that isn't working.",
        riskIfIgnored: "Every month that passes, that money stays idle. It doesn't improve with time: it only accumulates.",
      },
      queSignifica:
        "Dead stock is any reference that has gone more than 60 days without a sale and has no clear strategic justification (special reserve, wine held for an event, etc.). It's not the same as slow stock: a wine that sells 2 bottles a month is slow but alive. One that hasn't moved in 3 months is dead. The distinction matters because the action is different.",
      porQueImporta:
        "Because every idle bottle is money that isn't working. An average restaurant has between 10% and 25% of its list in dead stock without knowing it. If you have 20 dead references at an average cost of €8, with 3 bottles each on average, that's €480 tied up that could be generating margin in references that actually rotate.",
      queHacer: [
        "Filter all references with zero sales in the last 60 days.",
        "Separate those with a strategic justification (event, client reserve) from those that are simply forgotten.",
        "For the forgotten ones, decide now: push in service, glass, discount or delist?",
        "Establish a rule: any reference without a sale in 60 days automatically enters review.",
      ],
      errores: [
        { mistake: "Thinking 'dead stock' only means old or deteriorated wine", consequence: "The most expensive dead stock is usually perfectly drinkable wine that nobody orders." },
        { mistake: "Not distinguishing between dead stock and strategic stock", consequence: "You delist wines you should keep or keep ones that should go." },
        { mistake: "Waiting for the problem to solve itself", consequence: "Wine doesn't improve with time in a restaurant cellar. The capital stays idle." },
      ],
    },
    {
      id: "capital-inmovilizado",
      title: "How to detect tied-up capital",
      priority: "inmediato",
      porQueTeLoMostramos: {
        detected: "Winerim has calculated the total value of unsold bottles in your cellar.",
        whyMatters: "It's real money invested that isn't generating returns. Invisible on the P&L but very real in your cash flow.",
        riskIfIgnored: "Without action, tied-up capital grows every month with each new order that isn't adjusted to demand.",
      },
      queSignifica:
        "Tied-up capital is the total purchase value of all bottles you have in the cellar that aren't selling. It's not an abstract number: it's real euros you invested that aren't generating returns. To calculate it, multiply the purchase cost of each reference without sales by the number of bottles in stock.",
      porQueImporta:
        "Because it's invisible money. It doesn't show up as an expense on your P&L, but it doesn't generate revenue either. It's the most silent way to lose profitability. A restaurant group can have thousands of euros tied up without anyone knowing, because the stock is spread across locations and nobody adds it up.",
      queHacer: [
        "Calculate the total value of stock without sales in the last 60 days (cost × units).",
        "Sort from highest to lowest: the top 5 references probably account for 50% of the problem.",
        "Set a target: reduce tied-up capital by 30% in the next 60 days.",
        "Establish a monthly indicator: tied-up capital as a % of total stock.",
      ],
      errores: [
        { mistake: "Never calculating tied-up capital", consequence: "You don't know how much money you have sitting idle. You can't improve what you don't measure." },
        { mistake: "Counting only units, not euro value", consequence: "20 bottles at €3 are not the same as 20 bottles at €25. The impact is radically different." },
        { mistake: "Reviewing total stock without separating rotating from non-rotating", consequence: "Your inventory looks reasonable, but inside there's a layer of dead capital you can't see." },
      ],
    },
    {
      id: "cuando-impulsar",
      title: "When to push a reference",
      priority: "esta semana",
      porQueTeLoMostramos: {
        detected: "Winerim has found wines with good margin and good ratings but low rotation: they don't sell, but they could.",
        whyMatters: "Many wines don't sell due to lack of visibility, not quality. A 7–14 day push can reactivate them.",
        riskIfIgnored: "You delist potentially profitable wines without giving them a real sales opportunity.",
      },
      queSignifica:
        "Pushing means giving a wine that isn't selling an active second chance. It's not waiting: it's putting the floor team to work with that reference for a specific period (7–14 days) and measuring whether it responds. If the wine is good, well-positioned and the guest simply doesn't know it, a floor push can reactivate it.",
      porQueImporta:
        "Because many wines don't sell due to lack of visibility, not lack of quality. If the floor team doesn't know it, they don't recommend it. If they don't recommend it, it doesn't sell. And if it doesn't sell, you delist it without knowing if it really had no demand.",
      queHacer: [
        "Select 2–3 references with low rotation but good margin and good quality-price ratio.",
        "Train the floor team: let them taste it, know how to describe it and have a clear sales pitch.",
        "Define a push period (7–14 days) and a minimum sales target.",
        "If it hasn't responded by the end of the period, move to the next level: glass or delist.",
      ],
      errores: [
        { mistake: "Pushing everything at once", consequence: "The team can't recommend 10 new wines at the same time. Focus." },
        { mistake: "Pushing without training the team", consequence: "If the waiter doesn't know what to say, the push doesn't work." },
        { mistake: "Not setting a deadline for the push", consequence: "Without a deadline, the 'push' becomes an eternal hope." },
      ],
    },
    {
      id: "cuando-sacar-por-copa",
      title: "When to move it to by-the-glass",
      priority: "esta semana",
      porQueTeLoMostramos: {
        detected: "Winerim has found slow references that could work by the glass to accelerate rotation.",
        whyMatters: "The glass lowers the guest's barrier to entry and lets you recover capital in days instead of months.",
        riskIfIgnored: "Stock stays idle until it deteriorates or you liquidate at a loss.",
      },
      queSignifica:
        "Moving a slow reference to glass is a rescue strategy: instead of waiting for someone to order the bottle, you offer it by the glass to accelerate rotation and recover at least part of the investment. It works well with wines that are good but the guest doesn't dare order by the bottle (high price, unknown grape, unfamiliar region).",
      porQueImporta:
        "Because the glass lowers the guest's barrier to entry. A wine nobody orders at €35 per bottle can easily sell at €8 per glass. Plus, the glass lets you recover capital in days instead of months. But it only works if the wine has enough rotation by the glass to finish the bottle before it oxidises.",
      queHacer: [
        "Evaluate if the wine holds 24–48 hours open without losing quality (if not, rule it out for glass).",
        "Calculate the glass price including real waste (minimum 20–25% loss on the bottle).",
        "Tell the floor team it's a priority reference to recommend by the glass.",
        "If in 2 weeks you haven't sold at least 2–3 glasses per week, delist it and free the space.",
      ],
      errores: [
        { mistake: "Putting a wine by the glass that doesn't hold up once opened", consequence: "You serve oxidised wine, lose guest trust and waste the bottle." },
        { mistake: "Not adjusting the glass price to cover waste", consequence: "You sell by the glass but lose money because the bottle never finishes." },
        { mistake: "Keeping too many active glasses from slow wines", consequence: "You open 8 bottles, sell 2 glasses of each and throw away the rest." },
      ],
    },
    {
      id: "cuando-retirar",
      title: "When to delist a reference",
      priority: "inmediato",
      porQueTeLoMostramos: {
        detected: "Winerim has identified references that haven't responded to push or glass: clear candidates for delisting.",
        whyMatters: "Every reference without justification takes physical and mental space from another that could actually sell.",
        riskIfIgnored: "You keep dead stock indefinitely, accumulating idle capital and complexity with no return.",
      },
      queSignifica:
        "Delisting is the last option, but sometimes it's the best one. A wine should leave the list when: it's been through push and glass with no result, its margin doesn't justify the effort, or it simply no longer fits your concept. Delisting isn't failure: it's management. The worst thing you can do is keep a reference that occupies space without generating anything.",
      porQueImporta:
        "Because every reference you keep without justification takes space (physical and mental) from another that could sell. Your list has an optimal number of references, and exceeding it dilutes guest attention, complicates operations and increases management cost.",
      queHacer: [
        "If a reference hasn't responded to push or glass in 30 days, delist it.",
        "Decide what to do with remaining stock: liquidate, return to supplier or internal consumption.",
        "Update the list and tell the team the reference is no longer available.",
        "Document the decision so it doesn't get repurchased in the future.",
      ],
      errores: [
        { mistake: "Keeping it 'in case someone asks for it'", consequence: "Nobody is going to ask for it. Meanwhile, it occupies space and capital." },
        { mistake: "Delisting without documenting the reason", consequence: "The next sommelier or buyer may purchase it again." },
        { mistake: "Not having a clear delisting process", consequence: "Decisions get postponed indefinitely and dead stock accumulates." },
      ],
    },
    {
      id: "evolucion-stock",
      title: "How to read stock evolution",
      priority: "este mes",
      porQueTeLoMostramos: {
        detected: "Winerim monitors your stock trend month by month: tied-up capital, references without sales and low rotation.",
        whyMatters: "What matters isn't today's snapshot but whether the trend is improving or worsening.",
        riskIfIgnored: "Stock that worsens every month becomes a crisis. If you don't watch the trend, you only react when it's too late.",
      },
      queSignifica:
        "Stock evolution isn't a snapshot: it's a trend. What matters isn't how much stock you have today, but how it's changed compared to last month. Has tied-up capital risen? Have new references appeared with no sales? Is the percentage of the list with low rotation improving or worsening? Reading the evolution lets you anticipate problems before they become crises.",
      porQueImporta:
        "Because stock that worsens every month signals that something is failing in your purchasing, list or floor team. If you don't watch the trend, you only react when the problem is already big. If you do, you can correct course before tied-up capital spirals.",
      queHacer: [
        "Compare 3 indicators every month: total tied-up capital, number of references without sales in 60 days, and % of list with rotation < 1/month.",
        "If any of the three rises compared to the previous month, investigate the cause before it accumulates.",
        "Correlate stock evolution with your purchasing decisions: are you buying more than you sell?",
        "Set a quarterly improvement target and review it with your team every month.",
      ],
      errores: [
        { mistake: "Looking only at total stock without breaking it down by rotation", consequence: "Your inventory may look stable while dead stock grows inside." },
        { mistake: "Reviewing stock only when there's a visible problem", consequence: "By the time you see it, you've already lost months of tied-up capital." },
        { mistake: "Not connecting stock evolution with purchasing decisions", consequence: "You keep buying what doesn't sell because nobody cross-references the data." },
      ],
    },
  ],
  nextStep: {
    label: "Detect dead stock with the calculator",
    href: "/herramientas/calculadora-stock-muerto",
    description: "Quantify the capital tied up in references with no sales and decide what to delist first.",
  },
};

export default stockRotacionEN;
