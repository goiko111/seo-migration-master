import { describe, expect, it } from "vitest";
import {
  calculateClientValue,
  calculatePortfolioFit,
  PARTNER_CALCULATION_PROVENANCE,
  PARTNER_OPPORTUNITY_MODEL_VERSION,
} from "@/lib/partnerOpportunity";

describe("partner opportunity calculations", () => {
  it("keeps a signed client-time result and values it only from user input", () => {
    expect(calculateClientValue({ currentHoursPerWeek: "8", scenarioHoursPerWeek: "5,5", hourlyCost: "20" })).toEqual({
      currentHoursPerWeek: 8,
      scenarioHoursPerWeek: 5.5,
      recoverableHoursPerYear: 130,
      additionalHoursPerYear: 0,
      netHoursPerYear: 130,
      netTimeValuePerYear: 2600,
    });
    expect(calculateClientValue({ currentHoursPerWeek: "4", scenarioHoursPerWeek: "5", hourlyCost: "20" })?.netHoursPerYear).toBe(-52);
  });

  it("does not treat a missing hourly cost as zero", () => {
    expect(calculateClientValue({ currentHoursPerWeek: "8", scenarioHoursPerWeek: "5", hourlyCost: "" })?.netTimeValuePerYear).toBeNull();
    expect(calculateClientValue({ currentHoursPerWeek: "8", scenarioHoursPerWeek: "5", hourlyCost: "0" })?.netTimeValuePerYear).toBe(0);
  });

  it("calculates portfolio conversations and capacity without forecasting deals", () => {
    expect(calculatePortfolioFit({
      activeAccounts: "80",
      monthlyReachRate: "25",
      qualificationRate: "20",
      hoursPerConversation: "1,5",
      availableHoursPerMonth: "8",
    })).toEqual({
      accountsReachedPerMonth: 20,
      qualifiedConversationsPerMonth: 4,
      hoursNeededPerMonth: 6,
      conversationCapacityPerMonth: 8 / 1.5,
      capacityBalanceHours: 2,
      hasCapacity: true,
    });
  });

  it("rejects empty, negative, formatted and out-of-range values", () => {
    expect(calculateClientValue({ currentHoursPerWeek: "", scenarioHoursPerWeek: "5", hourlyCost: "20" })).toBeNull();
    expect(calculateClientValue({ currentHoursPerWeek: "-8", scenarioHoursPerWeek: "5", hourlyCost: "20" })).toBeNull();
    expect(calculatePortfolioFit({ activeAccounts: "1 000", monthlyReachRate: "20", qualificationRate: "20", hoursPerConversation: "1", availableHoursPerMonth: "8" })).toBeNull();
    expect(calculatePortfolioFit({ activeAccounts: "100001", monthlyReachRate: "20", qualificationRate: "20", hoursPerConversation: "1", availableHoursPerMonth: "8" })).toBeNull();
    expect(calculatePortfolioFit({ activeAccounts: "10", monthlyReachRate: "101", qualificationRate: "20", hoursPerConversation: "1", availableHoursPerMonth: "8" })).toBeNull();
    expect(calculatePortfolioFit({ activeAccounts: "10", monthlyReachRate: "20", qualificationRate: "20", hoursPerConversation: "0", availableHoursPerMonth: "8" })).toBeNull();
  });

  it("documents what the model deliberately excludes", () => {
    expect(PARTNER_OPPORTUNITY_MODEL_VERSION).toBe("1.0.0");
    expect(PARTNER_CALCULATION_PROVENANCE.excluded).toEqual(expect.arrayContaining(["partnerIncome", "commission", "closedDeals"]));
  });
});
