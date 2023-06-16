import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, InputNumber, Popover, Table } from "antd";
import { CartItemPost, Product } from "../../types";

interface AddToCartFormProps {
  product: Product;
}

interface FormValues {
  [key: string]: number;
}

export const AddToCartForm: React.FC<AddToCartFormProps> = ({ product }) => {
  const [form] = Form.useForm();

  const addItemToCart = useCallback(async (cartItem: CartItemPost) => {
    await fetch("/api/cart-items", {
      method: "POST",
      body: JSON.stringify(cartItem),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, []);

  const onSubmit = useCallback((values: FormValues) => {
    for (const [key, value] of Object.entries(values)) {
      addItemToCart({
        cart: "1",
        item: key,
        quantity: value,
      });
    }
  }, []);

  return (
    <Form
      form={form}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "end",
      }}
      // initialValues={{
      //   remember: true,
      // }}
      onFinish={onSubmit}
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
          <Form.Item key={idx} label={colorSizeString} name={item.id}>
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
