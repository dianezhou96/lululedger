import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import React from "react";
import { DISCOUNT } from "../utils";
import { PlusCircleOutlined } from "@ant-design/icons";
import Carousel from "antd/es/carousel";
import { Button, Form, InputNumber, Popover, Table } from "antd";

interface ProductCardProps {
  product: any;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const imgs = product.attributes.product_images.data;
  const priceString = getPriceString(product.attributes);
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
          title="Add to cart"
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

export const AddToCartForm: React.FC<ProductCardProps> = ({ product }) => {
  const items = product.attributes.items.data;
  return (
    <Form
      name="basic"
      //   labelCol={{
      //     span: 8,
      //   }}
      //   wrapperCol={{
      //     span: 4,
      //   }}
      //   style={{
      //     maxWidth: 600,
      //   }}
      // initialValues={{
      //   remember: true,
      // }}
      // onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {items.map((item, idx) => {
        const colorSizeString =
          item.attributes.color.data.attributes.color +
          " | " +
          item.attributes.size.data.attributes.size;
        return (
          <Form.Item key={idx} label={colorSizeString} name={colorSizeString}>
            <InputNumber placeholder="qty" />
          </Form.Item>
        );
      })}

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

function getPriceString(productAttributes) {
  if (productAttributes.price_actual) {
    return "$" + productAttributes.price_actual.toFixed(2);
  }
  if (productAttributes.price_retail) {
    return (
      <>
        <del>{"$" + productAttributes.price_retail.toFixed(0)}</del>
        <span>
          {" $" + (productAttributes.price_retail * (1 - DISCOUNT)).toFixed(0)}
        </span>
      </>
    );
  }
  return "Price unavailable";
}
