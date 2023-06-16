import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import React, { useEffect, useState } from "react";
import { API_TOKEN, API_URI } from "../../config";
import { PlusCircleOutlined } from "@ant-design/icons";
import Carousel from "antd/es/carousel";
import { AddToCartForm, ProductCard } from "./ProductCard";

export const Shop: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await fetch(
        API_URI +
        "/products?populate[product_images][fields][0]=link&populate[items][populate]=*",
        {
          method: "GET",
          headers: { Authorization: API_TOKEN },
        }
      ).then((data) => data.json());
      setProducts(products.data);
    };
    fetchProducts();
  }, []);

  console.log(products);

  const cards = products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  return <>{cards}</>;
};
