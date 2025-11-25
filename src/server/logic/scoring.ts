import type { WebsiteExtraction, Scoring, Score, SubScore } from "../../types/analysis";

/**
 * Factor Scoring Engine
 * Takes website metadata + revenue + profit → computes scoring factors
 * 
 * Sell Readiness Formula:
 * 0.3 * Growth + 0.2 * Profitability + 0.2 * MarketTiming + 0.2 * BuyerAppetite + 0.1 * OwnerDependence
 * 
 * TODO: Replace hardcoded output with actual LLM call
 * 
 * @param revenue - Annual revenue
 * @param grossProfit - Gross profit
 * @param websiteExtraction - Website extraction data from Call 1
 * @returns Scoring data with individual scores and calculated sell readiness score
 */
export function calculateScoring(
  revenue: number,
  grossProfit: number,
  websiteExtraction: WebsiteExtraction
): Scoring {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [CALL2] Factor Scoring Engine - Input:`, JSON.stringify({
    revenue,
    grossProfit,
    websiteExtraction
  }, null, 2));

  // Hardcoded output for now (will be replaced with LLM call)
  // Example output for Google
  const growthScore: Score = {
    value: 65,
    label: "Moderate",
    justification: "Industry demand is stable with ongoing technological expansion, but growth has matured due to market saturation."
  };

  const profitabilityScore: Score = {
    value: 85,
    label: "Strong",
    justification: "Gross margins remain high due to scalable digital operations and diversified revenue streams."
  };

  const marketTimingScore: Score = {
    value: 70,
    label: "Favorable",
    justification: "The sector is benefiting from AI-driven innovation and continued consolidation in cloud and software markets."
  };

  const buyerAppetiteScore: Score = {
    value: 80,
    label: "High",
    justification: "Major acquirers are active in tech, seeking AI and cloud capabilities."
  };

  const ownerDependenceScore: Score = {
    value: 55,
    label: "Moderate",
    justification: "Operations are largely automated, though certain functions still require leadership direction."
  };

  // Calculate Sell Readiness Score using the formula
  const sellReadinessScore = Math.round(
    0.3 * growthScore.value +
    0.2 * profitabilityScore.value +
    0.2 * marketTimingScore.value +
    0.2 * buyerAppetiteScore.value +
    0.1 * ownerDependenceScore.value
  );

  // Subscores for UI (derived from main scores)
  const subscores = {
    growthSignal: {
      value: growthScore.value,
      label: growthScore.label
    } as SubScore,
    profitQuality: {
      value: profitabilityScore.value,
      label: profitabilityScore.label
    } as SubScore,
    buyerFit: {
      value: buyerAppetiteScore.value,
      label: buyerAppetiteScore.label
    } as SubScore
  };

  const result: Scoring = {
    growthScore,
    profitabilityScore,
    marketTimingScore,
    buyerAppetiteScore,
    ownerDependenceScore,
    subscores,
    sellReadinessScore
  };

  console.log(`[${timestamp}] [CALL2] Factor Scoring Engine - Output:`, JSON.stringify(result, null, 2));

  return result;
}

