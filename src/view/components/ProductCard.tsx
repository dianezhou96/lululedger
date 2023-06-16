import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import React from "react";
import { DISCOUNT, getPrice, getPriceString } from "../utils";
import { PlusCircleOutlined } from "@ant-design/icons";
import Carousel from "antd/es/carousel";
import { Button, Form, InputNumber, Popover, Table } from "antd";
import { AddToCartForm } from "./AddToCartForm";

interface ProductCardProps {
  product: any;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const imgs = product.attributes.product_images.data;
  const priceString = getPriceDescription(product.attributes);
  return (
    <Card
      style={{
        width: 300,
      }}
      cover={
        <Carousel>
          {imgs.map((img, idx) => (
            <div key={idx}>
              <img
                alt={product.attributes.name + " " + (idx + 1).toString()}
                src={img.attributes.link}
                width={300}
              />
            </div>
          ))}
        </Carousel>
      }
      actions={[
        <Popover
          content={<AddToCartForm product={product} />}
          title={`Add ${product.attributes.name} ($${getPrice(
            product.attributes
          )}) to cart`}
          trigger="click"
        >
          <PlusCircleOutlined />
        </Popover>,
      ]}
    >
      <Meta
        title={
          <>
            {product.attributes.link ? (
              <a href={product.attributes.link} target="_blank">
                {product.attributes.name}
              </a>
            ) : (
              product.attributes.name
            )}
          </>
        }
        description={priceString}
      />
    </Card>
  );
};

function getPriceDescription(productAttributes) {
  const priceString = getPriceString(getPrice(productAttributes));
  if (productAttributes.price_retail && !productAttributes.price_actual) {
    return (
      <span>
        <del>{getPriceString(productAttributes.price_retail)}</del>{" "}
        {priceString}
      </span>
    );
  }
  return priceString;
}
