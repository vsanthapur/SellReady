import { Request, Response } from "express";

interface AnalyzeRequest {
  website: string;
  revenue: number;
  grossProfit: number;
}

/**
 * Stub function for future LLM integration
 * TODO: Replace with actual LLM logic for website scraping, SG&A estimation, scoring engine, etc.
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

function getReadinessLabel(score: number): string {
  if (score < 50) {
    return "Low Readiness";
  } else if (score < 70) {
    return "Moderate Readiness";
  } else {
    return "High Readiness";
  }
}

async function generateSellReadiness(
  website: string,
  revenue: number,
  grossProfit: number
) {
  // Hardcoded response for now
  // This will be replaced with LLM logic later
  const score = 78;
  
  return {
    score: score,
    readinessLabel: getReadinessLabel(score),
    scoreColor: getScoreColor(score),
    subScores: {
      growthSignal: "Moderate",
      profitQuality: "Strong",
      buyerFit: "High",
      growthScore: 65,
      profitScore: 85,
      buyerScore: 90
    },
    summaryNote: "Your business shows strong readiness for a sale. With solid fundamentals and market positioning, you're well-positioned for a successful exit.",
    business: {
      name: "Google Inc.",
      website: "google.com",
      revenue: `$${formatNumber(revenue)}`,
      grossProfit: `$${formatNumber(grossProfit)}`,
      products: ["Search engine", "Cloud services", "Software tools"],
      segments: ["SMB", "Enterprise", "Consumer"]
    },
    executiveSummary: "Based on your website and financial inputs, this business appears to be a highly scalable service provider with strong brand awareness and solid operational fundamentals. With stable margins and strong market positioning, the business shows strong readiness for a sale.",
    strengths: [
      "Strong gross margins",
      "High brand trust",
      "Diverse revenue streams",
      "Scalable digital operations"
    ],
    risks: [
      "Very high owner dependence",
      "Complex operational structure",
      "Regulatory uncertainty",
      "High customer acquisition expectations"
    ],
    factors: {
      growth: "Moderate growth with stable customer demand.",
      profitability: "Gross margin indicates healthy unit economics.",
      marketTiming: "Sector experiencing moderate consolidation.",
      buyerAppetite: "Several logical strategic acquirers exist.",
      ownerDependence: "Moderate owner involvement in operations."
    },
    valuation: {
      revenueRange: "$600,000–$720,000",
      profitRange: "$350,000–$420,000",
      note: "Not a formal appraisal — approximate market ranges based on industry comps."
    },
    recommendedActions: [
      {
        title: "Document Standard Operating Procedures",
        description: "Improve scalability and reduce owner dependency."
      },
      {
        title: "Increase Recurring Revenue Percentage",
        description: "Build more predictable revenue streams to enhance valuation."
      },
      {
        title: "Strengthen Customer Acquisition Consistency",
        description: "Improve lead generation and conversion."
      },
      {
        title: "Prepare Financial Documentation",
        description: "Organize 2–3 years of financial statements to streamline buyer due diligence."
      }
    ]
  };
}

function extractBusinessName(url: string): string {
  try {
    // Add protocol if missing
    let urlToParse = url;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      urlToParse = "https://" + url;
    }
    const domain = new URL(urlToParse).hostname.replace("www.", "");
    const name = domain.split(".")[0];
    return name.charAt(0).toUpperCase() + name.slice(1) + " Inc.";
  } catch {
    return "Your Business";
  }
}

function formatNumber(num: number): string {
  return num.toLocaleString("en-US");
}

export async function analyzeHandler(req: Request, res: Response) {
  try {
    const { website, revenue, grossProfit } = req.body as AnalyzeRequest;

    console.log(`[ANALYZE] Request received:`, {
      website,
      revenue,
      grossProfit
    });

    // Validate input
    if (!website || typeof revenue !== "number" || typeof grossProfit !== "number") {
      console.log(`[ANALYZE] Validation failed: Invalid input`);
      return res.status(400).json({
        error: "Invalid request. Expected: { website: string, revenue: number, grossProfit: number }"
      });
    }

    if (grossProfit > revenue) {
      console.log(`[ANALYZE] Validation failed: Gross profit exceeds revenue`);
      return res.status(400).json({
        error: "Gross profit cannot exceed revenue"
      });
    }

    // Generate analysis (hardcoded for now)
    const result = await generateSellReadiness(website, revenue, grossProfit);

    console.log(`[ANALYZE] Response sent:`, {
      businessName: result.businessName,
      score: result.score
    });

    res.json(result);
  } catch (error) {
    console.error("[ANALYZE] Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

