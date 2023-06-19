const ProductCategoryMetadataFragment = {
  fields: ["name", "description"],
};

const ProductMetadataFragment = {
  fields: ["name", "link", "images", "price_retail", "price_actual"],
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
    category: ProductCategoryMetadataFragment,
    items: ItemFragment,
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
  fields: ["email", "skater_name", "skater_team", "magic_token"],
};
