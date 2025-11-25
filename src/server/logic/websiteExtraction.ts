import type { WebsiteExtraction } from "../../types/analysis.js";
import { openai } from "../lib/openaiClient.js";
import { websiteExtractionSystemPrompt } from "../prompts/index.js";

export async function extractWebsiteIntelligence(website: string): Promise<WebsiteExtraction> {
  const timestamp = new Date().toISOString();
  console.log(
    `[${timestamp}] [CALL1] Website Intelligence Extraction - Input:`,
    JSON.stringify({ website }, null, 2)
  );

  const userPayload = {
    website,
  };

  const completion = await openai.chat.completions.create({
    model: "gpt-5.1",
    temperature: 0.2,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: websiteExtractionSystemPrompt },
      { role: "user", content: JSON.stringify(userPayload) },
    ],
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error("Website extraction LLM returned empty response");
  }

  const result = JSON.parse(content) as WebsiteExtraction;

  console.log(
    `[${timestamp}] [CALL1] Website Intelligence Extraction - Output:`,
    JSON.stringify(result, null, 2)
  );

  return result;
}

