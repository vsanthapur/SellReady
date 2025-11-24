export function formatNumberWithCommas(value: string): string {
  // Remove all non-digit characters
  const numericValue = value.replace(/\D/g, '');
  
  // Add commas
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function parseFormattedNumber(value: string): number {
  // Remove commas and parse
  return parseInt(value.replace(/,/g, ''), 10) || 0;
}
