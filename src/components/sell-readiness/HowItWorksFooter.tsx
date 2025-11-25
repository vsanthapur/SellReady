import { HOW_IT_WORKS_STEPS } from "@/lib/constants";

export function HowItWorksFooter() {
  return (
    <div className="border-t border-border pt-8 mt-8">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-4xl font-serif font-semibold mb-4">How This Works</h2>
        <p className="text-lg text-muted-foreground mb-12">
          Our AI will analyze your business to provide a comprehensive sell readiness assessment.
        </p>

        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <div key={step.number}>
              <div className="text-sm text-muted-foreground mb-2">{step.number}</div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
