import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "./StepIndicator";
import { SummaryCard } from "./SummaryCard";

interface Step2FinancialsProps {
  website: string;
  onNext: (revenue: string, grossProfit: string) => void;
}

export function Step2Financials({ website, onNext }: Step2FinancialsProps) {
  const [revenue, setRevenue] = useState("");
  const [grossProfit, setGrossProfit] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (revenue.trim() && grossProfit.trim()) {
      onNext(revenue, grossProfit);
    }
  };

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <div className="text-sm text-muted-foreground mb-4">Step 2 of 3</div>
            <h1 className="text-5xl font-serif font-semibold mb-6 tracking-tight">
              About your business
            </h1>
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
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
                  onChange={(e) => setRevenue(e.target.value)}
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
                  onChange={(e) => setGrossProfit(e.target.value)}
                  className="h-12"
                  required
                />
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

          <div className="lg:sticky lg:top-8">
            <SummaryCard
              businessName="Your Business"
              website={website}
              revenue={revenue || "—"}
              grossProfit={grossProfit || "—"}
              products={[]}
              markets={[]}
            />
          </div>
        </div>

        <StepIndicator currentStep={2} />
      </div>
    </div>
  );
}
