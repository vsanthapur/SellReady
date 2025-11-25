import type { AnalysisResult, StructuredBackendResponse, Valuation, WebsiteExtraction } from "@/types/analysis";

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
 * Fetches website intelligence extraction (Phase 1)
 * Called when user submits website URL
 */
export async function fetchWebsiteExtraction(website: string): Promise<WebsiteExtraction> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/analyze/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ website }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Unknown error" }));
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.websiteExtraction;
  } catch (error) {
    console.error("Error fetching website extraction:", error);
    throw error;
  }
}

/**
 * Helper function to get score color based on score value
 */
function getScoreColor(score: number): string {
  if (score < 50) {
    return "#ef4444"; // red
  } else if (score < 70) {
    return "#f59e0b"; // yellow/amber
  } else {
    return "#22c55e"; // green
  }
}

/**
 * Helper function to get readiness label based on score value
 */
function getReadinessLabel(score: number): string {
  if (score < 50) {
    return "Low Readiness";
  } else if (score < 70) {
    return "Moderate Readiness";
  } else {
    return "High Readiness";
  }
}

/**
 * Format number with commas and dollar sign
 */
function formatNumber(num: number): string {
  return `$${num.toLocaleString("en-US")}`;
}

/**
 * Format valuation range
 */
function formatValuationRange(low: number, high: number): string {
  return `${formatNumber(low)}–${formatNumber(high)}`;
}

/**
 * Fetches sell readiness analysis from backend API (Phase 2)
 * Transforms the new structured backend response to the existing frontend format
 * 
 * @param businessData - Revenue and profit data
 * @param websiteExtraction - Optional website extraction from Phase 1 (if provided, skips Call 1)
 */
export async function fetchSellReadiness(
  businessData: BusinessData,
  websiteExtraction?: WebsiteExtraction
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
        ...(websiteExtraction && { websiteExtraction }), // Include if provided
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Unknown error" }));
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    const data: StructuredBackendResponse = await response.json();

    // Extract sell readiness score
    const score = data.scoring.sellReadinessScore;

    // Transform valuation to legacy format
    const valuation: Valuation = {
      revenueRange: formatValuationRange(
        data.valuation.revenueBased.low,
        data.valuation.revenueBased.high
      ),
      profitRange: formatValuationRange(
        data.valuation.profitBased.low,
        data.valuation.profitBased.high
      ),
      note: "Not a formal appraisal — approximate market ranges based on industry comps.",
      valuationInputs: data.valuation.valuationInputs,
      comparableMultiples: data.valuation.comparableMultiples
    };

    // Transform backend response to match frontend interface
    return {
      score: score,
      readinessLabel: getReadinessLabel(score),
      scoreColor: getScoreColor(score),
      subScores: {
        growthSignal: data.scoring.subscores.growthSignal.label,
        profitQuality: data.scoring.subscores.profitQuality.label,
        buyerFit: data.scoring.subscores.buyerFit.label,
        growthScore: data.scoring.subscores.growthSignal.value,
        profitScore: data.scoring.subscores.profitQuality.value,
        buyerScore: data.scoring.subscores.buyerFit.value,
      },
      summaryNote: "Your business shows strong readiness for a sale. With solid fundamentals and market positioning, you're well-positioned for a successful exit.",
      businessName: data.websiteExtraction.businessName,
      website: businessData.website,
      revenue: formatNumber(revenueNum),
      grossProfit: formatNumber(grossProfitNum),
      products: data.websiteExtraction.productsAndServices,
      markets: data.websiteExtraction.customerSegments,
      executiveSummary: data.report.executiveSummary,
      strengths: data.report.strengths,
      risks: data.report.risksAndChallenges,
      growth: data.report.keyFactorsText.growth,
      profitability: data.report.keyFactorsText.profitability,
      marketTiming: data.report.keyFactorsText.marketTiming,
      buyerAppetite: data.report.keyFactorsText.buyerAppetite,
      ownerDependence: data.report.keyFactorsText.ownerDependence,
      valuation: valuation,
      recommendedActions: data.report.recommendedActions,
    };
  } catch (error) {
    console.error("Error fetching sell readiness analysis:", error);
    throw error;
  }
}
