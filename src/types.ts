export interface ShopConfig {
  name: string;
  status: "preview" | "open" | "closed";
  start_date: string;
  deadline: string;
  colors: string[];
  sizes: string[];
  discount: number;
}

export type ItemMetadata = {
  id: number;
  color: string | null;
  size: string | null;
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

export type CartMetadata = {
  id: number;
  name: string;
  submitted: boolean;
};

export type Cart = CartMetadata & {
  cart_items: (CartItemMetadata & { item: Item })[];
};

export type CartPost = {
  name: string;
};

export type CartItemPost = {
  cart: number; //id
  item: number; //id
  quantity: number;
  status?: CartItemStatus;
};

export type CartItemStatus = "Out of stock" | "Replacement" | null;

type CartItemMetadata = {
  id: number;
  quantity: number;
  status: CartItemStatus;
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
  magic_token: string;
  carts: Cart[];
};

export type CartItemWithMetadata = CartItemMetadata & {
  cart: CartMetadata;
  buyer: Buyer;
};

export type ItemWithQty = ItemMetadata & {
  cart_items: CartItemWithMetadata[];
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

export type InventoryData = {
  json: object;
};
