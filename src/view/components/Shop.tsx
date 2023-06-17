import React, { useEffect, useState } from "react";
import { Cart, Product } from "../../types";
import { ProductCard } from "./ProductCard";

const GAP = 10;

interface ShopProps {
  carts: Cart[];
  setCarts: React.Dispatch<React.SetStateAction<Cart[]>>;
}

export const Shop: React.FC<ShopProps> = (props) => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const products = await fetch("/shop/products").then((data) => data.json());
    setProducts(products);
  };

  useEffect(() => {
    fetchProducts();
    console.log("PRODUCTS");
    console.log(products);
  }, []);

  const cards = products.map((product) => (
    <ProductCard key={product.id} product={product} {...props} />
  ));

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: GAP,
        margin: GAP,
      }}
    >
      {cards}
    </div>
  );
};
