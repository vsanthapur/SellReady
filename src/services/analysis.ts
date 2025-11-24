import { SAMPLE_ANALYSIS_DATA } from "@/lib/constants";

export interface BusinessData {
  website: string;
  revenue: string;
  grossProfit: string;
}

export interface AnalysisResult {
  score: number;
  businessName: string;
  website: string;
  revenue: string;
  grossProfit: string;
  products: string[];
  markets: string[];
  growth: string;
  profitability: string;
  marketTiming: string;
  buyerAppetite: string;
  ownerDependence: string;
  recommendedActions: string[];
}

/**
 * Placeholder function to fetch sell readiness analysis
 * Currently returns hardcoded data
 * TODO: Replace with actual API call to backend LLM service
 */
export async function fetchSellReadiness(
  businessData: BusinessData
): Promise<AnalysisResult> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Return hardcoded data for now
  return {
    ...SAMPLE_ANALYSIS_DATA,
    website: businessData.website,
    revenue: businessData.revenue,
    grossProfit: businessData.grossProfit,
    businessName: extractBusinessName(businessData.website)
  };
}

function extractBusinessName(url: string): string {
  try {
    const domain = new URL(url).hostname.replace("www.", "");
    const name = domain.split(".")[0];
    return name.charAt(0).toUpperCase() + name.slice(1) + " Inc.";
  } catch {
    return "Your Business";
  }
}
