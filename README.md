# SellReady

SellReady is an AI-assisted “sell readiness” analyzer for small businesses.  
Users enter a website, revenue, and gross profit; the backend simulates a 3-step LLM chain to extract business intelligence, research industry dynamics, run deterministic profitability + valuation math, and produce banker-style narratives with actionable recommendations. The frontend renders the complete report (score, factors, valuation ranges, strengths/risks, recommended actions) and supports PDF export.

---

## Architecture Overview

1. **Call 1 – Website Extraction (LLM)**  
   Extracts business metadata from the website and public context.

2. **Call 2 – Research (LLM)**  
   Supplies SG&A bands, industry multiples, profitability descriptors, and preliminary factor scores (growth, timing, buyer appetite, owner dependence).

3. **Deterministic Engines (Node/Express)**  
   - `profitabilityEngine.ts`: derives gross margin, estimated EBITDA margin, and profitability score.  
   - `scoringEngine.ts`: combines the five factors into the final Sell Readiness Score.  
   - `valuation.ts`: applies LLM-provided multiples plus the computed EBITDA margin to produce revenue- and EBITDA-based valuation ranges.

4. **Call 3 – Narrative Generation (LLM)**  
   Uses all structured outputs to write the executive summary, strengths/risks, key factor blurbs, and recommended actions.

5. **Frontend (Vite + React + shadcn-ui)**  
   Displays the full report, handles the two-step user flow, and offers a “Download Report” PDF export.

---

## Tech Stack

- **Frontend:** Vite, React, TypeScript, Tailwind CSS, shadcn-ui  
- **Backend:** Express-style logic running as Node server/serverless functions  
- **LLM Provider:** OpenAI Chat Completions API (GPT-5.1)  
- **PDF Export:** `html2canvas` + `jspdf`

---

## Prerequisites

- Node.js 18+ (use [`nvm`](https://github.com/nvm-sh/nvm#installing-and-updating) if you don’t have it).  
- An OpenAI API key with access to GPT‑5.1 or whichever model you configure.

---

## Installation

```sh
# Clone the repo
git clone https://github.com/<your-org>/sellready.git
cd sellready

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file (see `.env.example`) with:

```
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_API_URL=http://localhost:3001
```

`OPENAI_API_KEY` is required for the backend; `VITE_API_URL` tells the frontend where to reach the API.

---

## Local Development

Frontend and backend run separately:

```sh
# Terminal 1 – API (Express server on http://localhost:3001)
npm run server

# Terminal 2 – Vite dev server (http://localhost:5173)
npm run dev
```

The Step 1 flow calls `POST /api/analyze/start`; after revenue/gross profit are entered, Step 2 calls `POST /api/analyze`. The UI expects the backend to be reachable at the URL specified in `VITE_API_URL`.

---

## Building for Production

```sh
npm run build       # Produces the Vite static build in dist/
npm run preview     # Optional: preview the static build locally
```

For deployment:
- Host the frontend (contents of `dist/`) on any static host (Vercel, Netlify, S3 + CloudFront, etc.).  
- Deploy the Express API as serverless functions (Vercel, AWS Lambda, etc.) or a Node server; just export the endpoints defined in `src/server/routes/`.  
- Set `OPENAI_API_KEY` and `VITE_API_URL` (pointing to your deployed API).

---

## Project Structure Highlights

```
/src
  /server
    /logic            # Call 1–3 orchestration, deterministic engines
    /prompts          # System prompts for each LLM call
    /routes           # Express handlers (analyze/start + analyze)
  /components         # React UI
  /services           # Frontend fetch logic
  /types              # Shared TypeScript interfaces
```

- `src/server/prompts/*.ts` contain the exact system prompts for each LLM call.  
- `src/server/logic/*.ts` encapsulate the sequential steps (website extraction, research, profitability/valuation, narrative).  
- `src/components/sell-readiness/Step3Analysis.tsx` is the main report page, while `src/components/sell-readiness/report/*` holds the report sections.

---

## PDF Export

Clicking “Download Report” in Step 3 captures the entire report container via `html2canvas`, stitches it into a multi-page PDF with `jspdf`, and saves it locally. This works client-side; no backend required.

---

## Questions / Next Steps

- Configure rate limits or caching if you expect heavy LLM usage.  
- Swap in your preferred LLM provider by replacing the OpenAI client in `src/server/lib/openaiClient.ts`.  
- For production, consider running the API as serverless functions to take advantage of automatic scaling.

Happy shipping!
