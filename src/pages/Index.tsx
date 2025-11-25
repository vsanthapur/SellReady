import { useState } from "react";
import { Step1Website } from "@/components/sell-readiness/Step1Website";
import { Step2Financials } from "@/components/sell-readiness/Step2Financials";
import { Step3Analysis } from "@/components/sell-readiness/Step3Analysis";
import { LoadingScreen } from "@/components/sell-readiness/LoadingScreen";
import { fetchSellReadiness, fetchWebsiteExtraction, AnalysisResult } from "@/services/analysis";
import type { WebsiteExtraction } from "@/types/analysis";

type FlowStep = "website" | "financials" | "loading" | "analysis";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<FlowStep>("website");
  const [website, setWebsite] = useState("");
  const [revenue, setRevenue] = useState("");
  const [grossProfit, setGrossProfit] = useState("");
  const [websiteExtraction, setWebsiteExtraction] = useState<WebsiteExtraction | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  const handleWebsiteSubmit = async (url: string) => {
    setWebsite(url);
    setCurrentStep("loading");
    
    try {
      // Phase 1: Website Intelligence Extraction (Call 1)
      const extraction = await fetchWebsiteExtraction(url);
      setWebsiteExtraction(extraction);
      setCurrentStep("financials");
    } catch (error) {
      console.error("Error fetching website extraction:", error);
      // On error, still proceed to financials step
      setCurrentStep("financials");
    }
  };

  const handleFinancialsSubmit = async (rev: string, gp: string) => {
    setRevenue(rev);
    setGrossProfit(gp);
    setCurrentStep("loading");

    try {
      // Phase 2: Complete analysis (Call 2, Valuation, Call 3)
      // Pass websiteExtraction if available to skip Call 1
      const result = await fetchSellReadiness(
        {
          website,
          revenue: rev,
          grossProfit: gp
        },
        websiteExtraction || undefined
      );

      if (websiteExtraction) {
        result.businessName = websiteExtraction.businessName || result.businessName;
        result.products = websiteExtraction.productsAndServices || result.products;
        result.markets = websiteExtraction.customerSegments || result.markets;
      }

      setAnalysis(result);
      setCurrentStep("analysis");
    } catch (error) {
      console.error("Error fetching analysis:", error);
      // Handle error appropriately
      setCurrentStep("financials");
    }
  };

  return (
    <>
      {currentStep === "website" && (
        <Step1Website onNext={handleWebsiteSubmit} />
      )}

      {currentStep === "financials" && (
        <Step2Financials 
          website={website} 
          websiteExtraction={websiteExtraction}
          onNext={handleFinancialsSubmit} 
        />
      )}

      {currentStep === "loading" && (
        <LoadingScreen
          website={website}
          revenue={revenue}
          grossProfit={grossProfit}
          businessName={websiteExtraction?.businessName}
          products={websiteExtraction?.productsAndServices}
          markets={websiteExtraction?.customerSegments}
        />
      )}

      {currentStep === "analysis" && analysis && (
        <Step3Analysis analysis={analysis} initialWebsiteExtraction={websiteExtraction} />
      )}
    </>
  );
};

export default Index;
