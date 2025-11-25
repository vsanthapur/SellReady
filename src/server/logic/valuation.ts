import type { ValuationOutput, ValuationRange } from "../../types/analysis";

/**
 * Deterministic Valuation Calculation
 * Computes valuation ranges based on revenue and profit multiples
 * 
 * Revenue-Based Range: revenue * 0.6 → revenue * 0.72
 * Profit-Based Range: grossProfit * 3 → grossProfit * 4.2
 * 
 * @param revenue - Annual revenue
 * @param grossProfit - Gross profit
 * @returns Valuation ranges and metadata
 */
export function calculateValuation(revenue: number, grossProfit: number): ValuationOutput {
  const timestamp = new Date().toISOString();
  console.log(
    `[${timestamp}] [VALUATION] Deterministic Valuation - Input:`,
    JSON.stringify({ revenue, grossProfit }, null, 2)
  );

  // Calculate revenue-based range
  const revenueBased: ValuationRange = {
    low: Math.round(revenue * 0.6),
    high: Math.round(revenue * 0.72)
  };

  // Calculate profit-based range
  const profitBased: ValuationRange = {
    low: Math.round(grossProfit * 3),
    high: Math.round(grossProfit * 4.2)
  };

  const result: ValuationOutput = {
    revenueBased,
    profitBased,
  };

  console.log(`[${timestamp}] [VALUATION] Deterministic Valuation - Output:`, JSON.stringify(result, null, 2));

  return result;
}

