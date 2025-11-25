export function formatNumberWithCommas(value: string): string {
  // Remove all non-digit characters (including $)
  const numericValue = value.replace(/\D/g, '');
  
  if (!numericValue) return '';
  
  // Add commas
  const withCommas = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  // Add $ prefix
  return `$${withCommas}`;
}

export function parseFormattedNumber(value: string): number {
  // Remove $ and commas, then parse
  return parseInt(value.replace(/[$,]/g, ''), 10) || 0;
}
