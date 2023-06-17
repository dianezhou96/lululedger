const ProductMetadataFragment = {
  fields: ["name", "link", "price_retail", "price_actual"],
};

export const ItemFragment = {
  fields: ["unavailable"],
  populate: {
    product: {
      ...ProductMetadataFragment,
    },
    color: {
      fields: ["color"],
    },
    size: { fields: ["size"] },
  },
};

export const ProductFragment = {
  ...ProductMetadataFragment,
  populate: {
    product_images: {
      fields: ["link"],
    },
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
