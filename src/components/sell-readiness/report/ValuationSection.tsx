import type { AnalysisResult } from "@/types/analysis";
import { FileText } from "lucide-react";

interface ValuationSectionProps {
  valuation: AnalysisResult["valuation"];
  industryMultiples: AnalysisResult["industryMultiples"];
  profitabilityInsights: AnalysisResult["profitabilityInsights"];
  sgnaBand?: AnalysisResult["sgnaBand"];
  estimatedEbitdaMargin?: number;
}

export function ValuationSection({
  valuation,
  industryMultiples,
  profitabilityInsights,
  sgnaBand,
  estimatedEbitdaMargin,
}: ValuationSectionProps) {
  if (!valuation) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-serif font-semibold flex items-center gap-2">
        <FileText className="w-5 h-5" />
        Estimated Market Valuation Range
      </h2>
      <div className="bg-card border border-border rounded-lg p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Revenue-Based Range</div>
            <div className="text-lg font-semibold">{valuation.revenueRange}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">EBITDA-Based Range</div>
            <div className="text-lg font-semibold">{valuation.profitRange}</div>
          </div>
        </div>
        
        {/* Industry Multiples */}
        <div className="pt-4 border-t border-border">
          <h3 className="text-base font-semibold mb-3">Industry Multiples</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>Revenue multiples: {industryMultiples.revenueMultipleRange}</li>
            <li>EBITDA multiples: {industryMultiples.ebitdaMultipleRange}</li>
            <li>{industryMultiples.justification}</li>
            {typeof estimatedEbitdaMargin === "number" && (
              <li>
                Estimated EBITDA margin from your inputs: {(estimatedEbitdaMargin * 100).toFixed(1)}%
              </li>
            )}
            {sgnaBand && (
              <li>
                Typical SG&A range for this sector: {sgnaBand.low}% – {sgnaBand.high}% (midpoint{" "}
                {sgnaBand.mid}%)
              </li>
            )}
          </ul>
        </div>

        {/* Profitability Notes */}
        <div className="pt-4 border-t border-border">
          <h3 className="text-base font-semibold mb-3">Profitability Signals</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            {profitabilityInsights.descriptors.map((descriptor) => (
              <li key={descriptor}>{descriptor}</li>
            ))}
            <li>{profitabilityInsights.industryProfitabilityNotes}</li>
          </ul>
        </div>

        {valuation.note && (
          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground italic">{valuation.note}</p>
          </div>
        )}
      </div>
    </div>
  );
}

