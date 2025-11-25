import type {
  ScoringResearchOutput,
  FinalScoresOutput,
  FactorScore,
  ProfitabilityScore,
} from "../../types/analysis.js";
import type { ProfitabilityMetrics } from "./profitabilityEngine.js";

const WEIGHTS = {
  growth: 0.3,
  profitability: 0.2,
  marketTiming: 0.2,
  buyerAppetite: 0.2,
  ownerDependence: 0.1,
} as const;

export function buildFinalScores(
  research: ScoringResearchOutput,
  profitability: ProfitabilityMetrics,
  profitabilityJustification: string
): FinalScoresOutput {
  const growth: FactorScore = {
    value: research.growthScore.value,
    justification: research.growthScore.justification,
  };

  const profitabilityScore: ProfitabilityScore = {
    value: profitability.profitabilityScore,
    justification: profitabilityJustification,
    grossMargin: profitability.grossMargin,
    ebitdaMargin: profitability.ebitdaMargin,
  };

  const marketTiming: FactorScore = {
    value: research.marketTimingScore.value,
    justification: research.marketTimingScore.justification,
  };

  const buyerAppetite: FactorScore = {
    value: research.buyerAppetiteScore.value,
    justification: research.buyerAppetiteScore.justification,
  };

  const ownerDependence: FactorScore = {
    value: research.ownerDependenceScore.value,
    justification: research.ownerDependenceScore.justification,
  };

  const finalScore = Math.round(
    growth.value * WEIGHTS.growth +
      profitabilityScore.value * WEIGHTS.profitability +
      marketTiming.value * WEIGHTS.marketTiming +
      buyerAppetite.value * WEIGHTS.buyerAppetite +
      ownerDependence.value * WEIGHTS.ownerDependence
  );

  return {
    growth,
    profitability: profitabilityScore,
    marketTiming,
    buyerAppetite,
    ownerDependence,
    finalScore,
  };
}
