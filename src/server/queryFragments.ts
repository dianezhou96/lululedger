export const ItemFragment = {
  fields: ["unavailable"],
  populate: {
    product: {
      fields: ["name", "link", "price_retail", "price_actual"],
    },
    color: {
      fields: ["color"],
    },
    size: { fields: ["size"] },
  },
};

export const ProductFragment = {
  fields: ["name", "link", "price_retail", "price_actual"],
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
