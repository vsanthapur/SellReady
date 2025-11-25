import { AnalysisResult } from "@/services/analysis";
import type { WebsiteExtraction } from "@/types/analysis";
import { SummaryCard } from "./SummaryCard";
import { TrendingUp, Download } from "lucide-react";
import { HowItWorksFooter } from "./HowItWorksFooter";
import { CTAFooter } from "./CTAFooter";
import { ScoreSection } from "./report/ScoreSection";
import { ScoreBreakdown } from "./report/ScoreBreakdown";
import { ExecutiveSummary } from "./report/ExecutiveSummary";
import { StrengthsRisksSection } from "./report/StrengthsRisksSection";
import { ValuationSection } from "./report/ValuationSection";
import { RecommendedActions } from "./report/RecommendedActions";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface Step3AnalysisProps {
  analysis: AnalysisResult;
  initialWebsiteExtraction?: WebsiteExtraction | null;
}

function FactorCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <h3 className="text-base font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

export function Step3Analysis({ analysis, initialWebsiteExtraction }: Step3AnalysisProps) {
  const reportRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadReport = async () => {
    if (!reportRef.current) return;
    try {
      setIsDownloading(true);
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      let heightLeft = pdfHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();

      while (heightLeft > 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();
      }

      const safeName = (analysis.businessName || "sell-readiness").replace(/\s+/g, "-");
      pdf.save(`${safeName}-report.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-7xl space-y-8" ref={reportRef}>
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-serif font-semibold mb-2 tracking-tight">
              Sell Readiness Report for {analysis.businessName}
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed">
              Based on our analysis of your business, market conditions, and financial health,
              here's your comprehensive sell readiness assessment.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleDownloadReport}
            disabled={isDownloading}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <Download className="w-4 h-4" />
            {isDownloading ? "Preparing PDF..." : "Download Report"}
          </Button>
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
              businessName={initialWebsiteExtraction?.businessName ?? analysis.businessName}
              website={analysis.website}
              revenue={analysis.revenue}
              grossProfit={analysis.grossProfit}
              products={initialWebsiteExtraction?.productsAndServices ?? analysis.products}
              markets={initialWebsiteExtraction?.customerSegments ?? analysis.markets}
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
              sgnaBand={analysis.sgnaBand}
              estimatedEbitdaMargin={analysis.scores.profitability.ebitdaMargin}
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
