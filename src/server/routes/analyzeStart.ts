import { Request, Response } from "express";
import { extractWebsiteIntelligence } from "../logic/websiteExtraction";
import type { WebsiteExtraction } from "../../types/analysis";

interface AnalyzeStartRequest {
  website: string;
}

/**
 * Phase 1: Website Intelligence Extraction
 * Called when user submits website URL
 */
export async function analyzeStartHandler(req: Request, res: Response) {
  const timestamp = new Date().toISOString();
  
  try {
    const { website } = req.body as AnalyzeStartRequest;

    console.log(`[${timestamp}] [ANALYZE_START] Request received:`, JSON.stringify({
      website
    }, null, 2));

    // Validate input
    if (!website || typeof website !== "string") {
      console.log(`[${timestamp}] [ANALYZE_START] Validation failed: Invalid input`);
      return res.status(400).json({
        error: "Invalid request. Expected: { website: string }"
      });
    }

    // Step 1: Website Intelligence Extraction (LLM Call 1)
    console.log(`[${timestamp}] [ANALYZE_START] Starting website extraction...`);
    const websiteExtraction = extractWebsiteIntelligence(website);

    console.log(`[${timestamp}] [ANALYZE_START] Website extraction completed`);

    res.json({ websiteExtraction });
  } catch (error) {
    const errorTimestamp = new Date().toISOString();
    console.error(`[${errorTimestamp}] [ANALYZE_START] Error:`, error);
    res.status(500).json({ error: "Internal server error" });
  }
}

