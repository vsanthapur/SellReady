# SellReady

SellReady is an AI-assisted "sell readiness" analyzer for small businesses.  
Users enter a website, revenue, and gross profit; the backend simulates a 3-step LLM chain to extract business intelligence, research industry dynamics, run deterministic profitability + valuation math, and produce banker-style narratives with actionable recommendations. The frontend renders the complete report (score, factors, valuation ranges, strengths/risks, recommended actions) and supports PDF export.

---

## High-Level Overview

This architecture uses **three LLM calls** and **two deterministic engines**, ensuring that LLMs focus on research and narrative rather than math. While newer models can handle calculations, the deterministic approach prevents hallucination and ensures consistent, verifiable results.

The tool is designed to be lightweight and accessible—users only need to provide **Annual Revenue** and **Gross Profit**. The system then deterministically estimates missing operational metrics (like EBITDA and SG&A effects) using industry norms researched by the LLM.

The system flow:

```
Step 1 → User enters a website
   ↓
CALL 1: Website Extraction LLM
   ↓
Step 2 → User enters revenue + gross profit
   ↓
CALL 2: Research LLM
   ↓
Backend deterministic profitability + valuation calculations
   ↓
CALL 3: Narrative Generation LLM
   ↓
Frontend displays the full Sell Readiness Report
```

All three system prompts are stored in `src/server/prompts/` and are used by the backend during each LLM call.

---

## Sell Readiness Score Formula

The Final Sell Readiness Score is computed **deterministically**:

```
Sell Readiness Score =
0.3 * GrowthScore
+ 0.2 * ProfitabilityScore
+ 0.2 * MarketTimingScore
+ 0.2 * BuyerAppetiteScore
+ 0.1 * OwnerDependenceScore
```

Each component is a 0–100 integer.

### Score Components

- **GrowthScore** (LLM determines): How fast the industry is growing + how scalable the business is. LLM judges based on industry trends, demand, and model scalability.

- **ProfitabilityScore** (Calculated): Based on gross margin and estimated EBITDA margin (using LLM-researched SG&A band). The LLM does **not** choose the score—it's computed deterministically.

- **MarketTimingScore** (LLM determines): How favorable the current M&A environment is for this type of business.

- **BuyerAppetiteScore** (LLM determines): How active and interested buyers are (local, strategic, PE, roll-ups, etc.).

- **OwnerDependenceScore** (LLM determines): How much the business relies on the owner's skill, relationships, and branding.

### Score Tiers

- **0–49 → Low Readiness**: Business needs improvement before going to market (high owner dependence, limited scalability, weaker buyer interest).

- **50–69 → Moderate Readiness**: Business is sellable at fair market value; some improvements could meaningfully raise valuation.

- **70–100 → High Readiness**: Business is attractive to buyers, has strong fundamentals, and can command higher multiples.

---

## Architecture Overview

### Call 1 – Website Extraction (LLM)

Fast, lightweight, purely structural business profiling. Extracts:
- Business name, industry, business model
- Products/services, customer segments
- Market keywords, recurring revenue signals
- Owner dependence indicators

**Input**: Website URL  
**Output**: Structured JSON with business metadata

This supports the UI Step 2 and informs Call 2 research.

### Call 2 – Research LLM

This call performs research, NOT calculations. It produces:
- SG&A industry bands (low, mid, high percentages)
- Industry EBITDA & revenue multiples
- Profitability context and descriptors
- Growth score (0–100)
- Market timing score (0–100)
- Buyer appetite score (0–100)
- Owner dependence score (0–100)

**Input**: Revenue, gross profit, website extraction output  
**Output**: Structured JSON with industry intelligence and factor scores

### Deterministic Profitability Engine

This is backend logic (not LLM). Calculates profitability metrics from user inputs and LLM-researched SG&A bands.

**Inputs**:
- Revenue
- Gross Profit
- SG&A band (from Call 2)

**Calculations**:

```
Gross Margin = GrossProfit / Revenue

Estimated EBITDA Margin = Gross Margin − (SG&A Midpoint / 100)

EBITDA Margin is clamped between:
  -20% (min)
  +60% (max)
```

**Profitability Score Bands**:
- > 30% → 90
- > 20% → 80
- > 10% → 60
- > 0% → 40
- ≤ 0% → 20

**Example**:
- Revenue = 300,000
- Gross Profit = 123,000
- Gross Margin = 41%
- SG&A midpoint = 22%
- Estimated EBITDA Margin = 41% − 22% = **19%**
- Profitability Score = **60** (falls between 10% and 20%)

### Deterministic Scoring Engine

Combines LLM scores + computed profitability into final score:

```
FinalScore = 0.3*GrowthScore + 0.2*ProfitabilityScore + 0.2*MarketTimingScore + 0.2*BuyerAppetiteScore + 0.1*OwnerDependenceScore
```

**Example**:
```
FinalScore = 0.3*45 + 0.2*60 + 0.2*50 + 0.2*55 + 0.1*25
           = 49
```

### Deterministic Valuation Engine

Uses industry multiples (from Call 2) and estimated EBITDA margin (from profitability engine).

**Revenue-Based Valuation**:
```
Low Range = Revenue × Revenue Multiple Low
High Range = Revenue × Revenue Multiple High
```

**EBITDA-Based Valuation**:
```
EBITDA = Revenue × Estimated EBITDA Margin
Low Range = EBITDA × EBITDA Multiple Low
High Range = EBITDA × EBITDA Multiple High
```

**Example** (using 0.3x–0.7x revenue multiples, 2x–4x EBITDA multiples):
- Revenue = 300,000
- Revenue-based: $90,000–$210,000
- EBITDA = 300,000 × 19% = 57,000
- EBITDA-based: $114,000–$228,000

### Call 3 – Narrative Generation (LLM)

Uses all structured outputs to generate banker-style narrative:
- Executive summary
- Strengths and risks
- Key factor explanations
- Recommended actions

**Input**: Website extraction, research output, scores, valuation  
**Output**: Structured narrative JSON

### Frontend (Vite + React + shadcn-ui)

Displays the full report, handles the two-step user flow, and offers a "Download Report" PDF export.

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