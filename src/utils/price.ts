/**
 * Formats a number or string price value into Indian Rupee (INR) currency format.
 * Returns the original string if it cannot be parsed as a number (e.g., 'Custom').
 */
export function formatPriceInINR(price: string | number): string {
  if (typeof price === 'string' && isNaN(Number(price.replace('$', '')))) {
    return price; // Returns "Custom" or any non-numeric string as is
  }

  const numericPrice = Number(String(price).replace('$', ''));

  if (numericPrice === 0) {
    return "₹0";
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0, // Assuming whole rupee amounts
    maximumFractionDigits: 0,
  }).format(numericPrice);
}