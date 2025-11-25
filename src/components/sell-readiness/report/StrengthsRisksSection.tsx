import { AnalysisResult } from "@/types/analysis";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface StrengthsRisksSectionProps {
  strengths: string[];
  risks: string[];
}

export function StrengthsRisksSection({ strengths, risks }: StrengthsRisksSectionProps) {
  if ((!strengths || strengths.length === 0) && (!risks || risks.length === 0)) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-serif font-semibold flex items-center gap-2">
        <CheckCircle2 className="w-5 h-5" />
        Strengths & Risks
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {strengths && strengths.length > 0 && (
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              Strengths
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              {strengths.map((strength, index) => (
                <li key={index} className="text-sm text-foreground">
                  {strength}
                </li>
              ))}
            </ul>
          </div>
        )}
        {risks && risks.length > 0 && (
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              Risks & Challenges
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              {risks.map((risk, index) => (
                <li key={index} className="text-sm text-foreground">
                  {risk}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

