const dataJson = require("../../../scripts/data.json");

type ProductObj = {
  product: string;
  category: number;
  link?: string;
  images: string[];
  price_retail: number;
  items: { color: string; sizes: (number | string)[] }[];
};

export const data: ProductObj[] = dataJson.map((product) => ({
  ...product,
  price_retail: parseInt(product.price_retail),
  images: product.items.map(({ img }) => img),
  items: product.items.map(({ color, sizes }) => ({ color: color, sizes })),
}));
