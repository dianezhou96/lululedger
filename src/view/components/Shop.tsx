import React, { useEffect, useState } from "react";
import { Product } from "../../types";
import { ProductCard } from "./ProductCard";

export const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await fetch("/api/products").then((data) => data.json());
      setProducts(products);
    };
    fetchProducts();
  }, []);

  console.log("PRODUCTS");
  console.log(products);

  const cards = products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  return <>{cards}</>;
};
