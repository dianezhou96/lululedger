import React, { useMemo } from "react";
import { Button, Form, InputNumber } from "antd";
import { CartItemPost, Product } from "../../types";
import { useSearchParams } from "react-router-dom";
import { CartSelector } from "./CartSelector";
import { CartProps } from "./App";

interface FormValues {
  [key: number]: number;
}

interface AddToCartFormProps {
  product: Product;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddToCartForm: React.FC<AddToCartFormProps & CartProps> = (
  props
) => {
  const { product, setOpen, setCartDirty } = props;
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();

  const cartId = useMemo(() => {
    return Number(searchParams.get("cart"));
  }, [searchParams]);

  const addItemToCart = async (cartItem: CartItemPost) => {
    fetch("/shop/cart-items", {
      method: "POST",
      body: JSON.stringify(cartItem),
      headers: {
        "Content-Type": "application/json",
        Credential: searchParams.get("credential") ?? "",
      },
    });
  };

  const onSubmit = (values: FormValues) => {
    if (cartId) {
      for (const [key, value] of Object.entries(values)) {
        if (value > 0)
          addItemToCart({
            cart: cartId,
            item: Number(key),
            quantity: value,
          });
      }
      setCartDirty(true);
    }
    form.resetFields();
    setOpen(false);
  };

  return product.items.length ? (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {cartId ? (
          <b>Adding to cart for</b>
        ) : (
          <b style={{ color: "red" }}>Select a cart to add items to</b>
        )}
        <CartSelector {...props} />
      </div>
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
        disabled={!cartId}
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
              <InputNumber placeholder="qty" style={{ width: 60 }} />
            </Form.Item>
          );
        })}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add to cart
          </Button>
        </Form.Item>
      </Form>
    </>
  ) : (
    <>Sorry, this product is unavailable!</>
  );
};
