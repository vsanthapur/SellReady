import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "./StepIndicator";
import { HowItWorksFooter } from "./HowItWorksFooter";
import { CTAFooter } from "./CTAFooter";

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
              type="text"
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

        <HowItWorksFooter />
        <CTAFooter />
      </div>
    </div>
  );
}
