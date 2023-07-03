import {
  Buyer,
  Cart,
  Item,
  Product,
  ProductCategory,
  ProductCategoryMetadata,
  ProductMetadata,
  FAQData,
  BuyerCarts,
  ProductCategoryWithQtys,
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
    price_actual: product.attributes.price_actual,
    price_retail: product.attributes.price_retail,
  };
}

function resolveProduct(product): Product {
  return {
    ...resolveProductMetadata(product),
    link: product.attributes.link,
    images: product.attributes.images,
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
    admin: buyer.attributes.admin,
  };
}

export function resolveBuyerCarts(buyer): BuyerCarts {
  return {
    ...resolveBuyer(buyer),
    carts: buyer.attributes.carts.data.map((cart) => resolveCart(cart)),
  };
}

export function resolveProductCategoryWithQtys(
  category
): ProductCategoryWithQtys {
  return {
    id: category.id,
    name: category.attributes.name,
    products: category.attributes.products.data.map((product) => ({
      id: product.id,
      name: product.attributes.name,
      price_retail: product.attributes.price_retail,
      price_actual: product.attributes.price_actual,
      items: product.attributes.items.data.map((item) => ({
        id: item.id,
        color: item.attributes.color,
        size: item.attributes.size,
        unavailable: item.attributes.unavailable,
        cart_items: item.attributes.cart_items.data
          .filter((cartItem) => cartItem.attributes.cart.data)
          .map((cartItem) => ({
            id: cartItem.id,
            quantity: cartItem.attributes.quantity,
            cartSubmitted: cartItem.attributes.cart.data.attributes.submitted,
            cartName: cartItem.attributes.cart.data.attributes.name,
            buyer:
              cartItem.attributes.cart.data.attributes.buyer.data.attributes
                .name,
          })),
      })),
    })),
  };
}

export function resolveFAQ(faq): FAQData {
  return {
    id: faq.attributes.id,
    question: faq.attributes.question,
    answer: faq.attributes.answer,
  };
}
