import { Request, Response } from "express";
import { extractWebsiteIntelligence } from "../logic/websiteExtraction";
import { calculateScoring } from "../logic/scoring";
import { calculateValuation } from "../logic/valuation";
import { generateReportNarrative } from "../logic/reportNarrative";
import type { StructuredBackendResponse, WebsiteExtraction } from "../../types/analysis";

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

    // Step 2: Factor Scoring Engine (LLM Call 2)
    const scoring = calculateScoring(revenue, grossProfit, websiteExtraction);

    // Step 3: Deterministic Valuation (no LLM)
    const valuation = calculateValuation(revenue, grossProfit);

    // Step 4: Report Narrative Generator (LLM Call 3)
    const report = generateReportNarrative(websiteExtraction, scoring, valuation);

    // Construct structured response
    const result: StructuredBackendResponse = {
      websiteExtraction,
      scoring,
      valuation,
      report
    };

    const duration = Date.now() - startTime;
    console.log(`[${timestamp}] [ANALYZE] Response sent (duration: ${duration}ms):`, JSON.stringify({
      sellReadinessScore: scoring.sellReadinessScore,
      businessName: websiteExtraction.businessName
    }, null, 2));

    res.json(result);
  } catch (error) {
    const errorTimestamp = new Date().toISOString();
    console.error(`[${errorTimestamp}] [ANALYZE] Error:`, error);
    res.status(500).json({ error: "Internal server error" });
  }
}
