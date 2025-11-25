import { MarketConditions } from "@/types/analysis";
import { TrendingUp, ArrowUp, ArrowDown } from "lucide-react";

interface MarketConditionsProps {
  marketConditions: MarketConditions;
}

export function MarketConditionsSection({ marketConditions }: MarketConditionsProps) {
  if (!marketConditions) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-serif font-semibold flex items-center gap-2">
        <TrendingUp className="w-5 h-5" />
        Market Conditions & M&A Timing
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {marketConditions.tailwinds && marketConditions.tailwinds.length > 0 && (
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ArrowUp className="w-5 h-5 text-green-600" />
              Market Tailwinds
            </h3>
            <ul className="space-y-2">
              {marketConditions.tailwinds.map((tailwind, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span className="text-sm text-foreground">{tailwind}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {marketConditions.headwinds && marketConditions.headwinds.length > 0 && (
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ArrowDown className="w-5 h-5 text-orange-600" />
              Market Headwinds
            </h3>
            <ul className="space-y-2">
              {marketConditions.headwinds.map((headwind, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  <span className="text-sm text-foreground">{headwind}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

