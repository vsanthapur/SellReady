import { Button } from "@/components/ui/button";

export function CTAFooter() {
  return (
    <div className="border-t border-border pt-12 mt-16">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-serif font-semibold mb-3">
              Interested in selling your business?
            </h2>
          </div>
          <Button size="lg" className="px-8 h-12 bg-primary hover:bg-primary/90">
            Get in touch
          </Button>
        </div>
      </div>
    </div>
  );
}
