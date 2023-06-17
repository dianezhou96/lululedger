import React, { useEffect, useState } from "react";
import { Product } from "../../types";
import { CartSelector } from "./CartSelector";
import { ProductCard } from "./ProductCard";

const GAP = 10;

export const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await fetch("/shop/products").then((data) =>
        data.json()
      );
      setProducts(products);
    };
    fetchProducts();
  }, []);

  console.log("PRODUCTS");
  console.log(products);

  const cards = products.map((product) => (
    <ProductCard key={product.id} product={product} />
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
