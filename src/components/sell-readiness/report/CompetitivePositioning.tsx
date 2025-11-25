import { CompetitivePositioning } from "@/types/analysis";
import { Building2, CheckCircle2, AlertCircle } from "lucide-react";

interface CompetitivePositioningProps {
  competitivePositioning: CompetitivePositioning;
}

export function CompetitivePositioningSection({ competitivePositioning }: CompetitivePositioningProps) {
  if (!competitivePositioning) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-serif font-semibold flex items-center gap-2">
        <Building2 className="w-5 h-5" />
        Competitive Positioning
      </h2>
      <div className="bg-card border border-border rounded-lg p-6 space-y-6">
        {competitivePositioning.landscape && (
          <div>
            <h3 className="text-base font-semibold mb-2">Market Landscape</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {competitivePositioning.landscape}
            </p>
          </div>
        )}
        {competitivePositioning.differentiators && competitivePositioning.differentiators.length > 0 && (
          <div>
            <h3 className="text-base font-semibold mb-3">Differentiators</h3>
            <ul className="space-y-2">
              {competitivePositioning.differentiators.map((differentiator, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground">{differentiator}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {competitivePositioning.risks && competitivePositioning.risks.length > 0 && (
          <div>
            <h3 className="text-base font-semibold mb-3">Risks</h3>
            <ul className="space-y-2">
              {competitivePositioning.risks.map((risk, index) => (
                <li key={index} className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground">{risk}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

