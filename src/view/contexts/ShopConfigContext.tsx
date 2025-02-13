import { createContext, useContext } from "react";
import { ShopConfig } from "../../types";

export const ShopConfigContext = createContext<ShopConfig | null>(null);

export const useShopConfig = () => {
  const context = useContext(ShopConfigContext);
  if (context === undefined) {
    throw new Error("useShopConfig must be used within a ShopConfigProvider");
  }
  return context;
};
