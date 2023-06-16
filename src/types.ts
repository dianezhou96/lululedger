export type Product = {
  id: string;
  name: string;
  link: string | null;
  price_actual: number | null;
  price_retail: number | null;
  product_images: string[];
  items: {
    color: string | null;
    size: string | null;
    unavailable: boolean;
  }[];
};
