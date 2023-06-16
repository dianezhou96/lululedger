export type Item = {
  product: ProductMetadata;
  color: string | null;
  size: string | null;
  unavailable: boolean;
};

export type ProductMetadata = {
  id: string;
  name: string;
  link: string | null;
  price_actual: number | null;
  price_retail: number | null;
};

export type Product = ProductMetadata & {
  product_images: string[];
  items: Item[];
};

export type Cart = {
  id: string;
  name: string;
  submitted: boolean;
  cart_items: {
    item: Item;
    quantity: number;
  }[];
};
