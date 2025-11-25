import { FileText } from "lucide-react";

interface ExecutiveSummaryProps {
  executiveSummary: string;
}

export function ExecutiveSummary({ executiveSummary }: ExecutiveSummaryProps) {
  if (!executiveSummary) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-serif font-semibold flex items-center gap-2">
        <FileText className="w-5 h-5" />
        Executive Summary
      </h2>
      <div className="bg-[#f9fafb] border border-border rounded-lg p-6">
        <p className="text-sm text-foreground leading-relaxed">{executiveSummary}</p>
      </div>
    </div>
  );
}

