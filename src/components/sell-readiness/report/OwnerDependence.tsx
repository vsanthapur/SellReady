import { OwnerDependenceImpact } from "@/types/analysis";
import { Sliders } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface OwnerDependenceProps {
  ownerDependenceImpact: OwnerDependenceImpact;
}

export function OwnerDependence({ ownerDependenceImpact }: OwnerDependenceProps) {
  const [sliderValue, setSliderValue] = useState([ownerDependenceImpact?.currentLevel || 70]);

  if (!ownerDependenceImpact) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-serif font-semibold flex items-center gap-2">
        <Sliders className="w-5 h-5" />
        Operational Risk Assessment
      </h2>
      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <div>
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Low Owner Dependence</span>
            <span>High Owner Dependence</span>
          </div>
          <Slider
            value={sliderValue}
            onValueChange={setSliderValue}
            max={100}
            min={0}
            step={1}
            className="w-full"
          />
          <div className="text-center mt-4">
            <div className="text-sm text-muted-foreground mb-1">Current Level</div>
            <div className="text-2xl font-bold">{sliderValue[0]}%</div>
          </div>
        </div>
        <div className="pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground mb-3">{ownerDependenceImpact.analysis}</p>
          <p className="text-sm font-medium">{ownerDependenceImpact.recommendation}</p>
        </div>
      </div>
    </div>
  );
}

