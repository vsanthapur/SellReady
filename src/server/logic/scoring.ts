import type { WebsiteExtraction, ScoringResearchOutput } from "../../types/analysis";

/**
 * Call 2 – LLM research stub.
 * Hardcoded output that mimics the final LLM contract.
 */
export function runScoringResearch(
  revenue: number,
  grossProfit: number,
  websiteExtraction: WebsiteExtraction
): ScoringResearchOutput {
  const timestamp = new Date().toISOString();
  console.log(
    `[${timestamp}] [CALL2] Scoring Research - Input:`,
    JSON.stringify({ revenue, grossProfit, websiteExtraction }, null, 2)
  );

  const result: ScoringResearchOutput = {
    sgnaBand: {
      low: 35,
      mid: 45,
      high: 55,
      justification: "Typical SG&A for internet software companies ranges from 35–55%.",
    },
    industryMultiples: {
      revenueMultipleRange: "0.6x–0.9x",
      ebitdaMultipleRange: "4x–8x",
      justification: "Based on SaaS and internet services comparable transactions.",
    },
    profitabilityInsights: {
      descriptors: ["high margin digital model", "low COGS", "scalable operations"],
      industryProfitabilityNotes:
        "Internet services firms maintain strong gross margins and operating leverage.",
    },
    growthScore: {
      value: 65,
      justification: "Industry growth is driven by AI adoption but core markets are mature.",
    },
    marketTimingScore: {
      value: 75,
      justification: "Active M&A interest in cloud and AI infrastructure.",
    },
    buyerAppetiteScore: {
      value: 88,
      justification: "High demand from strategic buyers and PE funds.",
    },
    ownerDependenceScore: {
      value: 55,
      justification: "The company can operate independently of the owner.",
    },
  };

  console.log(`[${timestamp}] [CALL2] Scoring Research - Output:`, JSON.stringify(result, null, 2));

  return result;
}
