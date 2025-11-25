import { AnalysisResult } from "@/types/analysis";
import { TrendingUp, DollarSign, Users, Clock3, UserCog } from "lucide-react";

interface ScoreBreakdownProps {
  analysis: AnalysisResult;
}

function ProgressBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
  );
}

export function ScoreBreakdown({ analysis }: ScoreBreakdownProps) {
  const profitabilityDetails = `Calculated from your inputs: Gross margin ${(
    analysis.scores.profitability.grossMargin * 100
  ).toFixed(1)}%; Estimated EBITDA margin ${(
    analysis.scores.profitability.ebitdaMargin * 100
  ).toFixed(1)}%`;
  

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
      description: analysis.scores.profitability.justification,
      details: profitabilityDetails,
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
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
        Score Breakdown
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {factors.map(({ label, icon: Icon, score, description, details }) => (
          <div
            key={label}
            className="border border-border rounded-lg p-4 space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">{label}</span>
              </div>
              <span className="text-sm font-semibold">{score}/100</span>
            </div>
            <ProgressBar value={score} color={analysis.scoreColor} />
            <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
            {details && (
              <p className="text-xs text-muted-foreground leading-relaxed">{details}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
