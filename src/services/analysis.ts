import type { AnalysisResult, BackendResponse } from "@/types/analysis";

export interface BusinessData {
  website: string;
  revenue: string;
  grossProfit: string;
}

// Re-export types from centralized location
export type { AnalysisResult };

import { parseFormattedNumber } from "@/lib/formatters";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

/**
 * Fetches sell readiness analysis from backend API
 */
export async function fetchSellReadiness(
  businessData: BusinessData
): Promise<AnalysisResult> {
  try {
    // Parse revenue and grossProfit from formatted strings (handles $ and commas)
    const revenueNum = parseFormattedNumber(businessData.revenue);
    const grossProfitNum = parseFormattedNumber(businessData.grossProfit);

    // Validate parsed numbers
    if (isNaN(revenueNum) || isNaN(grossProfitNum) || revenueNum < 0 || grossProfitNum < 0) {
      throw new Error("Invalid revenue or gross profit values");
    }

    const response = await fetch(`${API_BASE_URL}/api/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        website: businessData.website,
        revenue: revenueNum,
        grossProfit: grossProfitNum,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Unknown error" }));
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    const data: BackendResponse = await response.json();

    // Transform backend response to match frontend interface
    return {
      score: data.score,
      readinessLabel: data.readinessLabel,
      scoreColor: data.scoreColor,
      subScores: data.subScores,
      summaryNote: data.summaryNote,
      businessName: data.business.name,
      website: data.business.website,
      revenue: data.business.revenue,
      grossProfit: data.business.grossProfit,
      products: data.business.products,
      markets: data.business.segments,
      executiveSummary: data.executiveSummary,
      strengths: data.strengths,
      risks: data.risks,
      growth: data.factors.growth,
      profitability: data.factors.profitability,
      marketTiming: data.factors.marketTiming,
      buyerAppetite: data.factors.buyerAppetite,
      ownerDependence: data.factors.ownerDependence,
      valuation: data.valuation,
      recommendedActions: data.recommendedActions,
    };
  } catch (error) {
    console.error("Error fetching sell readiness analysis:", error);
    throw error;
  }
}
