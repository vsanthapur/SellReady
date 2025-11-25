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
        <div className="pt-4 border-t border-border">
          <h3 className="text-base font-semibold mb-3">Valuation Inputs</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>Industry typical revenue multiples: 0.6×–0.72×</li>
            <li>Industry typical profit multiples: 3×–4×</li>
            <li>Business model suggests higher digital valuations</li>
            <li>Strong margins and brand trust support the range</li>
            <li>Owner dependence slightly reduces upper bound</li>
          </ul>
        </div>

        {/* Comparable Multiples */}
        <div className="pt-4 border-t border-border">
          <h3 className="text-base font-semibold mb-3">Comparable Multiples</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              <li>Local services: 2.5×–3.5× SDE</li>
              <li>Digital businesses: 3×–5× EBITDA</li>
              <li>Consumer retail: 0.5×–1× revenue</li>
            </ul>
          </div>
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

