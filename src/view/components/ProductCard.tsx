import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import React from "react";
import { DISCOUNT, getPrice, getPriceString } from "../utils";
import { PlusCircleOutlined } from "@ant-design/icons";
import Carousel from "antd/es/carousel";
import { Button, Form, InputNumber, Popover, Table } from "antd";
import { AddToCartForm } from "./AddToCartForm";
import { Product } from "../../types";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const imageLinks = product.product_images;
  const priceString = getPriceDescription(product);
  return (
    <Card
      style={{
        width: 300,
      }}
      cover={
        <Carousel>
          {imageLinks.map((imageLink, idx) => (
            <div key={idx}>
              <img
                alt={product.name + " " + (idx + 1).toString()}
                src={imageLink}
                width={300}
              />
            </div>
          ))}
        </Carousel>
      }
      actions={[
        <Popover
          content={<AddToCartForm product={product} />}
          title={`Add ${product.name} ($${getPrice(product)}) to cart`}
          trigger="click"
        >
          <PlusCircleOutlined />
        </Popover>,
      ]}
    >
      <Meta
        title={
          <>
            {product.link ? (
              <a href={product.link} target="_blank">
                {product.name}
              </a>
            ) : (
              <span>{product.name}</span>
            )}
          </>
        }
        description={priceString}
      />
    </Card>
  );
};

function getPriceDescription(product: Product) {
  const priceElement = (
    <b style={{ color: "black", fontSize: "medium" }}>
      {getPriceString(getPrice(product))}
    </b>
  );
  if (product.price_retail && !product.price_actual) {
    return (
      <span>
        <del>{getPriceString(product.price_retail)}</del> {priceElement}
      </span>
    );
  }
  return priceElement;
}
