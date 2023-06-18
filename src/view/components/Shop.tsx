import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { Product } from "../../types";
import { CartProps } from "./App";
import { Loading } from "./Loading";
import { ProductCard } from "./ProductCard";

const GAP = 10;

export const Shop: React.FC<CartProps> = (props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const products = await fetch("/shop/products").then((data) => data.json());
    setProducts(products);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const cards = products.map((product) => (
    <ProductCard key={product.id} product={product} {...props} />
  ));

  return loading ? (
    <Loading />
  ) : (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: GAP,
        margin: GAP,
        textAlign: "center",
      }}
    >
      {cards}
    </div>
  );
};
