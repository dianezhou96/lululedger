import { Cart, Item, Product, ProductMetadata } from "../types";

export function resolveItem(item): Item {
  return {
    product: resolveProductMetadata(item.attributes.product.data),
    color: item.attributes.color.data?.attributes.color,
    size: item.attributes.size.data?.attributes.size,
    unavailable: item.attributes.unavailable,
  };
}

function resolveProductMetadata(product): ProductMetadata {
  return {
    id: product.id,
    name: product.attributes.name,
    link: product.attributes.link,
    price_actual: product.attributes.price_actual,
    price_retail: product.attributes.price_retail,
  };
}

export function resolveProduct(product): Product {
  return {
    ...resolveProductMetadata(product),
    product_images:
      product.attributes.product_images.data?.map(
        (img) => img.attributes.link
      ) ?? [],
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
