import { BarChart3 } from "lucide-react";
import type { DeepAreaContent } from "./margenesPricing";

const cartaEquilibrioEN: DeepAreaContent = {
  name: "Wine List & Balance",
  tagline: "Your wine list should tell a coherent story",
  intro: "This section helps you assess whether your wine list has the right structure to sell, not just to impress. Balancing a list isn't about having 'a bit of everything': it's about each reference having a clear role. Especially for large, complex lists — from 250 references upward — balance stops being an aesthetic question and becomes a strategic decision that directly impacts sales, stock and table experience.",
  icon: BarChart3,
  accent: "text-wine",
  bg: "bg-wine/10",
  audiences: ["sala", "direccion", "compras-fb"],
  topErrors: [
    { error: "Building the list by accumulation instead of by design", porQueOcurre: "Because every new wine is added without removing another. The supplier offers, the sommelier accepts, the list grows without criteria.", consecuencia: "The list inflates, becomes unbalanced and fills with redundancies that cannibalise sales and generate dead stock." },
    { error: "Saturating one price tier without covering others", porQueOcurre: "Because you buy what you like or what the regular supplier offers, who usually operates in the same tier.", consecuencia: "You compete with yourself at €25-35 while guests looking for something under €20 or over €50 find no options." },
    { error: "Imbalance by origin: 80% from a single appellation", porQueOcurre: "Because the buyer's comfort zone or geographic proximity concentrates purchases from a few origins.", consecuencia: "Dependency on one market (price risk), lack of diversity for the guest, and a list that doesn't tell an interesting story." },
    { error: "Adding without removing: 'more options, better'", porQueOcurre: "Because removing feels like losing, and adding feels like winning. But beyond a certain point, every new reference dilutes attention.", consecuencia: "The guest takes longer to decide, the team can't know the full list, and sales concentrate on 15-20 references while the rest is decoration." },
    { error: "Not mapping the list before making decisions", porQueOcurre: "Because you work from the reference list without visualising the structure. Decisions are made one by one, without seeing the whole picture.", consecuencia: "You add where you're already saturated and leave gaps where there's demand. It's like renovating a house without looking at the floor plan." },
  ],
  links: [
    { label: "Wine mapping template", href: "/recursos/plantilla-wine-mapping-restaurante", description: "Map your list by type, price, origin and commercial role", type: "resource" as const },
    { label: "List balance template", href: "/recursos/plantilla-equilibrio-carta", description: "Diagnose saturation, gaps and cannibalisation by tier", type: "resource" as const },
    { label: "Profitable list checklist", href: "/recursos/checklist-carta-rentable", description: "Check whether your list meets the criteria of a list that sells", type: "resource" as const },
    { label: "Winerim Core", href: "/producto/winerim-core", description: "The analytics engine that evaluates your list balance automatically", type: "product" as const },
    { label: "Blog: Is your list unbalanced?", href: "/article/como-saber-si-carta-vinos-esta-descompensada", description: "Quick diagnosis to spot imbalances in your wine list", type: "article" as const },
    { label: "Blog: Is your list too long?", href: "/article/cuando-carta-vinos-es-demasiado-larga", description: "Signs of too many references and how to act", type: "article" as const },
  ],
  subtopics: [
    {
      id: "carta-descompensada",
      title: "How to tell if a list is unbalanced",
      priority: "esta semana",
      porQueTeLoMostramos: { detected: "Winerim has mapped your list's distribution by type, price and origin and found areas of saturation and gaps.", whyMatters: "An unbalanced list loses sales (the guest can't find what they want), cannibalises margin and accumulates stock where there's excess.", riskIfIgnored: "Every new reference added without criteria unbalances the list further and amplifies the problem." },
      queSignifica:
        "An unbalanced list is one where the reference distribution doesn't reflect what your customers actually order. It could be an excess of reds and almost no sparkling, an exaggerated concentration in one price tier, or 40% of the list devoted to a single region. Imbalance isn't visible at first glance: it's detected when you map the list by variables and compare with your sales data.",
      porQueImporta:
        "Because an unbalanced list creates three problems at once: the guest can't find what they want (lost sale), saturated references cannibalise each other (lost margin), and you accumulate stock in areas of excess (tied-up capital). In large lists — from 250 references upward — imbalance amplifies exponentially.",
      queHacer: [
        "Map your list by wine type (red, white, rosé, sparkling, fortified) and calculate the % of each.",
        "Cross that distribution with your sales data: is 70% of your list red but 40% of your sales white?",
        "Identify the 3 most saturated categories and the 2 emptiest. That's where your opportunities are.",
        "Set a target distribution consistent with your concept and review it quarterly.",
      ],
      errores: [
        { mistake: "Assuming the list is balanced because 'it has a bit of everything'", consequence: "Having a bit of everything isn't balance. You might have 60 reds and 4 whites." },
        { mistake: "Balancing by number of references without looking at sales", consequence: "You can have 20 sparkling wines and sell 2. Balance should reflect demand." },
        { mistake: "Not reviewing balance after adding new references", consequence: "Every addition without criteria unbalances the list a bit more." },
      ],
    },
    {
      id: "exceso-huecos-precio",
      title: "Excess and gaps by price range",
      priority: "esta semana",
      porQueTeLoMostramos: { detected: "Winerim has analysed your reference distribution by price tier and found saturated zones and empty tiers.", whyMatters: "Price is the guest's first filter. Saturating a tier generates cannibalisation; leaving gaps loses sales you never see.", riskIfIgnored: "You keep saturating tiers where you already compete with yourself while the guest looking for something different leaves without ordering." },
      queSignifica:
        "Price ranges are the tiers where your references are distributed: €10-15, €15-25, €25-40, etc. Excess in a tier means you have too many references competing for the same guest in the same range. A gap means there's a tier where the guest searches and finds nothing. Both are problems, but excess is more expensive (generates cannibalisation and stock) and gaps are more invisible (you lose sales you never see).",
      porQueImporta:
        "Because price is the guest's first filter. If your list has 15 reds between €18 and €22 and none between €30 and €40, you're saturating the undecided guest in one tier and losing the one looking for something special. In large lists, this effect multiplies: every saturated tier is a cannibalisation nest.",
      queHacer: [
        "Divide your list into price tiers (e.g. <€15, €15-25, €25-40, €40-60, >€60) and count references in each.",
        "Identify tiers with more than 10 references of the same type: that's saturation.",
        "Look for empty tiers or those with fewer than 2 options: that's a gap to fill.",
        "Compare price distribution with your average wine ticket: are most of your options in the tier your guest chooses?",
      ],
      errores: [
        { mistake: "No visibility of distribution by price tier", consequence: "You don't know where you're saturated or where you have gaps until a guest tells you." },
        { mistake: "Adding references without checking which tier they fall into", consequence: "Every new reference landing in a saturated tier worsens the problem." },
        { mistake: "Filling a gap with a wine that doesn't fit the concept", consequence: "Having something in that tier isn't enough: it must be consistent with your restaurant." },
      ],
    },
    {
      id: "equilibrio-estilos",
      title: "Balance by style",
      priority: "este mes",
      porQueTeLoMostramos: { detected: "Winerim has classified your list by organoleptic profile and detected excessive concentration in certain styles.", whyMatters: "If all your reds are powerful or all your whites are fruity, you limit your potential market to a single palate type.", riskIfIgnored: "You lose the guest who wants something different. And you'll never know, because they don't ask: they simply choose something else or skip wine." },
      queSignifica:
        "Beyond red/white/rosé, style balance looks at the diversity of organoleptic profiles: do you have light, fresh wines alongside powerful ones? Are there young options as well as aged? Does your list offer variety of grapes and winemaking, or does everything sound similar? Style balance determines whether your list covers the breadth of your clientele's tastes or speaks only to one palate type.",
      porQueImporta:
        "Because the guest doesn't choose only by type and price: they choose by what they feel like. If all your reds are powerful and oaky, you lose the one who wants something light. If all your whites are fruity, you lose the one looking for minerality. Good style balance maximises the probability that each guest finds something that fits.",
      queHacer: [
        "Classify your references by profile: light/medium/full-bodied, young/aged/reserve, aromatic/mineral/structured.",
        "Check whether you have options in each quadrant or everything clusters in one profile.",
        "Ask the floor team: are there requests they can't cover with the current list?",
        "If 80% of your list has a similar profile, you're limiting your potential market.",
      ],
      errores: [
        { mistake: "Designing the list according to the sommelier's or chef's tastes", consequence: "Your list satisfies whoever creates it, but may be ignoring 60% of your guests." },
        { mistake: "Confusing variety of producers with variety of styles", consequence: "20 different producers can make very similar wines if they're from the same region and grape." },
        { mistake: "Not adapting styles to the restaurant's cuisine", consequence: "A list full of powerful reds in a light-cuisine restaurant creates dissonance." },
      ],
    },
    {
      id: "equilibrio-origen",
      title: "Balance by origin",
      priority: "este mes",
      porQueTeLoMostramos: { detected: "Winerim has analysed your list distribution by appellation and origin and detected over-concentration or dispersion.", whyMatters: "Origin concentration creates purchasing risk (market dependency) and may not reflect what your clientele asks for.", riskIfIgnored: "If your main appellation raises prices, you have no alternatives. And your list tells a story that may not match your customer." },
      queSignifica:
        "Origin balance evaluates how your references are distributed by appellation, region or country. Excessive concentration in one origin can limit your offering and create dependency on one purchasing market. Excessive dispersion can generate a list without identity. The sweet spot depends on your concept: a regional cuisine restaurant has logical concentration; a cosmopolitan one needs breadth.",
      porQueImporta:
        "Because origin is part of the story your list tells. If you have 30 Riojas and 2 Albariños, your list says something about your priorities — which may or may not match what your clientele orders. Also, origin concentration creates purchasing risk: if your main appellation raises prices, you have no immediate alternatives.",
      queHacer: [
        "List the 5 appellations or regions with most references in your list. Do they exceed 50% of the total?",
        "Compare with your sales data: is the concentration justified by demand or by purchasing inertia?",
        "Evaluate whether your origin distribution is coherent with your cuisine type and customer profile.",
        "If you detect over-concentration, don't eliminate all at once: substitute gradually when renewing references.",
      ],
      errores: [
        { mistake: "Over-representing an appellation due to personal relationships with wineries or distributors", consequence: "Your list reflects your commercial contacts, not your customer's needs." },
        { mistake: "Diversifying for the sake of it without criteria", consequence: "A list with 30 countries and no depth doesn't convey expertise: it conveys scatter." },
        { mistake: "Not adapting origins to cuisine seasonality", consequence: "Cold-climate whites in winter and powerful reds in summer don't match what the guest wants." },
      ],
    },
    {
      id: "carta-demasiado-larga",
      title: "When a wine list is too long",
      priority: "esta semana",
      porQueTeLoMostramos: { detected: "Winerim has calculated your effectiveness ratio: references with actual sales vs. total references on the list.", whyMatters: "Excess options paralyse the guest, concentrate sales on 15-20 references and turn the rest into costly decoration.", riskIfIgnored: "You accumulate complexity, stock and management without return. Your team always recommends the same thing because they can't know the full list." },
      queSignifica:
        "A list is too long when it has more references than your operation can manage, your team can know, or your guest can process. There's no magic number, but there are clear signals: if more than 20% of your references haven't sold in 60 days, if your floor team can't describe half the list, or if the guest takes more than 5 minutes to choose, your list is too long for your context.",
      porQueImporta:
        "Because a long list doesn't impress: it paralyses. The excess of options (paradox of choice) reduces conversion, increases service time and concentrates sales on the same 15-20 references the team knows and recommends. The rest is decoration generating stock, management and cost with no return. In large lists from 250 references upward, this risk is structural.",
      queHacer: [
        "Calculate your effectiveness ratio: references with actual sales in the last 60 days / total references.",
        "If your ratio is < 70%, your list has too many references for your demand level.",
        "Identify references the floor team never recommends: they're probably unnecessary.",
        "Set an operational limit and respect it: every new addition requires a removal.",
      ],
      errores: [
        { mistake: "Believing a long list equals quality or prestige", consequence: "A 400-reference list where 150 don't sell isn't prestigious: it's inefficient." },
        { mistake: "Not setting a limit on the number of references", consequence: "The list grows by accumulation and is never pruned, until dead stock forces action." },
        { mistake: "Reducing the list by eliminating the cheapest wines", consequence: "Entry-level wines are the highest rotators and often the gateway to by-the-glass sales." },
      ],
    },
    {
      id: "carta-amplia-compleja",
      title: "What a large and complex list means",
      priority: "seguimiento",
      porQueTeLoMostramos: { detected: "Your list exceeds 250 references: it's a strategic asset if managed with data, and a liability if managed by intuition.", whyMatters: "Complexity adds depth but also friction: more stock, more cannibalisation, more risk without visibility.", riskIfIgnored: "Without analytical tools, complexity becomes chaos. You can't see what cannibalises or where your gaps are." },
      queSignifica:
        "A large and complex list — from 250 references upward — is neither inherently good nor bad. It's a strategic asset if managed with data, and an operational liability if managed by intuition. Complexity adds depth (more options for the expert guest) but also adds friction (harder to manage, more stock, more cannibalisation risk). Winerim is designed specifically for this scenario.",
      porQueImporta:
        "Because managing a 250+ reference list without analytical tools is like flying a plane without instruments. You need to know what sells, what doesn't, what cannibalises, where you have gaps and where you have excess. Without that visibility, complexity becomes chaos. With it, it becomes competitive advantage.",
      queHacer: [
        "If your list exceeds 250 references, prioritise implementing a continuous analysis system (not one-off reviews).",
        "Segment the list into manageable blocks: by type, by price tier, by origin. Analyse each block separately.",
        "Assign a list health owner who reviews key indicators monthly.",
        "Accept that complexity requires tools: what works with 80 references doesn't scale to 300.",
      ],
      errores: [
        { mistake: "Managing a 300-reference list with the same methods as a 50-reference one", consequence: "Complexity grows exponentially, but manual methods don't scale." },
        { mistake: "Not segmenting: treating the entire list as one block", consequence: "Problems in one segment get diluted in the average and aren't detected until they're severe." },
        { mistake: "Considering complexity as a problem to reduce rather than an asset to manage", consequence: "If your concept requires breadth, the solution isn't to cut: it's to manage better." },
      ],
    },
    {
      id: "wine-mapping",
      title: "How to interpret wine mapping and list architecture",
      priority: "este mes",
      porQueTeLoMostramos: { detected: "Winerim has automatically generated the wine mapping for your list crossing type × price × style.", whyMatters: "Without a visual map, every decision (addition, removal, repricing) is made without context. The map tells you where to act in 5 minutes.", riskIfIgnored: "You make decisions on a list without seeing the structure. It's like renovating a house without a floor plan." },
      queSignifica:
        "Wine mapping is the visual representation of your list in a matrix crossing at least two variables: typically wine type × price tier, or style × origin. List architecture is the next step: assigning a commercial role to each zone of the map (attraction, conversion, positioning, exploration). A well-read map tells you where to act. A well-defined architecture tells you why.",
      porQueImporta:
        "Because without a map you can't see the structure of your list. And without structure, every decision (add, remove, reprice) is made without context. Wine mapping converts a list of 200 references into an image any manager can interpret in 5 minutes. It's the fastest diagnostic tool that exists for a wine list.",
      queHacer: [
        "Create a map of your list with axes type × price. Each reference is a point on the map.",
        "Identify dense zones (saturation) and empty zones (opportunity or irrelevance).",
        "Assign roles: which zone attracts the guest? Which converts? Which positions your restaurant?",
        "Use the map for addition/removal decisions: if a new wine falls in a saturated zone, you need to remove another first.",
      ],
      errores: [
        { mistake: "Not having a visual map of the list", consequence: "You make decisions on a list without seeing the structure. It's like renovating a house without a floor plan." },
        { mistake: "Doing wine mapping once and not updating it", consequence: "The map expires with every list change. It has to be a living document." },
        { mistake: "Mapping only by type and price without including sales data", consequence: "You see the structure but don't know which zones work and which don't." },
      ],
    },
  ],
  miniCases: [
    {
      profile: "Fine dining with 180-reference list",
      situation: "65% of the list were reds from Rioja and Ribera, concentrated between €25 and €35. Whites and sparkling represented only 12%. The floor team acknowledged that many guests asked for 'something fresh' and couldn't find options.",
      action: "Mapped the list by type × price. Removed 14 redundant reds in the saturated tier and added 6 whites and 3 sparkling in empty tiers (€15-25 and €35-50). Redistributed without changing the total reference count.",
      result: "White wine sales rose 28% in the first month. Average wine ticket increased by €2.40 because guests found options where there were none before.",
    },
    {
      profile: "Boutique hotel with 310-reference list",
      situation: "Large and complex list managed as a flat list, without wine mapping. 22% of references hadn't sold in 90 days. The purchasing team didn't know what to remove because 'anything could sell'.",
      action: "Implemented Winerim Core to generate automatic wine mapping. Identified 68 references in saturation zones and 4 price tiers without coverage. Removed 35 references in 3 monthly phases.",
      result: "Effectiveness ratio went from 72% to 89%. Capital freed from stock: €8,200. The floor team went from always recommending the same wines to covering diverse requests.",
    },
    {
      profile: "Wine bar with 95 references and high rotation",
      situation: "All wines sat between €18 and €30. Nothing below €15 (entry) or above €45 (special). The casual guest left without ordering and the connoisseur couldn't find depth.",
      action: "Created three new tiers: entry (<€15, 4 wines), exploration (€35-45, 5 wines) and image (>€50, 3 wines). Reduced the central tier from 95 to 83 references.",
      result: "Wine penetration per table rose from 62% to 74%. Image wines opened conversations the team leveraged to sell the exploration tier.",
    },
    {
      profile: "Group of 5 casual-premium locations",
      situation: "Each location had a different list created by its floor manager. There was no balance standard by type or price. Two locations had no sparkling; one had 40% rosé with no demand.",
      action: "Defined a common list architecture: target distribution by type (50% red, 25% white, 15% sparkling, 10% other) with ±10% local adaptation margin. Used Winerim Core to monitor monthly deviations.",
      result: "In 3 months, all 5 locations converged on balance without losing identity. The location with excess rosé reduced dead stock by 60%. Benchmarking between locations enabled replicable best practices.",
    },
  ],
  nextStep: {
    label: "Review your list balance",
    href: "/recursos/plantilla-equilibrio-carta",
    description: "Download the template and diagnose saturation, gaps and cannibalisation in your current list.",
  },
};

export default cartaEquilibrioEN;
