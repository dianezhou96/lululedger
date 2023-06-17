import React, { useEffect, useState } from "react";
import { Product } from "../../types";
import { CartProps } from "./App";
import { ProductCard } from "./ProductCard";

const GAP = 10;

export const Shop: React.FC<CartProps> = (props) => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const products = await fetch("/shop/products").then((data) => data.json());
    setProducts(products);
  };

  useEffect(() => {
    fetchProducts();
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
