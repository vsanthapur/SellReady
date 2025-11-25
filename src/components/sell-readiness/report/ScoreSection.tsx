import { AnalysisResult } from "@/types/analysis";

interface ScoreSectionProps {
  analysis: AnalysisResult;
}

function ScoreHeader({
  label,
  color,
}: {
  label: string;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between pb-4 border-b border-border">
      <h2 className="text-xl font-serif font-semibold flex items-center gap-3">
        Sell Readiness Score
        <span
          className="text-xs font-semibold px-3 py-1 rounded-full border uppercase tracking-wide"
          style={{
            borderColor: color,
            color,
            backgroundColor: `${color}10`,
          }}
        >
          {label}
        </span>
      </h2>
    </div>
  );
}

function ScoreBadge({ score, color }: { score: number; color: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2">
      <div
        className="w-28 h-28 rounded-full flex items-center justify-center border-4 font-bold text-4xl"
        style={{
          borderColor: color,
          color,
        }}
      >
        {score}
      </div>
      <div className="text-xs text-muted-foreground">Overall Score / 100</div>
    </div>
  );
}

export function ScoreSection({ analysis }: ScoreSectionProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 h-full flex flex-col items-center text-center space-y-4">
      <ScoreHeader label={analysis.readinessLabel} color={analysis.scoreColor} />

      <div className="py-4">
        <ScoreBadge score={analysis.score} color={analysis.scoreColor} />
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
        {analysis.summaryNote ||
          "Your business shows strong readiness for a sale. With solid fundamentals and market positioning, you're well-positioned for a successful exit."}
      </p>
    </div>
  );
}
