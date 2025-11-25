import { AnalysisResult } from "@/types/analysis";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface StrengthsWeaknessesProps {
  strengths: string[];
  weaknesses: string[];
}

export function StrengthsWeaknesses({ strengths, weaknesses }: StrengthsWeaknessesProps) {
  if ((!strengths || strengths.length === 0) && (!weaknesses || weaknesses.length === 0)) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-serif font-semibold flex items-center gap-2">
        <CheckCircle2 className="w-5 h-5" />
        Strengths & Weaknesses
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {strengths && strengths.length > 0 && (
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              Strengths
            </h3>
            <ul className="space-y-2">
              {strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-sm text-foreground">{strength}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {weaknesses && weaknesses.length > 0 && (
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              Weaknesses
            </h3>
            <ul className="space-y-2">
              {weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <span className="text-sm text-foreground">{weakness}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

