import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "./StepIndicator";

interface Step1WebsiteProps {
  onNext: (website: string) => void;
}

export function Step1Website({ onNext }: Step1WebsiteProps) {
  const [website, setWebsite] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (website.trim()) {
      onNext(website);
    }
  };

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-semibold mb-6 tracking-tight">
            Instantly Analyze Your Business's
            <br />
            Sell Readiness
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover how ready your small business is for a sale with our AI-powered analysis
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-16">
          <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
            <Input
              type="url"
              placeholder="Enter your business website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="flex-1 h-14 text-base"
              required
            />
            <Button
              type="submit"
              size="lg"
              className="px-8 h-14 bg-primary hover:bg-primary/90"
            >
              Analyze Sell Readiness
            </Button>
          </form>

          <StepIndicator currentStep={1} />
        </div>

        <HowThisWorks />
        <CTASection />
      </div>
    </div>
  );
}

function HowThisWorks() {
  const steps = [
    {
      number: "01",
      title: "UNDERSTAND YOUR BUSINESS",
      description: "Our AI will review your company website to better understand your business."
    },
    {
      number: "02",
      title: "ANALYZE FINANCIALS",
      description: "We'll analyze your revenue and profitability to assess business health."
    },
    {
      number: "03",
      title: "ESTIMATE SELL READINESS",
      description: "Our AI will evaluate market conditions and buyer appetite to score readiness."
    },
    {
      number: "04",
      title: "GENERATE CUSTOM REPORT",
      description: "You receive a customized report for your business. No e-mail necessary."
    }
  ];

  return (
    <section className="mb-24">
      <h2 className="text-4xl font-serif font-semibold mb-12 text-center">
        How This Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step) => (
          <div key={step.number} className="space-y-3">
            <div className="text-sm font-medium text-muted-foreground">
              {step.number} {step.title}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="border-t border-border pt-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="text-3xl font-serif font-semibold mb-3">
            Interested in selling your business?
          </h2>
          <p className="text-muted-foreground">Learn more about OffDeal</p>
        </div>
        <Button
          size="lg"
          className="px-8 h-12 bg-primary hover:bg-primary/90"
        >
          Get in touch
        </Button>
      </div>
    </section>
  );
}
