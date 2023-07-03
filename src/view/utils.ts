import { COLORS, DISCOUNT, ITEM_SIZES } from "../constants";
import {
  CartItem,
  Item,
  ItemMetadata,
  ItemWithQty,
  Product,
  ProductMetadata,
  ProductWithQtys,
} from "../types";
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

export function defaultProductSort(products: ProductMetadata[]) {
  return products.sort((a, b) => findProductIdx(a) - findProductIdx(b));
}

function findProductIdx(product: ProductMetadata) {
  return data.findIndex((entry) => entry.product === product.name);
}

export function defaultItemSort(items: ItemMetadata[]) {
  // sort by size
  const itemsBySize = items.sort((a, b) => findSizeIdx(a) - findSizeIdx(b));
  // then sort by color
  return itemsBySize.sort((a, b) => findColorIdx(a) - findColorIdx(b));
}

function findSizeIdx(item: ItemMetadata) {
  return ITEM_SIZES.findIndex((size) => size === item.size);
}

function findColorIdx(item: ItemMetadata) {
  return COLORS.findIndex((color) => color === item.color);
}

export function isValidQty(value) {
  return Number.isInteger(value) && value > 0;
}

export function getProductQuantity(product: ProductWithQtys) {
  return product.items.reduce(
    (total: number, item: ItemWithQty) => total + getItemQuantity(item),
    0
  );
}

export function getItemQuantity(item: ItemWithQty) {
  return item.cart_items.reduce(
    (total: number, cartItem: CartItem) =>
      cartItem.cartSubmitted ? total + cartItem.quantity : total,
    0
  );
}
