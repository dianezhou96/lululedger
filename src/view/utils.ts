import { Product } from "../types";

export const DISCOUNT = 0.4;

export function getPrice(product: Product, numDecimal = 0): number {
  if (product.price_actual) {
    return Number(product.price_actual.toFixed(numDecimal));
  }
  if (product.price_retail) {
    return Number((product.price_retail * (1 - DISCOUNT)).toFixed(numDecimal));
  }
  return 0;
}

export function getPriceString(price: Number, numDecimal = 0): string {
  return `$${price.toFixed(numDecimal)}`;
}
