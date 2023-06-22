import { DISCOUNT, ITEM_SIZES } from "../constants";
import { Item, Product, ProductMetadata } from "../types";
import { data } from "../server/utils/data";

export function getPrice(product: ProductMetadata, numDecimal = 0): number {
  if (product.price_actual) {
    return Number(product.price_actual.toFixed(numDecimal));
  }
  if (product.price_retail) {
    return Number((product.price_retail * (1 - DISCOUNT)).toFixed(numDecimal));
  }
  return 0;
}

export function getPriceString(price: number, numDecimal = 0): string {
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

export function defaultProductSort(products: Product[]) {
  return products.sort((a, b) => findProductIdx(a) - findProductIdx(b));
}

function findProductIdx(product: Product) {
  return data.findIndex((entry) => entry.product === product.name);
}

export function defaultItemSort(items: Item[]) {
  // sort by size
  const itemsBySize = items.sort((a, b) => findSizeIdx(a) - findSizeIdx(b));
  // then sort by color (alphabetical)
  return itemsBySize.sort((a, b) =>
    a.color && b.color ? a.color.localeCompare(b.color) : 0
  );
}

function findSizeIdx(item: Item) {
  return ITEM_SIZES.findIndex((size) => size === item.size);
}

export function isValidQty(value) {
  return Number.isInteger(value) && value > 0;
}
