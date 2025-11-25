export interface ProfitabilityMetrics {
  grossMargin: number;
  ebitdaMargin: number;
  profitabilityScore: number;
}

/**
 * Backend profitability engine.
 * Computes gross margin, EBITDA margin, and mapped profitability score.
 */
export function computeProfitabilityScore(
  revenue: number,
  grossProfit: number,
  sgnaMidPercent: number
): ProfitabilityMetrics {
  const grossMargin = revenue > 0 ? grossProfit / revenue : 0;
  const impliedSGA = sgnaMidPercent / 100;
  let ebitdaMargin = grossMargin - impliedSGA;

  // Clamp EBITDA margin between -20% and 60%
  ebitdaMargin = Math.max(-0.2, Math.min(0.6, ebitdaMargin));

  let profitabilityScore = 0;
  if (ebitdaMargin > 0.3) profitabilityScore = 90;
  else if (ebitdaMargin > 0.2) profitabilityScore = 80;
  else if (ebitdaMargin > 0.1) profitabilityScore = 60;
  else if (ebitdaMargin > 0) profitabilityScore = 40;
  else profitabilityScore = 20;

  return {
    grossMargin,
    ebitdaMargin,
    profitabilityScore,
  };
}
