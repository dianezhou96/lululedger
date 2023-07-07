export type ItemMetadata = {
  id: number;
  color: string | null;
  size: string | null;
  unavailable: boolean;
  notes: string | null;
};

export type Item = ItemMetadata & {
  product: ProductMetadata;
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
  price_actual: number | null;
  price_retail: number | null;
};

export type Product = ProductMetadata & {
  link: string | null;
  images: string[] | null;
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

export type CartItem = {
  id: number;
  quantity: number;
  cartSubmitted: boolean;
  cartName: string;
  buyer: Buyer;
};

export type ItemWithQty = ItemMetadata & {
  cart_items: CartItem[];
};

export type ProductWithQtys = {
  id: number;
  name: string;
  price_retail: number | null;
  price_actual: number | null;
  items: ItemWithQty[];
};

export type ProductCategoryWithQtys = {
  id: number;
  name: string;
  products: ProductWithQtys[];
};

export type FAQData = {
  id: number;
  question: string;
  answer: string;
};
