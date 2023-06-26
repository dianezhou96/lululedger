const ProductMetadataFragment = {
  fields: ["name", "link", "images", "price_retail", "price_actual"],
};

const ProductCategoryMetadataFragment = {
  fields: ["name", "description"],
};

export const ItemFragment = {
  fields: ["color", "size", "unavailable"],
  populate: {
    product: {
      ...ProductMetadataFragment,
    },
  },
};

export const ProductFragment = {
  ...ProductMetadataFragment,
  populate: {
    product_category: ProductCategoryMetadataFragment,
    items: ItemFragment,
  },
};

export const ProductCategoryFragment = {
  fields: ["name", "description"],
  populate: {
    products: ProductFragment,
  },
};

export const CartFragment = {
  fields: ["name", "submitted"],
  populate: {
    cart_items: {
      fields: ["quantity"],
      populate: {
        item: ItemFragment,
      },
    },
  },
};

export const BuyerFragment = {
  fields: [
    "name",
    "email",
    "skater_name",
    "skater_team",
    "magic_token",
    "admin",
  ],
};

export const BuyerCartsFragment = {
  ...BuyerFragment,
  populate: {
    carts: CartFragment,
  },
};

export const FAQFragment = {
  fields: ["question", "answer"],
};
