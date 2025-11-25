import { AnalysisResult } from "@/services/analysis";
import { SummaryCard } from "./SummaryCard";
import { TrendingUp } from "lucide-react";
import { HowItWorksFooter } from "./HowItWorksFooter";
import { CTAFooter } from "./CTAFooter";
import { ScoreSection } from "./report/ScoreSection";
import { ScoreBreakdown } from "./report/ScoreBreakdown";
import { ExecutiveSummary } from "./report/ExecutiveSummary";
import { StrengthsRisksSection } from "./report/StrengthsRisksSection";
import { ValuationSection } from "./report/ValuationSection";
import { RecommendedActions } from "./report/RecommendedActions";

interface Step3AnalysisProps {
  analysis: AnalysisResult;
}

function FactorCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <h3 className="text-base font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

export function Step3Analysis({ analysis }: Step3AnalysisProps) {
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-serif font-semibold mb-2 tracking-tight">
            Sell Readiness Report for {analysis.businessName}
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Based on our analysis of your business, market conditions, and financial health,
            here's your comprehensive sell readiness assessment.
          </p>
        </div>

        {/* Two Column Layout: Score (left) + Summary Card (right) */}
        <div className="flex flex-col lg:flex-row lg:justify-center gap-10">
          {/* Score Card - Left Side */}
          <div className="w-full lg:w-[540px]">
            <ScoreSection analysis={analysis} />
          </div>

          {/* Summary Card - Right Side */}
          <div className="lg:w-[540px] lg:sticky lg:top-8 h-fit">
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

        {/* Score Breakdown */}
        <ScoreBreakdown analysis={analysis} />

        {/* Executive Summary - Full width after score section */}
        {analysis.executiveSummary && (
          <div className="pt-6 border-t border-border">
            <ExecutiveSummary executiveSummary={analysis.executiveSummary} />
          </div>
        )}

        {/* Strengths & Risks */}
        {(analysis.strengths || analysis.risks) && (
          <div className="pt-8 border-t border-border">
            <StrengthsRisksSection
              strengths={analysis.strengths}
              risks={analysis.risks}
            />
          </div>
        )}

        {/* Key Factors - Grid Layout */}
        <div className="pt-8 border-t border-border space-y-4">
          <h2 className="text-2xl font-serif font-semibold flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Key Factors
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FactorCard title="Growth" description={analysis.growth} />
            <FactorCard title="Profitability" description={analysis.profitability} />
            <FactorCard title="Market Timing" description={analysis.marketTiming} />
            <FactorCard title="Buyer Appetite" description={analysis.buyerAppetite} />
            <FactorCard title="Owner Dependence" description={analysis.ownerDependence} />
          </div>
        </div>

        {/* Valuation */}
        {analysis.valuation && (
          <div className="pt-8 border-t border-border">
            <ValuationSection
              valuation={analysis.valuation}
              industryMultiples={analysis.industryMultiples}
              profitabilityInsights={analysis.profitabilityInsights}
            />
          </div>
        )}

        {/* Recommended Actions + CTA */}
        {analysis.recommendedActions && analysis.recommendedActions.length > 0 && (
          <div className="pt-8 border-t border-border">
            <RecommendedActions recommendedActions={analysis.recommendedActions} />
          </div>
        )}

        <HowItWorksFooter />
        <CTAFooter />
      </div>
    </div>
  );
}
