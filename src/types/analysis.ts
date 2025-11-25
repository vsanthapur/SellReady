/**
 * Complete type definitions for Sell Readiness Analysis
 * These types match the backend API response structure
 */

export interface BusinessData {
  website: string;
  revenue: string;
  grossProfit: string;
}

export interface SubScores {
  growthSignal: string;
  profitQuality: string;
  buyerFit: string;
  growthScore: number;
  profitScore: number;
  buyerScore: number;
}

export interface Business {
  name: string;
  website: string;
  revenue: string;
  grossProfit: string;
  products: string[];
  segments: string[];
}

export interface Factors {
  growth: string;
  profitability: string;
  marketTiming: string;
  buyerAppetite: string;
  ownerDependence: string;
}

export interface Valuation {
  revenueRange: string;
  profitRange: string;
  note: string;
  valuationInputs?: string[];
  comparableMultiples?: string[];
}

export interface RecommendedAction {
  title: string;
  description: string;
}

/**
 * Website Intelligence Extraction Output (LLM Call 1)
 */
export interface WebsiteExtraction {
  businessName: string;
  industry: string;
  businessModel: string;
  productsAndServices: string[];
  customerSegments: string[];
  marketKeywords: string[];
  recurringRevenueSignals: string[];
  ownerDependenceIndicators: string[];
  rawAnalysisNotes: string;
}

/**
 * Score object with value, label, and justification
 */
export interface Score {
  value: number;
  label: string;
  justification: string;
}

/**
 * Subscores for UI display (derived from main scores)
 */
export interface SubScore {
  value: number;
  label: string;
}

/**
 * Scoring Output (LLM Call 2)
 */
export interface Scoring {
  growthScore: Score;
  profitabilityScore: Score;
  marketTimingScore: Score;
  buyerAppetiteScore: Score;
  ownerDependenceScore: Score;
  subscores: {
    growthSignal: SubScore;
    profitQuality: SubScore;
    buyerFit: SubScore;
  };
  sellReadinessScore: number;
}

/**
 * Valuation ranges and metadata
 */
export interface ValuationRange {
  low: number;
  high: number;
}

/**
 * Valuation Output (Deterministic)
 */
export interface ValuationOutput {
  revenueBased: ValuationRange;
  profitBased: ValuationRange;
  valuationInputs: string[];
  comparableMultiples: string[];
}

/**
 * Report Narrative Output (LLM Call 3)
 */
export interface Report {
  executiveSummary: string;
  strengths: string[];
  risksAndChallenges: string[];
  keyFactorsText: {
    growth: string;
    profitability: string;
    marketTiming: string;
    buyerAppetite: string;
    ownerDependence: string;
  };
  recommendedActions: RecommendedAction[];
}

/**
 * New Backend API response structure (structured LLM chain)
 */
export interface StructuredBackendResponse {
  websiteExtraction: WebsiteExtraction;
  scoring: Scoring;
  valuation: ValuationOutput;
  report: Report;
}

/**
 * Legacy Backend API response structure (for backward compatibility during transition)
 */
export interface BackendResponse {
  score: number;
  readinessLabel: string;
  scoreColor: string;
  subScores: SubScores;
  summaryNote: string;
  business: Business;
  executiveSummary: string;
  strengths: string[];
  risks: string[];
  factors: Factors;
  valuation: Valuation;
  recommendedActions: RecommendedAction[];
}

/**
 * Frontend analysis result structure
 */
export interface AnalysisResult {
  score: number;
  readinessLabel: string;
  scoreColor: string;
  subScores: SubScores;
  summaryNote: string;
  businessName: string;
  website: string;
  revenue: string;
  grossProfit: string;
  products: string[];
  markets: string[];
  executiveSummary: string;
  strengths: string[];
  risks: string[];
  growth: string;
  profitability: string;
  marketTiming: string;
  buyerAppetite: string;
  ownerDependence: string;
  valuation: Valuation;
  recommendedActions: RecommendedAction[];
}
