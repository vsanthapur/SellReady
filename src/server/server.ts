import express from "express";
import cors from "cors";
import { analyzeHandler } from "./routes/analyze";
import { analyzeStartHandler } from "./routes/analyzeStart";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware (after json parsing so we can log body)
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`\n[${timestamp}] ${req.method} ${req.path}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log(`[${timestamp}] Request body:`, JSON.stringify(req.body, null, 2));
  }
  next();
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// API routes
app.post("/api/analyze/start", analyzeStartHandler);
app.post("/api/analyze", analyzeHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

