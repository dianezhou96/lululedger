import { Buyer, Cart, Item, Product, ProductMetadata } from "../../types";

export function resolveItem(item): Item {
  return {
    id: item.id,
    product: resolveProductMetadata(item.attributes.product.data),
    color: item.attributes.color,
    size: item.attributes.size,
    unavailable: item.attributes.unavailable,
  };
}

function resolveProductMetadata(product): ProductMetadata {
  return {
    id: product.id,
    name: product.attributes.name,
    category: product.attributes.category,
    link: product.attributes.link,
    product_images: product.attributes.images,
    price_actual: product.attributes.price_actual,
    price_retail: product.attributes.price_retail,
  };
}

export function resolveProduct(product): Product {
  return {
    ...resolveProductMetadata(product),
    items: product.attributes.items.data?.map(resolveItem) ?? [],
  };
}

export function resolveCart(cart): Cart {
  return {
    id: cart.id,
    name: cart.attributes.name,
    submitted: cart.attributes.submitted,
    cart_items:
      cart.attributes.cart_items?.data?.map((cart_item) => ({
        item: resolveItem(cart_item.attributes.item.data),
        quantity: cart_item.attributes.quantity,
      })) ?? [],
  };
}

export function resolveBuyer(buyer): Buyer {
  return {
    id: buyer.id,
    name: buyer.attributes.name,
    email: buyer.attributes.email,
    skater_name: buyer.attributes.skater_name,
    skater_team: buyer.attributes.skater_team,
  };
}
