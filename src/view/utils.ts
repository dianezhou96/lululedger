import { Cart, ProductMetadata } from "../types";

export const DISCOUNT = 0.4;

export function getPrice(product: ProductMetadata, numDecimal = 0): number {
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

export async function fetchCarts(credential: string) {
  return fetch("/shop/carts", {
    method: "GET",
    headers: {
      Credential: credential,
    },
  });
}
