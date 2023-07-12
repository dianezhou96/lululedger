import { COLORS, DISCOUNT, ITEM_SIZES } from "../constants";
import {
  BuyerCarts,
  Cart,
  CartItemWithMetadata,
  ItemMetadata,
  ItemWithQty,
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

export function getProductQuantity(
  product: ProductWithQtys,
  oos: boolean = false
) {
  return product.items.reduce(
    (total: number, item: ItemWithQty) => total + getItemQuantity(item, oos),
    0
  );
}

export function getItemQuantity(item: ItemWithQty, oos: boolean = false) {
  return item.cart_items.reduce(
    (total: number, cartItem: CartItemWithMetadata) =>
      cartItem.cart.submitted &&
      (oos
        ? cartItem.status === "Out of stock"
        : cartItem.status !== "Out of stock")
        ? total + cartItem.quantity
        : total,
    0
  );
}

function getTotalLuluByCart(cart: Cart) {
  return (
    cart.cart_items
      // Lululemon items have a retail price, while others don't.
      .filter((cartItem) => cartItem.item.product.price_retail !== null)
      .filter((cartItem) => cartItem.status !== "Out of stock")
      .reduce((total, cartItem) => total + cartItem.quantity, 0)
  );
}

export function getTotalLuluByBuyer(buyer: BuyerCarts) {
  return buyer.carts
    .filter((cart) => cart.submitted)
    .reduce((total, cart) => total + getTotalLuluByCart(cart), 0);
}

function getTotalOutByCart(cart: Cart) {
  return (
    cart.cart_items
      .filter((cartItem) => cartItem.status === "Out of stock")
      .reduce((total, cartItem) => total + cartItem.quantity, 0) -
    cart.cart_items
      .filter((cartItem) => cartItem.status === "Replacement")
      .reduce((total, cartItem) => total + cartItem.quantity, 0)
  );
}

export function getTotalOutByBuyer(buyer: BuyerCarts) {
  return buyer.carts
    .filter((cart) => cart.submitted)
    .reduce((total, cart) => total + getTotalOutByCart(cart), 0);
}

function getPriceLuluByCart(cart: Cart) {
  return (
    cart.cart_items
      // Lululemon items have a retail price, while others don't.
      .filter((cartItem) => cartItem.item.product.price_retail !== null)
      .filter((cartItem) => cartItem.status !== "Out of stock")
      .reduce(
        (total, cartItem) =>
          total + cartItem.quantity * getPrice(cartItem.item.product),
        0
      )
  );
}

export function getPriceLuluByBuyer(buyer: BuyerCarts) {
  return buyer.carts
    .filter((cart) => cart.submitted)
    .reduce((total, cart) => total + getPriceLuluByCart(cart), 0);
}

function getTotalPriceByCart(cart: Cart) {
  return (
    1.1 *
    cart.cart_items
      .filter((cartItem) => cartItem.status !== "Out of stock")
      .reduce(
        (total, cartItem) =>
          total + cartItem.quantity * getPrice(cartItem.item.product),
        0
      )
  );
}

export function getTotalPriceByBuyer(buyer: BuyerCarts) {
  return buyer.carts
    .filter((cart) => cart.submitted)
    .reduce((total, cart) => total + getTotalPriceByCart(cart), 0);
}

export function groupAndSortCartItems(cart: Cart) {
  return cart.cart_items
    .sort((a, b) => findSizeIdx(a.item) - findSizeIdx(b.item))
    .sort((a, b) => findColorIdx(a.item) - findColorIdx(b.item))
    .sort(
      (a, b) => findProductIdx(a.item.product) - findProductIdx(b.item.product)
    );
}
