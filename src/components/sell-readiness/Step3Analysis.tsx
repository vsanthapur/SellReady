import { AnalysisResult } from "@/services/analysis";
import { SummaryCard } from "./SummaryCard";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { TrendingUp, CheckCircle2, FileText, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HowItWorksFooter } from "./HowItWorksFooter";
import { CTAFooter } from "./CTAFooter";

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
              <h2 className="text-2xl font-serif font-semibold mb-6">
                Sell Readiness Score
              </h2>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-6xl font-bold">
                  {analysis.score}
                </div>
                <div className="text-4xl text-muted-foreground font-light">
                  / 100
                </div>
              </div>
              <p className="text-muted-foreground text-lg">
                Your business shows {analysis.score >= 70 ? "strong" : "moderate"} readiness for a sale
              </p>
            </div>

            {/* Business Snapshot */}
            <div className="space-y-6">
              <h2 className="text-3xl font-serif font-semibold flex items-center gap-2">
                <Building2 className="w-6 h-6" />
                Business Snapshot
              </h2>
              
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Industry</div>
                    <div className="font-medium">{analysis.industry}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Business Model</div>
                    <div className="font-medium">{analysis.businessModel}</div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground mb-2">Products & Services</div>
                  <div className="flex flex-wrap gap-2">
                    {analysis.products.map((product) => (
                      <Badge key={product} variant="secondary" className="bg-tag text-tag-foreground">
                        {product}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground mb-2">Customer Segments</div>
                  <div className="flex flex-wrap gap-2">
                    {analysis.markets.map((market) => (
                      <Badge key={market} variant="secondary" className="bg-tag text-tag-foreground">
                        {market}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground mb-1">Location Type</div>
                  <div className="font-medium">{analysis.locationType}</div>
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
                <div className="text-center pt-4 space-y-3">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Estimated Multiple</div>
                    <div className="text-3xl font-bold text-primary">
                      {sliderValue[0]}x
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Estimated Valuation</div>
                    <div className="text-2xl font-semibold">
                      $600,000–$720,000
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">(placeholder)</p>
                  </div>
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

            <HowItWorksFooter />
            <CTAFooter />
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
