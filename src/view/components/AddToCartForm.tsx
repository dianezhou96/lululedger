import React, { useEffect } from "react";
import { Button, Form, InputNumber, Popover, Table } from "antd";
import { Product } from "../../types";

interface AddToCartFormProps {
  product: Product;
}
export const AddToCartForm: React.FC<AddToCartFormProps> = ({ product }) => {
  useEffect(() => {
    const addItemToCart = async () => {
      await fetch("/cart-items", {
        method: "POST",
        body: JSON.stringify({ cartId: 1, itemId: 2, quantity: 1 }),
      }).then((data) => data.json());
    };
    console.log("HERE");
    addItemToCart();
  }, []);

  return (
    <Form
      name="basic"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "end",
      }}
      // initialValues={{
      //   remember: true,
      // }}
      // onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {product.items.map((item, idx) => {
        const colorSizeString =
          item.color && item.size
            ? item.color + " | " + item.size
            : item.color
            ? item.color
            : item.size
            ? item.size
            : product.name;
        return (
          <Form.Item key={idx} label={colorSizeString} name={colorSizeString}>
            <InputNumber placeholder="qty" />
          </Form.Item>
        );
      })}

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
