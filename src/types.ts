export type Item = {
  id: string;
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

export type CartItemPost = {
  cart: string;
  item: string;
  quantity: number;
};

export const SKATER_TEAMS = [
  "Adult",
  "Junior",
  "Novice",
  "Preliminary",
  "Alum",
] as const;
export type SkaterTeam = (typeof SKATER_TEAMS)[number];

export type AccountPost = {
  email: string;
  name: string;
  team: SkaterTeam;
};
