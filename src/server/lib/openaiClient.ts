import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  console.warn("[OpenAI] OPENAI_API_KEY is not set. LLM calls will fail until it is provided.");
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
