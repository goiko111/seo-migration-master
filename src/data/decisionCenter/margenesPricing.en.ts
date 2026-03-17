import { DollarSign } from "lucide-react";
import type { DeepAreaContent } from "./margenesPricing";

const margenesPricingEN: DeepAreaContent = {
  name: "Margins & Pricing",
  tagline: "Understand the real profitability of each wine and act with data",
  intro: "This section helps you interpret every margin, pricing and profitability indicator that Winerim shows you. You don't need to be a finance expert: you need to know what to look at, why it matters and what to do with each data point.",
  icon: DollarSign,
  accent: "text-amber-500",
  bg: "bg-amber-500/10",
  audiences: ["direccion", "compras-fb"],
  topErrors: [
    { error: "Raising prices without reviewing purchase cost first", porQueOcurre: "Because it's easier to change the selling price than to negotiate with the supplier. The assumption is that low margin is a price problem, when often it starts at the purchase.", consecuencia: "You raise the price for the guest (who does notice) when you could have improved the margin invisibly by renegotiating the purchase cost." },
    { error: "Applying a single markup to the entire list", porQueOcurre: "Because it simplifies management and sounds 'fair'. A ×3 across the board seems reasonable.", consecuencia: "You lose margin on cheap wines (where the guest is most price-sensitive) and become uncompetitive on expensive wines (where the markup should be lower)." },
    { error: "Not reviewing margins every month", porQueOcurre: "Because the day-to-day takes over and margins seem stable. But costs rise, waste varies and demand shifts.", consecuencia: "Deviations accumulate silently. You only see them when the quarter closes and the numbers don't add up." },
    { error: "Setting glass price by dividing the bottle by 5", porQueOcurre: "Because it's the quickest mental calculation. But it ignores waste, service cost and the additional margin the glass should generate.", consecuencia: "You sell glasses at a loss without knowing it. A 25% real waste rate turns your theoretical 70% margin into an actual 35%." },
    { error: "Keeping a wine with good margin but no sales", porQueOcurre: "Because the margin figure looks positive and feels reassuring. But a wine that doesn't sell generates zero actual margin.", consecuencia: "Tied-up capital occupying cellar space and list space without generating any return. The potential margin never materialises." },
  ],
  links: [
    { label: "Margin calculator", href: "/calculadora-margen-vino", description: "Calculate the real margin of any reference in seconds", type: "tool" },
    { label: "Template: Monthly margin review", href: "/recursos/plantilla-revision-mensual-margenes", description: "Monthly process to spot deviations and opportunities", type: "resource" },
    { label: "Resource: Margin analysis", href: "/recursos/scorecard-mensual", description: "Scorecard to monitor your pricing health", type: "resource" },
    { label: "Winerim Core", href: "/producto/winerim-core", description: "The analytics engine that automates all of this for you", type: "product" },
    { label: "Blog: 7 pricing mistakes", href: "/article/errores-fijar-precios-vino-restaurante", description: "The most common pricing mistakes and how to avoid them", type: "article" },
    { label: "Blog: Levers to improve margin", href: "/article/palancas-mejorar-margen-vino-sin-rehacer-carta", description: "How to improve margin without redoing your wine list", type: "article" },
    { label: "Blog: Wine F&B metrics", href: "/article/metricas-fb-vino-restaurante", description: "The metrics every F&B manager should monitor" },
  ],
  miniCases: [
    {
      profile: "Fine dining with a 60-reference list",
      situation: "Average margin of 58%, but the top 5 sellers had a ×2.2 markup because they were never updated after the last supplier price increase.",
      action: "Recalculated prices for the top 5 references. Increased between €1 and €3 depending on the price bracket. Gave the floor team value talking points to justify the change.",
      result: "Average margin rose to 63% without losing a single sale on those references. Estimated impact: +€1,800/month.",
    },
    {
      profile: "Casual dining with 35 references",
      situation: "Applied a uniform ×3 markup to the entire list. Entry wines (cost <€5) ended up at €15 and didn't sell; wines >€15 cost ended up at €45 and didn't sell either.",
      action: "Implemented a tiered markup: ×3.5 for wines under €8 cost, ×2.8 for the mid-range, ×2.2 for image/prestige wines.",
      result: "Average wine ticket rose 12% because guests stopped always choosing the cheapest option.",
    },
  ],
  subtopics: [
    {
      id: "margen-bruto",
      title: "What is gross margin",
      priority: "esta semana",
      porQueTeLoMostramos: {
        detected: "Winerim has calculated the gross margin for every reference on your list by crossing selling price with actual purchase cost.",
        whyMatters: "If you don't distinguish between percentage margin and absolute contribution, you may be pushing the wrong wines.",
        riskIfIgnored: "You keep promoting wines that look profitable by percentage but leave you less in euros than others you never even consider.",
      },
      queSignifica:
        "Gross margin is the difference between what you charge for a wine and what it costs you to buy it. It's expressed in euros (contribution) or as a percentage. It's the most basic profitability metric, but not the only one that matters. A wine with a 60% margin can leave you less real money than one with 45%, if the latter sells at double the price.",
      porQueImporta:
        "Because it's the starting point for any pricing decision. If you don't know your gross margin per reference, you're making decisions blind. And if you only look at the percentage without seeing the absolute contribution, you may be promoting the wrong wines.",
      queHacer: [
        "Calculate the gross margin in euros and percentage for your 10 best-selling references.",
        "Sort them by absolute contribution (€), not by percentage.",
        "Compare: are your best-selling wines also the ones that leave the most margin?",
        "If they're not, you have an immediate repricing opportunity.",
      ],
      errores: [
        { mistake: "Looking only at the margin percentage", consequence: "A €8 wine with 65% margin leaves €5.20. A €25 wine with 50% leaves €12.50. The second is a better deal." },
        { mistake: "Calculating margin on selling price instead of on cost", consequence: "You fool yourself with a higher number that doesn't reflect what you actually earn." },
        { mistake: "Not updating the cost after supplier changes", consequence: "Your theoretical margin no longer exists: you sell believing you're earning, but you're not." },
      ],
    },
    {
      id: "margen-sano",
      title: "What is a healthy margin",
      priority: "este mes",
      porQueTeLoMostramos: {
        detected: "Winerim has compared your weighted average markup with the benchmark for your segment.",
        whyMatters: "If you're below the healthy range, you have a structural problem that can't be fixed by selling more.",
        riskIfIgnored: "Every month that passes with misaligned margin is accumulated profitability you can never recover.",
      },
      queSignifica:
        "There's no universal 'correct' margin. It depends on your segment, average ticket, volume and cost structure. But there are market benchmarks: most profitable restaurants operate with a weighted average markup between ×2.5 and ×3.5 on cost, equivalent to gross margins of 60–72%. What matters isn't a fixed number, but that your sales-weighted average margin is in line with your business model.",
      porQueImporta:
        "Because if your average margin is below the benchmark for your segment, you have a structural problem that can't be fixed by selling more. And if it's well above, you could be losing competitiveness and volume without knowing it.",
      queHacer: [
        "Calculate your sales-weighted average markup (not per reference).",
        "Compare with the benchmark for your segment: casual (×2.5–3), fine dining (×2–2.5), hotel (×3–4).",
        "If you're below, identify the references dragging the average down.",
        "If you're above, evaluate whether your glass and bottle volume is where you'd expect.",
      ],
      errores: [
        { mistake: "Applying a single markup to the entire list", consequence: "You lose margin on cheap wines and become uncompetitive on expensive ones." },
        { mistake: "Comparing your margin with a different segment's", consequence: "A hotel has a different cost structure than a bistro. They're not comparable." },
        { mistake: "Not weighting by sales", consequence: "Your average margin looks good, but your best sellers are the worst in terms of margin." },
      ],
    },
    {
      id: "referencias-mal-calibradas",
      title: "How to spot miscalibrated references",
      priority: "inmediato",
      porQueTeLoMostramos: {
        detected: "Winerim has identified references whose price doesn't match their cost, list position or commercial role.",
        whyMatters: "A single miscalibrated reference in your top 5 can cost you thousands of euros a year without you noticing.",
        riskIfIgnored: "The impact compounds day after day and you only see it when you close the quarter and the margin falls short.",
      },
      queSignifica:
        "A miscalibrated reference is a wine whose price doesn't reflect its real cost, its position on the list or its commercial role. It may be too cheap (you lose margin), too expensive (it doesn't rotate) or poorly positioned against other wines in the same bracket.",
      porQueImporta:
        "Because a single miscalibrated reference in your top 5 sellers can cost you thousands of euros a year. And if you have several, the impact accumulates invisibly day after day.",
      queHacer: [
        "Cross your top 10 sellers with their margin: look for the ones that sell the most but leave the least.",
        "Identify references with a markup < ×2 or > ×4.5 (both extremes are red flags).",
        "Check if there are wines at the same price but very different cost: one of them is miscalibrated.",
        "Fix at least one reference this week and measure the impact after 30 days.",
      ],
      errores: [
        { mistake: "Assuming that if it sells well, the price is right", consequence: "A wine can sell a lot precisely because it's too cheap." },
        { mistake: "Not reviewing after supplier cost changes", consequence: "The margin disappears without you noticing until the end of the month." },
        { mistake: "Calibrating only on cost, without considering guest perception", consequence: "An aggressive repricing can break the trust of regular guests." },
      ],
    },
    {
      id: "cuando-subir-precio",
      title: "When to raise a price",
      priority: "esta semana",
      porQueTeLoMostramos: {
        detected: "Winerim has found references with high sales volume but margin below your list average.",
        whyMatters: "These are clear candidates for a €1–2 increase that rarely impacts demand but improves your result every day.",
        riskIfIgnored: "Every service that passes without correcting the price is margin you lose and can never recover.",
      },
      queSignifica:
        "Raising prices isn't always the answer, but it's often the most direct action to improve profitability. The right moment is when you have data to justify it: a margin below benchmark, a cost that has risen, a reference that sells well with low margin, or a price bracket with no internal competition.",
      porQueImporta:
        "Because many restaurants avoid raising prices for fear of losing guests, but the reality is that €1–2 increases on strategic references rarely impact demand. On the other hand, not raising when you should costs you margin every single day.",
      queHacer: [
        "Identify the 3 references with the highest sales volume and margin below average.",
        "Evaluate a €1–2 increase and calculate the annual impact (volume × increase).",
        "Check that the new price doesn't conflict with another reference in the same bracket.",
        "Implement the change and review sales after 30 days. If volume doesn't drop, the price was correct.",
      ],
      errores: [
        { mistake: "Raising all prices at once", consequence: "Regular guests notice the change and the perception of value suffers." },
        { mistake: "Never raising out of fear of the reaction", consequence: "Your margin erodes year after year while costs keep rising." },
        { mistake: "Raising without checking the competitive bracket", consequence: "You create a price gap or overlap that didn't exist before." },
      ],
    },
    {
      id: "cuando-revisar-compra",
      title: "When to review the purchase",
      priority: "esta semana",
      porQueTeLoMostramos: {
        detected: "Winerim has found references with low margin whose purchase cost has risen compared to historical data.",
        whyMatters: "Every euro you save on purchase is direct margin, invisible to the guest but very visible on your P&L.",
        riskIfIgnored: "You keep paying more than you should out of supplier loyalty, not value received.",
      },
      queSignifica:
        "A low margin doesn't always get fixed by raising the price. Sometimes the problem is that you're buying too expensively. Reviewing the purchase means checking whether the acquisition cost of a reference is still competitive, whether there are cheaper alternatives of equivalent quality, or whether you can negotiate better terms.",
      porQueImporta:
        "Because every euro you save on purchase is a euro of direct margin. And unlike raising the price (which the guest sees), improving the purchase is invisible to the guest but very visible on your P&L.",
      queHacer: [
        "Identify references with low margin and review their cost history: has it risen?",
        "Request at least 2 alternative quotes for those references.",
        "Negotiate with your current supplier using market prices as leverage.",
        "If the difference is >10%, consider the switch or use the negotiation to get better terms.",
      ],
      errores: [
        { mistake: "Not reviewing costs because 'you always buy from the same supplier'", consequence: "You pay more than necessary out of loyalty, not value received." },
        { mistake: "Comparing only price without evaluating service and terms", consequence: "A cheap supplier with poor reliability costs you more in the long run." },
        { mistake: "Not connecting low margin with purchase origin", consequence: "You look for the solution in the selling price when the problem is the cost." },
      ],
    },
    {
      id: "cuando-revisar-copeo",
      title: "When to review the by-the-glass programme",
      priority: "esta semana",
      porQueTeLoMostramos: {
        detected: "Winerim has found by-the-glass references whose actual margin differs significantly from the theoretical margin.",
        whyMatters: "The glass can be your best margin lever or your biggest source of invisible loss. A €0.50 error per glass across 20 glasses/week is over €500/year lost.",
        riskIfIgnored: "You keep serving glasses at a loss-making price without knowing it, because you never cross-checked waste data with pricing.",
      },
      queSignifica:
        "If a reference has a low margin and is served by the glass, the problem may lie in the glass programme: miscalculated glass price, unaccounted waste, or insufficient rotation. The glass multiplies pricing errors because each bottle is split into 4–6 servings, and any deviation repeats with every pour.",
      porQueImporta:
        "Because the glass can be your biggest margin lever (up to ×3 over bottle) or your biggest source of invisible loss. A €0.50 error per glass, multiplied by 20 glasses a week, is over €500 a year lost on a single reference.",
      queHacer: [
        "Recalculate the glass price including real waste (assume at least 20–25% loss).",
        "Compare the glass margin with the bottle margin for the same reference.",
        "If the glass doesn't deliver more margin than the bottle, you either have a price problem or a waste problem.",
        "Check if the glass reference has enough rotation to finish the bottle within 24–48 hours.",
      ],
      errores: [
        { mistake: "Dividing the bottle price by 5 to set the glass price", consequence: "You don't cover waste, service or margin. You sell at a loss without knowing it." },
        { mistake: "Not measuring real waste for each glass reference", consequence: "Your theoretical margin and actual margin can differ by 30% or more." },
        { mistake: "Keeping low-rotation glasses 'because they look good on the list'", consequence: "Every opened bottle that isn't finished is money thrown away." },
      ],
    },
    {
      id: "revision-mensual",
      title: "How to read a monthly margin review",
      priority: "este mes",
      porQueTeLoMostramos: {
        detected: "Winerim automatically generates a monthly margin comparison so you can spot deviations before they accumulate.",
        whyMatters: "Suppliers raise prices, waste varies with the season and demand shifts. Without a monthly review, surprises pile up.",
        riskIfIgnored: "Deviations add up silently and you only see them when the quarter closes worse than expected.",
      },
      queSignifica:
        "A monthly margin review is the process of checking, every month, whether your list is still profitable. It includes comparing current margins with the previous month, detecting cost deviations, identifying references that have changed performance and deciding adjustments. It's not a report: it's a recurring decision-making process.",
      porQueImporta:
        "Because margins change without you doing anything. Suppliers raise prices, demand varies, glasses generate different waste by season. If you don't review monthly, deviations accumulate and turn into unpleasant quarter-end surprises.",
      queHacer: [
        "Block 1 hour per month to review margins. Put it in the calendar as an operational routine.",
        "Compare this month's sales-weighted average margin vs. last month. Up or down?",
        "Identify the 3 references with the largest margin drop and find the cause (cost, volume, waste).",
        "Make at least 1 adjustment decision per review: repricing, glass change, supplier negotiation.",
      ],
      errores: [
        { mistake: "Skipping the monthly review because 'there's no time'", consequence: "Deviations accumulate and you only see them when they're already a serious problem." },
        { mistake: "Reviewing only the overall average margin", consequence: "The average may look fine while 5 references are in the red." },
        { mistake: "Reviewing without making any concrete decision", consequence: "The review becomes a theoretical exercise that changes nothing." },
      ],
    },
  ],
  nextStep: {
    label: "Open the margin calculator",
    href: "/calculadora-margen-vino",
    description: "Calculate the real margin of your references and spot those that need a price adjustment.",
  },
};

export default margenesPricingEN;
