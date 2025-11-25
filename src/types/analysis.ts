/**
 * Shared types between backend and frontend for the Sell Readiness flow.
 */

export interface BusinessData {
  website: string;
  revenue: string;
  grossProfit: string;
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
 * Call 2 Research Output
 */
export interface ScoringResearchOutput {
  sgnaBand: {
    low: number;
    mid: number;
    high: number;
    justification: string;
  };
  industryMultiples: {
    revenueMultipleRange: string;
    ebitdaMultipleRange: string;
    justification: string;
  };
  profitabilityInsights: {
    descriptors: string[];
    industryProfitabilityNotes: string;
  };
  growthScore: {
    value: number;
    justification: string;
  };
  marketTimingScore: {
    value: number;
    justification: string;
  };
  buyerAppetiteScore: {
    value: number;
    justification: string;
  };
  ownerDependenceScore: {
    value: number;
    justification: string;
  };
}

export interface ProfitabilityMetrics {
  grossMargin: number;
  ebitdaMargin: number;
  profitabilityScore: number;
}

export interface FactorScore {
  value: number;
  justification: string;
}

export interface ProfitabilityScore extends FactorScore {
  grossMargin: number;
  ebitdaMargin: number;
}

export interface FinalScoresOutput {
  growth: FactorScore;
  profitability: ProfitabilityScore;
  marketTiming: FactorScore;
  buyerAppetite: FactorScore;
  ownerDependence: FactorScore;
  finalScore: number;
}

export interface ValuationRange {
  low: number;
  high: number;
}

export interface ValuationOutput {
  revenueBased: ValuationRange;
  profitBased: ValuationRange;
}

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

export interface CompetitivePositioning {
  landscape?: string;
  differentiators?: string[];
  risks?: string[];
}

export interface StructuredBackendResponse {
  websiteExtraction: WebsiteExtraction;
  research: ScoringResearchOutput;
  scores: FinalScoresOutput;
  valuation: ValuationOutput;
  report: Report;
}

/**
 * Frontend analysis result structure (transformed for UI)
 */
export interface AnalysisResult {
  score: number;
  readinessLabel: string;
  scoreColor: string;
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
  scores: FinalScoresOutput;
  industryMultiples: ScoringResearchOutput["industryMultiples"];
  profitabilityInsights: ScoringResearchOutput["profitabilityInsights"];
  sgnaBand: ScoringResearchOutput["sgnaBand"];
  valuation: {
    revenueRange: string;
    profitRange: string;
    note: string;
  };
  recommendedActions: RecommendedAction[];
}
