import { SummaryCard } from "./SummaryCard";

interface LoadingScreenProps {
  website: string;
  revenue: string;
  grossProfit: string;
}

export function LoadingScreen({ website, revenue, grossProfit }: LoadingScreenProps) {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-[1fr,500px] gap-8 items-start">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="text-lg text-muted-foreground">
                Analyzing your business…
              </p>
              <p className="text-sm text-muted-foreground">
                Reviewing your products, services, and financials…
              </p>
            </div>
          </div>

          <div className="lg:sticky lg:top-8 h-fit">
            <SummaryCard
              businessName="Your Business"
              website={website}
              revenue={revenue}
              grossProfit={grossProfit}
              products={[]}
              markets={[]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
