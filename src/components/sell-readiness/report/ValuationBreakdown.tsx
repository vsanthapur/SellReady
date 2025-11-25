import { Valuation, ValuationBreakdown } from "@/types/analysis";
import { FileText } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface ValuationBreakdownProps {
  valuation?: Valuation;
  valuationBreakdown: ValuationBreakdown;
  scoreColor: string;
}

export function ValuationBreakdownSection({ valuation, valuationBreakdown, scoreColor }: ValuationBreakdownProps) {
  const [sliderValue, setSliderValue] = useState([valuation?.multiple || 15]);

  if (!valuationBreakdown) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-serif font-semibold flex items-center gap-2">
        <FileText className="w-5 h-5" />
        Estimated Valuation Multiple
      </h2>
      <div className="bg-card border border-border rounded-lg p-6 space-y-6">
        <div>
          <p className="text-sm text-muted-foreground mb-4">
            Adjust the slider to see how different valuation multiples affect your business worth.
          </p>
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>5x</span>
            <span>10x</span>
            <span>15x</span>
            <span>20x</span>
            <span>25x</span>
            <span>30x</span>
          </div>
          <Slider
            value={sliderValue}
            onValueChange={setSliderValue}
            max={30}
            min={5}
            step={0.5}
            className="w-full"
          />
          <div className="text-center pt-4 space-y-3">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Estimated Multiple</div>
              <div className="text-3xl font-bold" style={{ color: scoreColor }}>
                {sliderValue[0]}x
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Estimated Valuation</div>
              <div className="text-2xl font-semibold">
                {valuation?.range || "$600,000–$720,000"}
              </div>
            </div>
          </div>
        </div>
        <div className="pt-4 border-t border-border space-y-4">
          <h3 className="text-lg font-semibold">Valuation Breakdown</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {valuationBreakdown.revenueBased && (
              <div>
                <div className="text-sm text-muted-foreground mb-1">Revenue-Based Valuation</div>
                <div className="text-lg font-semibold">{valuationBreakdown.revenueBased}</div>
              </div>
            )}
            {valuationBreakdown.profitBased && (
              <div>
                <div className="text-sm text-muted-foreground mb-1">Profit-Based Valuation</div>
                <div className="text-lg font-semibold">{valuationBreakdown.profitBased}</div>
              </div>
            )}
          </div>
          {valuationBreakdown.comparableMultiples && valuationBreakdown.comparableMultiples.length > 0 && (
            <div>
              <div className="text-sm font-medium mb-2">Comparable Multiples</div>
              <ul className="space-y-1">
                {valuationBreakdown.comparableMultiples.map((multiple, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    • {multiple}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

