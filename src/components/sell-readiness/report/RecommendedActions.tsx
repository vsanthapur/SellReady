import { RecommendedAction } from "@/types/analysis";
import { CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface RecommendedActionsProps {
  recommendedActions: RecommendedAction[];
}

export function RecommendedActions({ recommendedActions }: RecommendedActionsProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit to backend endpoint
    console.log("Form submitted:", formData);
  };

  if (!recommendedActions || recommendedActions.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-serif font-semibold flex items-center gap-2">
        <CheckCircle2 className="w-5 h-5" />
        Recommended Actions
      </h2>
      <div className="grid md:grid-cols-2 gap-6 items-stretch">
        {/* Left Column: Recommended Actions */}
        <div className="space-y-4 flex flex-col">
          {recommendedActions.map((action, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-5">
              <h3 className="font-semibold mb-2">{action.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{action.description}</p>
            </div>
          ))}
        </div>

        {/* Right Column: Interested In Selling? CTA */}
        <div className="bg-card border border-border rounded-lg p-6 flex flex-col">
          <h3 className="text-lg font-serif font-semibold mb-3">Interested In Selling?</h3>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            Ready to take the next step? Our team can help you navigate the sale process and maximize your business value.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="text-sm font-medium mb-1 block">
                  First Name
                </label>
                <Input
                  id="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="text-sm font-medium mb-1 block">
                  Last Name
                </label>
                <Input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium mb-1 block">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="text-sm font-medium mb-1 block">
                Phone
              </label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
            <div className="mt-auto">
              <Button type="submit" className="w-full">
                Discuss Your Options
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
