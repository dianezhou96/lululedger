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

export function getPrice(
  product: ProductMetadata,
  discount: number,
  isVolunteer = false,
  numDecimal = 0
): number {
  if (product.price_actual) {
    return Number(product.price_actual.toFixed(0));
  }
  if (product.price_retail) {
    const discountToApply = isVolunteer ? 0.5 : discount;
    return Number(
      (product.price_retail * (1 - discountToApply)).toFixed(numDecimal)
    );
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

export function defaultProductSort(
  productsSorted: string[],
  products: ProductMetadata[]
) {
  return products.sort(
    (a, b) =>
      findProductIdx(productsSorted, a) - findProductIdx(productsSorted, b)
  );
}

function findProductIdx(productsSorted: string[], product: ProductMetadata) {
  return productsSorted.findIndex((entry) => entry === product.name);
}

export function defaultItemSort(
  itemSizes: string[],
  itemColors: string[],
  items: ItemMetadata[]
) {
  // sort by size
  const itemsBySize = items.sort(
    (a, b) => findSizeIdx(itemSizes, a) - findSizeIdx(itemSizes, b)
  );
  // then sort by color
  return itemsBySize.sort(
    (a, b) => findColorIdx(itemColors, a) - findColorIdx(itemColors, b)
  );
}

function findSizeIdx(itemSizes: string[], item: ItemMetadata) {
  return itemSizes.findIndex((size) => size === item.size);
}

function findColorIdx(itemColors: string[], item: ItemMetadata) {
  return itemColors.findIndex((color) => color === item.color);
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

function getPriceLuluByCart(cart: Cart, discount: number) {
  return (
    cart.cart_items
      // Lululemon items have a retail price, while others don't.
      .filter((cartItem) => cartItem.item.product.price_retail !== null)
      .filter((cartItem) => cartItem.status !== "Out of stock")
      .reduce(
        (total, cartItem) =>
          total + cartItem.quantity * getPrice(cartItem.item.product, discount),
        0
      )
  );
}

export function getPriceLuluByBuyer(buyer: BuyerCarts, discount: number) {
  return buyer.carts
    .filter((cart) => cart.submitted)
    .reduce((total, cart) => total + getPriceLuluByCart(cart, discount), 0);
}

function getTotalPriceByCart(
  cart: Cart,
  discount: number,
  isVolunteer = false
) {
  return (
    (isVolunteer ? 1 : 1.1) *
    cart.cart_items
      .filter((cartItem) => cartItem.status !== "Out of stock")
      .reduce(
        (total, cartItem) =>
          total +
          cartItem.quantity *
            getPrice(cartItem.item.product, discount, isVolunteer),
        0
      )
  );
}

export function getTotalPriceByBuyer(buyer: BuyerCarts, discount: number) {
  return buyer.carts
    .filter((cart) => cart.submitted)
    .reduce(
      (total, cart) =>
        total + getTotalPriceByCart(cart, discount, buyer.volunteer ?? false),
      0
    );
}

export function groupAndSortCartItems(
  cart: Cart,
  productsSorted: string[],
  itemSizes: string[],
  itemColors: string[]
) {
  return cart.cart_items
    .sort(
      (a, b) => findSizeIdx(itemSizes, a.item) - findSizeIdx(itemSizes, b.item)
    )
    .sort(
      (a, b) =>
        findColorIdx(itemColors, a.item) - findColorIdx(itemColors, b.item)
    )
    .sort(
      (a, b) =>
        findProductIdx(productsSorted, a.item.product) -
        findProductIdx(productsSorted, b.item.product)
    );
}
