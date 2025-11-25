import type { VercelRequest, VercelResponse } from "@vercel/node";
import { extractWebsiteIntelligence } from "../../src/server/logic/websiteExtraction.js";
import type { WebsiteExtraction } from "../../src/types/analysis.js";

interface AnalyzeStartRequest {
  website: string;
}

/**
 * Vercel serverless function for Phase 1: Website Intelligence Extraction
 * Called when user submits website URL
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const timestamp = new Date().toISOString();

  try {
    const { website } = req.body as AnalyzeStartRequest;

    console.log(`[${timestamp}] [ANALYZE_START] Request received:`, JSON.stringify({ website }, null, 2));

    // Validate input
    if (!website || typeof website !== "string") {
      console.log(`[${timestamp}] [ANALYZE_START] Validation failed: Invalid input`);
      return res.status(400).json({
        error: "Invalid request. Expected: { website: string }",
      });
    }

    // Step 1: Website Intelligence Extraction (LLM Call 1)
    console.log(`[${timestamp}] [ANALYZE_START] Starting website extraction...`);
    const websiteExtraction = await extractWebsiteIntelligence(website);

    console.log(`[${timestamp}] [ANALYZE_START] Website extraction completed`);

    res.json({ websiteExtraction });
  } catch (error) {
    const errorTimestamp = new Date().toISOString();
    console.error(`[${errorTimestamp}] [ANALYZE_START] Error:`, error);
    res.status(500).json({ error: "Internal server error" });
  }
}

