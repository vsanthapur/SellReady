import type {
  WebsiteExtraction,
  ScoringResearchOutput,
  FinalScoresOutput,
  ValuationOutput,
  Report,
} from "../../types/analysis.js";
import { openai } from "../lib/openaiClient.js";
import { reportNarrativeSystemPrompt } from "../prompts/index.js";

interface NarrativeInput {
  websiteExtraction: WebsiteExtraction;
  research: ScoringResearchOutput;
  scores: FinalScoresOutput;
  valuation: ValuationOutput;
}

export async function generateReportNarrative({
  websiteExtraction,
  research,
  scores,
  valuation,
}: NarrativeInput): Promise<Report> {
  const timestamp = new Date().toISOString();
  console.log(
    `[${timestamp}] [CALL3] Report Narrative Generator - Input:`,
    JSON.stringify({ websiteExtraction, research, scores, valuation }, null, 2)
  );

  const userPayload = {
    websiteExtraction,
    research,
    scores,
    valuation,
  };

  const completion = await openai.chat.completions.create({
    model: "gpt-5.1",
    temperature: 0.2,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: reportNarrativeSystemPrompt },
      { role: "user", content: JSON.stringify(userPayload) },
    ],
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error("Report narrative LLM returned empty response");
  }

  const result = JSON.parse(content) as Report;

  console.log(
    `[${timestamp}] [CALL3] Report Narrative Generator - Output:`,
    JSON.stringify(result, null, 2)
  );

  return result;
}

