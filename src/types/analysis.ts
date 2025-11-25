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
}

export interface RecommendedAction {
  title: string;
  description: string;
}

/**
 * Backend API response structure
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
