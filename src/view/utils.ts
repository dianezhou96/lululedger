export const DISCOUNT = 0.4;

export function getPrice(productAttributes, numDecimal = 0): Number {
  if (productAttributes.price_actual) {
    return Number(productAttributes.price_actual.toFixed(numDecimal));
  }
  if (productAttributes.price_retail) {
    return Number(
      (productAttributes.price_retail * (1 - DISCOUNT)).toFixed(numDecimal)
    );
  }
  return 0;
}

export function getPriceString(price: Number, numDecimal = 0): string {
  return `$${price.toFixed(numDecimal)}`;
}
