import { Valuation } from "@/types/analysis";
import { FileText } from "lucide-react";

interface ValuationSectionProps {
  valuation: Valuation;
}

export function ValuationSection({ valuation }: ValuationSectionProps) {
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
            <div className="text-sm text-muted-foreground mb-1">Profit-Based Range</div>
            <div className="text-lg font-semibold">{valuation.profitRange}</div>
          </div>
        </div>
        
        {/* Valuation Inputs */}
        {valuation.valuationInputs && valuation.valuationInputs.length > 0 && (
          <div className="pt-4 border-t border-border">
            <h3 className="text-base font-semibold mb-3">Valuation Inputs</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              {valuation.valuationInputs.map((input, index) => (
                <li key={index}>{input}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Comparable Multiples */}
        {valuation.comparableMultiples && valuation.comparableMultiples.length > 0 && (
          <div className="pt-4 border-t border-border">
            <h3 className="text-base font-semibold mb-3">Comparable Multiples</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                {valuation.comparableMultiples.map((multiple, index) => (
                  <li key={index}>{multiple}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {valuation.note && (
          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground italic">{valuation.note}</p>
          </div>
        )}
      </div>
    </div>
  );
}

