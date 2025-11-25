import { Badge } from "@/components/ui/badge";
import { AnalysisResult } from "@/types/analysis";
import {
  TrendingUp,
  DollarSign,
  Users,
  Clock3,
  UserCog,
} from "lucide-react";

interface ScoreSectionProps {
  analysis: AnalysisResult;
}

/**
 * Semicircle gauge visualization component
 */
function ScoreGauge({ score, color }: { score: number; color: string }) {
  const percentage = score;
  const circumference = Math.PI * 100; // radius = 100
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-48 h-24 flex items-end justify-center">
      <svg
        className="transform -rotate-90"
        width="200"
        height="100"
        viewBox="0 0 200 100"
      >
        {/* Background arc */}
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference / 2}
          className="opacity-30"
        />
        {/* Score arc */}
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset + circumference / 2}
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2">
        <div className="text-4xl font-bold" style={{ color }}>
          {score}
        </div>
        <div className="text-sm text-muted-foreground">/ 100</div>
      </div>
    </div>
  );
}

function ProgressBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{
          width: `${value}%`,
          backgroundColor: color,
        }}
      />
    </div>
  );
}

export function ScoreSection({ analysis }: ScoreSectionProps) {
  const factors = [
    {
      label: "Growth",
      icon: TrendingUp,
      score: analysis.scores.growth.value,
      description: analysis.scores.growth.justification,
    },
    {
      label: "Profitability",
      icon: DollarSign,
      score: analysis.scores.profitability.value,
      description: `${
        analysis.scores.profitability.justification
      } • Gross margin ${(analysis.scores.profitability.grossMargin * 100).toFixed(
        1
      )}% • EBITDA ${(analysis.scores.profitability.ebitdaMargin * 100).toFixed(
        1
      )}%`,
    },
    {
      label: "Market Timing",
      icon: Clock3,
      score: analysis.scores.marketTiming.value,
      description: analysis.scores.marketTiming.justification,
    },
    {
      label: "Buyer Appetite",
      icon: Users,
      score: analysis.scores.buyerAppetite.value,
      description: analysis.scores.buyerAppetite.justification,
    },
    {
      label: "Owner Dependence",
      icon: UserCog,
      score: analysis.scores.ownerDependence.value,
      description: analysis.scores.ownerDependence.justification,
    },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-20">
        <h2 className="text-xl font-serif font-semibold">Sell Readiness Score</h2>
        <Badge
          className="text-sm px-3 py-1"
          style={{
            backgroundColor: `${analysis.scoreColor}20`,
            color: analysis.scoreColor,
            borderColor: analysis.scoreColor,
          }}
        >
          {analysis.readinessLabel}
        </Badge>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-8 pt-2">
        {/* Left: Gauge and Summary */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <ScoreGauge score={analysis.score} color={analysis.scoreColor} />
          <p className="text-sm text-muted-foreground leading-relaxed text-center max-w-md">
            {analysis.summaryNote || "Your business shows strong readiness for a sale. With solid fundamentals and market positioning, you're well-positioned for a successful exit."}
          </p>
        </div>

        {/* Right: Score Breakdown */}
        <div className="space-y-5">
          <h3 className="text-base font-semibold text-muted-foreground">Score Breakdown</h3>
          <div className="space-y-4">
            {factors.map(({ label, icon: Icon, score, description }) => (
              <div key={label} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{score}</span>
                    <span className="text-xs text-muted-foreground">/ 100</span>
                  </div>
                </div>
                <ProgressBar value={score} color={analysis.scoreColor} />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
