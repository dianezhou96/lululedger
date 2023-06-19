export type Item = {
  id: number;
  product: ProductMetadata;
  color: string | null;
  size: string | null;
  unavailable: boolean;
};

export type ProductCategoryMetadata = {
  name: string;
  description: string;
};

export type ProductCategory = ProductCategoryMetadata & {
  products: ProductMetadata[];
};

export type ProductMetadata = {
  id: number;
  name: string;
  category: ProductCategoryMetadata;
  link: string | null;
  product_images: string[] | null;
  price_actual: number | null;
  price_retail: number | null;
};

export type Product = ProductMetadata & {
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

export type CartPost = {
  name: string;
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

export type BuyerPost = {
  email: string;
  name: string;
  skater_name: string;
  skater_team: SkaterTeam;
};

export type Buyer = BuyerPost & {
  id: number;
};

export const SHOP_NAME = "SFIT x Lululemon Fundraiser";
