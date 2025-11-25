import { Request, Response } from "express";
import { extractWebsiteIntelligence } from "../logic/websiteExtraction";
import { runScoringResearch } from "../logic/scoring";
import { computeProfitabilityScore } from "../logic/profitabilityEngine";
import { buildFinalScores } from "../logic/scoringEngine";
import { calculateValuation } from "../logic/valuation";
import { generateReportNarrative } from "../logic/reportNarrative";
import type {
  StructuredBackendResponse,
  WebsiteExtraction,
  ScoringResearchOutput,
} from "../../types/analysis";

interface AnalyzeRequest {
  website: string;
  revenue: number;
  grossProfit: number;
  websiteExtraction?: WebsiteExtraction; // Optional: if provided, skip Call 1
}

export async function analyzeHandler(req: Request, res: Response) {
  const startTime = Date.now();
  const timestamp = new Date().toISOString();
  
  try {
    const { website, revenue, grossProfit } = req.body as AnalyzeRequest;

    console.log(`[${timestamp}] [ANALYZE] Request received:`, JSON.stringify({
      website,
      revenue,
      grossProfit
    }, null, 2));

    // Validate input
    if (!website || typeof revenue !== "number" || typeof grossProfit !== "number") {
      console.log(`[${timestamp}] [ANALYZE] Validation failed: Invalid input`);
      return res.status(400).json({
        error: "Invalid request. Expected: { website: string, revenue: number, grossProfit: number }"
      });
    }

    if (grossProfit > revenue) {
      console.log(`[${timestamp}] [ANALYZE] Validation failed: Gross profit exceeds revenue`);
      return res.status(400).json({
        error: "Gross profit cannot exceed revenue"
      });
    }

    // Step 1: Website Intelligence Extraction (LLM Call 1)
    // If websiteExtraction is provided, skip this step (already done in Phase 1)
    let websiteExtraction: WebsiteExtraction;
    if (req.body.websiteExtraction) {
      console.log(`[${timestamp}] [ANALYZE] Using provided website extraction (skipping Call 1)`);
      websiteExtraction = req.body.websiteExtraction;
    } else {
      console.log(`[${timestamp}] [ANALYZE] Starting LLM chain...`);
      websiteExtraction = extractWebsiteIntelligence(website);
    }

    // Step 2: LLM research (Call 2)
    const research: ScoringResearchOutput = runScoringResearch(revenue, grossProfit, websiteExtraction);

    // Backend profitability math
    const profitability = computeProfitabilityScore(revenue, grossProfit, research.sgnaBand.mid);
    console.log(
      `[${timestamp}] [PROFITABILITY] Metrics:`,
      JSON.stringify(profitability, null, 2)
    );

    const profitabilityJustification = `${research.profitabilityInsights.industryProfitabilityNotes} (${research.profitabilityInsights.descriptors.join(
      ", "
    )})`;

    // Final scoring engine
    const scores = buildFinalScores(research, profitability, profitabilityJustification);
    console.log(`[${timestamp}] [SCORING_ENGINE] Scores:`, JSON.stringify(scores, null, 2));

    // Deterministic valuation
    const valuation = calculateValuation(revenue, grossProfit);

    // Narrative generation (Call 3)
    const report = generateReportNarrative({
      websiteExtraction,
      research,
      scores,
      valuation,
    });

    const result: StructuredBackendResponse = {
      websiteExtraction,
      research,
      scores,
      valuation,
      report,
    };

    const duration = Date.now() - startTime;
    console.log(
      `[${timestamp}] [ANALYZE] Response sent (duration: ${duration}ms):`,
      JSON.stringify(
        {
          finalScore: scores.finalScore,
          businessName: websiteExtraction.businessName,
        },
        null,
        2
      )
    );

    res.json(result);
  } catch (error) {
    const errorTimestamp = new Date().toISOString();
    console.error(`[${errorTimestamp}] [ANALYZE] Error:`, error);
    res.status(500).json({ error: "Internal server error" });
  }
}
