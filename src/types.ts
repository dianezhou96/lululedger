export type Item = {
  id: number;
  product: ProductMetadata;
  color: string | null;
  size: string | null;
  unavailable: boolean;
};

export type ProductCategoryMetadata = {
  id: number;
  name: string;
  description: string;
};

export type ProductCategory = ProductCategoryMetadata & {
  products: Product[];
};

export type ProductMetadata = {
  id: number;
  name: string;
  link: string | null;
  images: string[] | null;
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
    id: number;
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
  "Coach",
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
  admin: boolean | null;
};

export type BuyerCarts = Buyer & {
  carts: Cart[];
};

export type FAQData = {
  id: number;
  question: string;
  answer: string;
};
