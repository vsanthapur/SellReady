import { Badge } from "@/components/ui/badge";

interface SummaryCardProps {
  businessName: string;
  website: string;
  revenue: string;
  grossProfit: string;
  products: string[];
  markets: string[];
}

export function SummaryCard({
  businessName,
  website,
  revenue,
  grossProfit,
  products,
  markets
}: SummaryCardProps) {
  return (
    <div className="bg-summary-card rounded-lg p-8 shadow-sm">
      <div className="bg-card rounded-lg p-6 space-y-6">
        <div>
          <h3 className="text-xl font-serif font-semibold mb-1">{businessName}</h3>
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:underline"
          >
            {website}
          </a>
        </div>

        {(revenue !== "—" || grossProfit !== "—") && (
          <div className="grid grid-cols-2 gap-4 py-4 border-t border-border">
            <div>
              <div className="text-2xl font-semibold mb-1">{revenue}</div>
              <div className="text-sm text-muted-foreground">Revenue</div>
            </div>
            <div>
              <div className="text-2xl font-semibold mb-1">{grossProfit}</div>
              <div className="text-sm text-muted-foreground">Gross Profit</div>
            </div>
          </div>
        )}

        {products.length > 0 && (
          <div className="pt-4 border-t border-border">
            <div className="text-sm font-medium mb-3">Products & Services</div>
            <div className="flex flex-wrap gap-2">
              {products.map((product) => (
                <Badge key={product} variant="secondary" className="bg-tag text-tag-foreground">
                  {product}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {markets.length > 0 && (
          <div className="pt-4">
            <div className="text-sm font-medium mb-3">Customer Segments</div>
            <div className="flex flex-wrap gap-2">
              {markets.map((market) => (
                <Badge key={market} variant="secondary" className="bg-tag text-tag-foreground">
                  {market}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
