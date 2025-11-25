// Hardcoded sample data for Sell Readiness Analyzer
// This will be replaced with actual API calls later

export const SAMPLE_ANALYSIS_DATA = {
  score: 78,
  businessName: "Sample Business Inc.",
  website: "https://example.com",
  revenue: "$500,000",
  grossProfit: "$175,000",
  products: ["Service A", "Service B", "Product C"],
  markets: ["SMB", "Enterprise", "Consumer"],
  industry: "Personal services",
  businessModel: "Retail / SMB",
  locationType: "Local / regional",
  growth: "Moderate growth with stable customer demand.",
  profitability: "Gross margin indicates healthy unit economics.",
  marketTiming: "Sector experiencing moderate consolidation.",
  buyerAppetite: "Several logical strategic acquirers exist.",
  ownerDependence: "Moderate owner involvement in operations.",
  recommendedActions: [
    "Document standard operating procedures.",
    "Improve recurring revenue percentage.",
    "Enhance customer acquisition consistency."
  ]
};

export const STEP_LABELS = [
  { number: 1, label: "Enter your business website" },
  { number: 2, label: "Confirm business details" },
  { number: 3, label: "See your sell readiness score" }
];

export const HOW_IT_WORKS_STEPS = [
  {
    number: "01",
    title: "UNDERSTAND YOUR BUSINESS",
    description: "Our AI will review your company website to better understand your business."
  },
  {
    number: "02",
    title: "ANALYZE YOUR FINANCIALS",
    description: "We'll analyze your revenue and profitability to assess business health."
  },
  {
    number: "03",
    title: "ESTIMATE SELL READINESS",
    description: "Our AI will evaluate market conditions and buyer appetite to score readiness."
  },
  {
    number: "04",
    title: "GENERATE CUSTOM REPORT",
    description: "You receive a customized report for your business. No e-mail necessary."
  }
];
