import type { WebsiteExtraction, ScoringResearchOutput } from "../../types/analysis.js";
import { openai } from "../lib/openaiClient.js";
import { scoringResearchSystemPrompt } from "../prompts/index.js";

export async function runScoringResearch(
  revenue: number,
  grossProfit: number,
  websiteExtraction: WebsiteExtraction
): Promise<ScoringResearchOutput> {
  const timestamp = new Date().toISOString();
  console.log(
    `[${timestamp}] [CALL2] Scoring Research - Input:`,
    JSON.stringify({ revenue, grossProfit, websiteExtraction }, null, 2)
  );

  const userPayload = {
    revenue,
    grossProfit,
    websiteExtraction,
  };

  const completion = await openai.chat.completions.create({
    model: "gpt-5.1",
    temperature: 0.2,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: scoringResearchSystemPrompt },
      { role: "user", content: JSON.stringify(userPayload) },
    ],
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error("Scoring research LLM returned empty response");
  }

  const result = JSON.parse(content) as ScoringResearchOutput;

  console.log(
    `[${timestamp}] [CALL2] Scoring Research - Output:`,
    JSON.stringify(result, null, 2)
  );

  return result;
}
