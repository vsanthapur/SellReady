import { useState } from "react";
import { Step1Website } from "@/components/sell-readiness/Step1Website";
import { Step2Financials } from "@/components/sell-readiness/Step2Financials";
import { Step3Analysis } from "@/components/sell-readiness/Step3Analysis";
import { LoadingScreen } from "@/components/sell-readiness/LoadingScreen";
import { fetchSellReadiness, AnalysisResult } from "@/services/analysis";

type FlowStep = "website" | "financials" | "loading" | "analysis";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<FlowStep>("website");
  const [website, setWebsite] = useState("");
  const [revenue, setRevenue] = useState("");
  const [grossProfit, setGrossProfit] = useState("");
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  const handleWebsiteSubmit = async (url: string) => {
    setWebsite(url);
    setCurrentStep("loading");
    
    // Simulate analysis delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setCurrentStep("financials");
  };

  const handleFinancialsSubmit = async (rev: string, gp: string) => {
    setRevenue(rev);
    setGrossProfit(gp);
    setCurrentStep("loading");

    // Fetch analysis (hardcoded for now)
    const result = await fetchSellReadiness({
      website,
      revenue: rev,
      grossProfit: gp
    });

    setAnalysis(result);
    setCurrentStep("analysis");
  };

  return (
    <>
      {currentStep === "website" && (
        <Step1Website onNext={handleWebsiteSubmit} />
      )}

      {currentStep === "financials" && (
        <Step2Financials website={website} onNext={handleFinancialsSubmit} />
      )}

      {currentStep === "loading" && (
        <LoadingScreen
          website={website}
          revenue={revenue}
          grossProfit={grossProfit}
        />
      )}

      {currentStep === "analysis" && analysis && (
        <Step3Analysis analysis={analysis} />
      )}
    </>
  );
};

export default Index;
