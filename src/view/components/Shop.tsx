import { Space } from "antd";
import React, { useEffect, useState } from "react";
import { DEADLINE } from "../../constants";
import { ProductCategory } from "../../types";
import { defaultProductSort } from "../utils";
import { CartProps } from "./App";
import { FundraiserCard } from "./FundraiserCard";
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

  return loading ? (
    <Loading />
  ) : (
    <div style={{ margin: GAP }}>
      <h3 style={{ textAlign: "center", color: "red" }}>
        Deadline to order: {DEADLINE}
      </h3>
      {products.map((category) => (
        <div key={category.id} style={{ padding: GAP }}>
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
            {defaultProductSort(category.products).map((product) => (
              <ProductCard key={product.id} product={product} {...props} />
            ))}
            {category.id === 1 && <FundraiserCard />}
          </div>
        </div>
      ))}
    </div>
  );
};
