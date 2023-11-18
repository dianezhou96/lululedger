const ProductMetadataFragment = {
  fields: ["name", "link", "images", "price_retail", "price_actual"],
};

const ProductCategoryMetadataFragment = {
  fields: ["name", "description"],
};

export const ItemFragment = {
  fields: ["color", "size", "notes"],
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
      fields: ["quantity", "status"],
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

export const ItemWithQtyFragment = {
  ...ItemFragment,
  populate: {
    cart_items: {
      fields: ["quantity", "status"],
      populate: {
        cart: {
          fields: ["submitted", "name"],
          populate: {
            buyer: { fields: ["name", "skater_name", "skater_team", "email"] },
          },
        },
      },
    },
  },
};

export const ProductCategoryWithQtyFragment = {
  fields: ["name"],
  populate: {
    products: {
      fields: ["name", "price_retail", "price_actual"],
      populate: {
        items: ItemWithQtyFragment,
      },
    },
  },
};

export const FAQFragment = {
  fields: ["question", "answer"],
};

export const InventoryFragment = {
  fields: ["json"],
  sort: ["createdAt:desc"], // get the latest single record
  pagination: {
    start: 0,
    limit: 1,
  },
};
