import { STEP_LABELS } from "@/lib/constants";

interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-12">
      <div className="space-y-2">
        {STEP_LABELS.map((step) => (
          <div
            key={step.number}
            className={`flex items-center gap-4 py-3 border-b transition-colors ${
              step.number === currentStep
                ? "border-foreground"
                : "border-border"
            }`}
          >
            <span
              className={`text-sm font-medium ${
                step.number === currentStep
                  ? "text-foreground"
                  : "text-step-inactive"
              }`}
            >
              Step {step.number}
            </span>
            <span
              className={`text-sm ${
                step.number === currentStep
                  ? "text-foreground"
                  : "text-step-inactive"
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
