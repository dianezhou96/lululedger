import {
  Buyer,
  Cart,
  Item,
  Product,
  ProductCategory,
  ProductCategoryMetadata,
  ProductMetadata,
  FAQData,
} from "../../types";

function resolveProductCategoryMetadata(category): ProductCategoryMetadata {
  return {
    id: category.id,
    name: category.attributes.name,
    description: category.attributes.description,
  };
}

export function resolveProductCategory(category): ProductCategory {
  return {
    ...resolveProductCategoryMetadata(category),
    products: category.attributes.products.data?.map(resolveProduct) ?? [],
  };
}

function resolveProductMetadata(product): ProductMetadata {
  return {
    id: product.id,
    name: product.attributes.name,
    link: product.attributes.link,
    images: product.attributes.images,
    price_actual: product.attributes.price_actual,
    price_retail: product.attributes.price_retail,
  };
}

function resolveProduct(product): Product {
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
        id: cart_item.id,
        item: resolveItem(cart_item.attributes.item.data),
        quantity: cart_item.attributes.quantity,
      })) ?? [],
  };
}

export function resolveItem(item): Item {
  return {
    id: item.id,
    product: resolveProductMetadata(item.attributes.product.data),
    color: item.attributes.color,
    size: item.attributes.size,
    unavailable: item.attributes.unavailable,
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

export function resolveFAQ(faq): FAQData {
  return {
    id: faq.attributes.id,
    question: faq.attributes.question,
    answer: faq.attributes.answer,
  };
}
