export const PARTNER_OPPORTUNITY_MODEL_VERSION = "1.0.0";
export const PARTNER_WEEKS_PER_YEAR = 52;

const parseInput = (value: string, max: number): number | null => {
  const normalized = value.trim().replace(",", ".");
  if (!normalized || !/^\d+(?:\.\d+)?$/.test(normalized)) return null;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) && parsed >= 0 && parsed <= max ? parsed : null;
};

export type ClientValueInputs = {
  currentHoursPerWeek: string;
  scenarioHoursPerWeek: string;
  hourlyCost: string;
};

export type ClientValueResult = {
  currentHoursPerWeek: number;
  scenarioHoursPerWeek: number;
  recoverableHoursPerYear: number;
  additionalHoursPerYear: number;
  netHoursPerYear: number;
  netTimeValuePerYear: number | null;
};

export const calculateClientValue = (inputs: ClientValueInputs): ClientValueResult | null => {
  const currentHoursPerWeek = parseInput(inputs.currentHoursPerWeek, 168);
  const scenarioHoursPerWeek = parseInput(inputs.scenarioHoursPerWeek, 168);
  const hourlyCost = parseInput(inputs.hourlyCost, 10_000);
  if (currentHoursPerWeek === null || scenarioHoursPerWeek === null) return null;

  const netHoursPerYear = (currentHoursPerWeek - scenarioHoursPerWeek) * PARTNER_WEEKS_PER_YEAR;
  return {
    currentHoursPerWeek,
    scenarioHoursPerWeek,
    recoverableHoursPerYear: Math.max(netHoursPerYear, 0),
    additionalHoursPerYear: Math.max(-netHoursPerYear, 0),
    netHoursPerYear,
    netTimeValuePerYear: hourlyCost === null ? null : netHoursPerYear * hourlyCost,
  };
};

export type PortfolioFitInputs = {
  activeAccounts: string;
  monthlyReachRate: string;
  qualificationRate: string;
  hoursPerConversation: string;
  availableHoursPerMonth: string;
};

export type PortfolioFitResult = {
  accountsReachedPerMonth: number;
  qualifiedConversationsPerMonth: number;
  hoursNeededPerMonth: number;
  conversationCapacityPerMonth: number;
  capacityBalanceHours: number;
  hasCapacity: boolean;
};

export const calculatePortfolioFit = (inputs: PortfolioFitInputs): PortfolioFitResult | null => {
  const activeAccounts = parseInput(inputs.activeAccounts, 100_000);
  const monthlyReachRate = parseInput(inputs.monthlyReachRate, 100);
  const qualificationRate = parseInput(inputs.qualificationRate, 100);
  const hoursPerConversation = parseInput(inputs.hoursPerConversation, 100);
  const availableHoursPerMonth = parseInput(inputs.availableHoursPerMonth, 1_000);

  if (
    activeAccounts === null
    || monthlyReachRate === null
    || qualificationRate === null
    || hoursPerConversation === null
    || availableHoursPerMonth === null
    || hoursPerConversation === 0
  ) return null;

  const accountsReachedPerMonth = activeAccounts * (monthlyReachRate / 100);
  const qualifiedConversationsPerMonth = accountsReachedPerMonth * (qualificationRate / 100);
  const hoursNeededPerMonth = qualifiedConversationsPerMonth * hoursPerConversation;
  const conversationCapacityPerMonth = availableHoursPerMonth / hoursPerConversation;
  const capacityBalanceHours = availableHoursPerMonth - hoursNeededPerMonth;

  return {
    accountsReachedPerMonth,
    qualifiedConversationsPerMonth,
    hoursNeededPerMonth,
    conversationCapacityPerMonth,
    capacityBalanceHours,
    hasCapacity: capacityBalanceHours >= 0,
  };
};

export const PARTNER_CALCULATION_PROVENANCE = {
  userInput: [
    "currentHoursPerWeek",
    "scenarioHoursPerWeek",
    "hourlyCost",
    "activeAccounts",
    "monthlyReachRate",
    "qualificationRate",
    "hoursPerConversation",
    "availableHoursPerMonth",
  ],
  calculated: [
    "netHoursPerYear",
    "netTimeValuePerYear",
    "qualifiedConversationsPerMonth",
    "hoursNeededPerMonth",
    "conversationCapacityPerMonth",
    "capacityBalanceHours",
  ],
  excluded: ["partnerIncome", "commission", "closedDeals", "renewalRevenue", "territoryRights"],
} as const;
