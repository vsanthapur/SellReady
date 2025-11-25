import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "./StepIndicator";
import { SummaryCard } from "./SummaryCard";
import { HowItWorksFooter } from "./HowItWorksFooter";
import { CTAFooter } from "./CTAFooter";
import { formatNumberWithCommas, parseFormattedNumber } from "@/lib/formatters";

interface Step2FinancialsProps {
  website: string;
  onNext: (revenue: string, grossProfit: string) => void;
}

export function Step2Financials({ website, onNext }: Step2FinancialsProps) {
  const [revenue, setRevenue] = useState("");
  const [grossProfit, setGrossProfit] = useState("");
  const [error, setError] = useState("");

  const handleRevenueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNumberWithCommas(e.target.value);
    setRevenue(formatted);
    setError("");
  };

  const handleGrossProfitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNumberWithCommas(e.target.value);
    setGrossProfit(formatted);
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!revenue.trim() || !grossProfit.trim()) {
      return;
    }

    const revenueNum = parseFormattedNumber(revenue);
    const grossProfitNum = parseFormattedNumber(grossProfit);

    if (grossProfitNum > revenueNum) {
      setError("Gross profit cannot exceed revenue");
      return;
    }

    onNext(revenue, grossProfit);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-[1fr,500px] gap-8 items-start mb-12">
          <div>
            <div className="text-sm text-muted-foreground mb-3">Step 2 of 3</div>
            <h1 className="text-4xl font-serif font-semibold mb-4 tracking-tight">
              About your business
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Now, let's get some financial data. This will help us calculate your margins
              and assess how ready your business is for a sale.
            </p>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-sm font-medium mb-3">Revenue</label>
                <Input
                  type="text"
                  placeholder="Enter your revenue"
                  value={revenue}
                  onChange={handleRevenueChange}
                  className="h-12"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">Gross Profit</label>
                <Input
                  type="text"
                  placeholder="Enter your gross profit"
                  value={grossProfit}
                  onChange={handleGrossProfitChange}
                  className="h-12"
                  required
                />
                {error && (
                  <p className="text-sm text-destructive mt-2">{error}</p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full h-12 bg-primary hover:bg-primary/90"
              >
                Next
              </Button>
            </form>
          </div>

          <div className="lg:sticky lg:top-8 h-fit">
            <SummaryCard
              businessName="Your Business"
              website={website}
              revenue={revenue || "—"}
              grossProfit={grossProfit || "—"}
              products={["Service A", "Service B", "Product C"]}
              markets={["SMB", "Enterprise", "Consumer"]}
            />
          </div>
        </div>

        <StepIndicator currentStep={2} />
        
        <HowItWorksFooter />
        <CTAFooter />
      </div>
    </div>
  );
}
