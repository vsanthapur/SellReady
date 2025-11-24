import { AnalysisResult } from "@/services/analysis";
import { SummaryCard } from "./SummaryCard";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { TrendingUp, CheckCircle2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Step3AnalysisProps {
  analysis: AnalysisResult;
}

export function Step3Analysis({ analysis }: Step3AnalysisProps) {
  const [sliderValue, setSliderValue] = useState([15]);

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-[1fr,400px] gap-12">
          {/* Main Content */}
          <div className="space-y-12">
            <div>
              <h1 className="text-4xl font-serif font-semibold mb-6 tracking-tight">
                Sell Readiness Report for {analysis.businessName}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Based on our analysis of your business, market conditions, and financial health,
                here's your comprehensive sell readiness assessment.
              </p>
            </div>

            {/* Score Card */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex items-center gap-6 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full border-4 border-primary flex items-center justify-center">
                    <span className="text-3xl font-bold">{analysis.score}</span>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-semibold mb-2">
                    Sell Readiness Score
                  </h2>
                  <p className="text-muted-foreground">
                    Out of 100 — Your business shows {analysis.score >= 70 ? "strong" : "moderate"} readiness for a sale
                  </p>
                </div>
              </div>
            </div>

            {/* Key Factors */}
            <div className="space-y-6">
              <h2 className="text-3xl font-serif font-semibold flex items-center gap-2">
                <TrendingUp className="w-6 h-6" />
                Key Factors
              </h2>

              <div className="space-y-6">
                <FactorCard title="Growth" description={analysis.growth} />
                <FactorCard title="Profitability" description={analysis.profitability} />
                <FactorCard title="Market Timing" description={analysis.marketTiming} />
                <FactorCard title="Buyer Appetite" description={analysis.buyerAppetite} />
                <FactorCard title="Owner Dependence" description={analysis.ownerDependence} />
              </div>
            </div>

            {/* Valuation Slider */}
            <div className="bg-card border border-border rounded-lg p-8 space-y-6">
              <h2 className="text-2xl font-serif font-semibold flex items-center gap-2">
                <FileText className="w-6 h-6" />
                Estimated Valuation Multiple
              </h2>
              <p className="text-muted-foreground">
                Adjust the slider to see how different valuation multiples affect your business worth.
              </p>

              <div className="space-y-4">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>0x</span>
                  <span>10x</span>
                  <span>20x</span>
                  <span>30x</span>
                </div>
                <Slider
                  value={sliderValue}
                  onValueChange={setSliderValue}
                  max={30}
                  step={0.5}
                  className="w-full"
                />
                <div className="text-center pt-4">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {sliderValue[0]}x Multiple
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Estimated business value based on revenue multiple
                  </p>
                </div>
              </div>
            </div>

            {/* Recommended Actions */}
            <div className="space-y-6">
              <h2 className="text-3xl font-serif font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6" />
                Recommended Actions
              </h2>

              <div className="space-y-4">
                {analysis.recommendedActions.map((action, index) => (
                  <div key={index} className="bg-card border border-border rounded-lg p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </div>
                      <p className="text-foreground pt-1">{action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="border-t border-border pt-12 mt-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <h2 className="text-3xl font-serif font-semibold mb-3">
                    Interested in selling your business?
                  </h2>
                  <p className="text-muted-foreground">Learn more about OffDeal</p>
                </div>
                <Button size="lg" className="px-8 h-12 bg-primary hover:bg-primary/90">
                  Get in touch
                </Button>
              </div>
            </div>
          </div>

          {/* Sticky Summary Card */}
          <div className="lg:sticky lg:top-8">
            <SummaryCard
              businessName={analysis.businessName}
              website={analysis.website}
              revenue={analysis.revenue}
              grossProfit={analysis.grossProfit}
              products={analysis.products}
              markets={analysis.markets}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FactorCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
