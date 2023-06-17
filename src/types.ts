export type Item = {
  id: number;
  product: ProductMetadata;
  color: string | null;
  size: string | null;
  unavailable: boolean;
};

export type ProductMetadata = {
  id: number;
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
  id: number;
  name: string;
  submitted: boolean;
  cart_items: {
    item: Item;
    quantity: number;
  }[];
};

export type CartItemPost = {
  cart: number; //id
  item: number; //id
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
  skater_name: string;
  skater_team: SkaterTeam;
};
