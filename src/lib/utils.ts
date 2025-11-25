import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Extracts business name from website URL
 * Example: "https://github.com" → "Github Inc."
 * Example: "vincecutz.com" → "Vincecutz Inc."
 * Example: "google.com" → "Google Inc."
 */
export function extractBusinessName(website: string): string {
  try {
    // Add protocol if missing
    let urlToParse = website;
    if (!website.startsWith("http://") && !website.startsWith("https://")) {
      urlToParse = "https://" + website;
    }
    const domain = new URL(urlToParse).hostname.replace("www.", "");
    const name = domain.split(".")[0];
    return name.charAt(0).toUpperCase() + name.slice(1) + " Inc.";
  } catch {
    return "Your Business";
  }
}

/**
 * Determines color based on sell readiness score
 * 0-49: Red (#ef4444)
 * 50-69: Yellow/Amber (#f59e0b)
 * 70-100: Green (#22c55e)
 */
export function getScoreColor(score: number): string {
  if (score < 50) {
    return "#ef4444"; // red
  } else if (score < 70) {
    return "#f59e0b"; // yellow/amber
  } else {
    return "#22c55e"; // green
  }
}
