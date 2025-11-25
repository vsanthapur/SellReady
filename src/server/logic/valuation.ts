import type {
  ValuationOutput,
  ValuationRange,
  ScoringResearchOutput,
  ProfitabilityMetrics,
} from "../../types/analysis.js";

function parseMultipleRange(range: string, fallbackLow: number, fallbackHigh: number): ValuationRange {
  if (!range) {
    return { low: fallbackLow, high: fallbackHigh };
  }

  const cleaned = range.replace(/x/gi, "").trim();
  const [lowStr, highStr] = cleaned.split(/[\u2013\u2014-]/).map((value) => parseFloat(value.trim()));

  const low = Number.isFinite(lowStr) ? lowStr : fallbackLow;
  const high = Number.isFinite(highStr) ? highStr : low;

  return {
    low: low || fallbackLow,
    high: high || fallbackHigh,
  };
}

export function calculateValuation(
  revenue: number,
  profitability: ProfitabilityMetrics,
  industryMultiples: ScoringResearchOutput["industryMultiples"]
): ValuationOutput {
  const timestamp = new Date().toISOString();
  console.log(
    `[${timestamp}] [VALUATION] Deterministic Valuation - Input:`,
    JSON.stringify({ revenue, profitability, industryMultiples }, null, 2)
  );

  const revenueMultiples = parseMultipleRange(industryMultiples.revenueMultipleRange, 0.6, 0.72);
  const ebitdaMultiples = parseMultipleRange(industryMultiples.ebitdaMultipleRange, 3, 4.2);

  const revenueBased: ValuationRange = {
    low: Math.round(revenue * revenueMultiples.low),
    high: Math.round(revenue * revenueMultiples.high),
  };

  const estimatedEbitda = revenue * profitability.ebitdaMargin;
  const profitBased: ValuationRange = {
    low: Math.round(estimatedEbitda * ebitdaMultiples.low),
    high: Math.round(estimatedEbitda * ebitdaMultiples.high),
  };

  const result: ValuationOutput = {
    revenueBased,
    profitBased,
  };

  console.log(`[${timestamp}] [VALUATION] Deterministic Valuation - Output:`, JSON.stringify(result, null, 2));

  return result;
}

