import {
  Buyer,
  Cart,
  Item,
  Product,
  ProductCategory,
  ProductCategoryMetadata,
  ProductMetadata,
  FAQData,
  InventoryData,
  BuyerCarts,
  ProductCategoryWithQtys,
  ItemMetadata,
  CartItemWithMetadata,
  ItemWithQty,
  ProductWithQtys,
  CartMetadata,
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

function resolveCartMetadata(cart): CartMetadata {
  return {
    id: cart.id,
    name: cart.attributes.name,
    submitted: cart.attributes.submitted,
  };
}

export function resolveCart(cart): Cart {
  return {
    ...resolveCartMetadata(cart),
    cart_items:
      cart.attributes.cart_items?.data?.map((cart_item) => ({
        id: cart_item.id,
        item: resolveItem(cart_item.attributes.item.data),
        quantity: cart_item.attributes.quantity,
        status: cart_item.attributes.status,
      })) ?? [],
  };
}

function resolveItemMetadata(item): ItemMetadata {
  return {
    id: item.id,
    color: item.attributes.color,
    size: item.attributes.size,
    notes: item.attributes.notes,
  };
}

export function resolveItem(item): Item {
  return {
    ...resolveItemMetadata(item),
    product: resolveProductMetadata(item.attributes.product.data),
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
    magic_token: buyer.attributes.magic_token,
    carts: buyer.attributes.carts.data.map((cart) => resolveCart(cart)),
  };
}

export function resolveProductCategoryWithQtys(
  category
): ProductCategoryWithQtys {
  return {
    ...resolveProductCategoryMetadata(category),
    products: category.attributes.products.data.map(
      (product): ProductWithQtys => ({
        ...resolveProductMetadata(product),
        items: product.attributes.items.data.map(
          (item): ItemWithQty => ({
            ...resolveItemMetadata(item),
            cart_items: item.attributes.cart_items.data
              // Don't include deleted carts, i.e. cart item with null cart
              .filter((cartItem) => cartItem.attributes.cart.data)
              .map(
                (cartItem): CartItemWithMetadata => ({
                  id: cartItem.id,
                  quantity: cartItem.attributes.quantity,
                  status: cartItem.attributes.status,
                  cart: resolveCartMetadata(cartItem.attributes.cart.data),
                  buyer: resolveBuyer(
                    cartItem.attributes.cart.data.attributes.buyer.data
                  ),
                })
              ),
          })
        ),
      })
    ),
  };
}

export function resolveFAQ(faq): FAQData {
  return {
    id: faq.id,
    question: faq.attributes.question,
    answer: faq.attributes.answer,
  };
}

export function resolveInventory(inventory): InventoryData {
  return {
    json: inventory.attributes.json,
  };
}
