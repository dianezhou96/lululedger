import React, { useEffect, useState } from "react";
import { Product, ProductCategory } from "../../types";
import { CartProps } from "./App";
import { Loading } from "./Loading";
import { COVER_WIDTH, ProductCard } from "./ProductCard";

const GAP = 20;

export const Shop: React.FC<CartProps> = (props) => {
  const [products, setProducts] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const products = await fetch("/shop/products").then((data) => data.json());
    setProducts(products);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  console.log("PRODUCTS", products);

  return loading ? (
    <Loading />
  ) : (
    <div style={{ margin: GAP }}>
      {products.map((category) => (
        <div key={category.id}>
          <div style={{ textAlign: "center", margin: "auto" }}>
            <h2>{category.name}</h2>
            <p>{category.description}</p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(auto-fill, ${COVER_WIDTH}px)`,
              gridGap: GAP,
              justifyContent: "center",
              marginTop: GAP,
            }}
          >
            {category.products.map((product) => (
              <ProductCard key={product.id} product={product} {...props} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
