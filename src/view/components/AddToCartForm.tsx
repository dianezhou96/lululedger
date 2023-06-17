import React, { useMemo } from "react";
import { Button, Form, InputNumber } from "antd";
import { Cart, CartItemPost, Product } from "../../types";
import { useSearchParams } from "react-router-dom";
import { CartSelector } from "./CartSelector";

interface FormValues {
  [key: number]: number;
}

interface AddToCartFormProps {
  product: Product;
  carts: Cart[];
  setCartDirty: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddToCartForm: React.FC<AddToCartFormProps> = ({
  product,
  carts,
  setCartDirty,
}) => {
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();

  const cartId = useMemo(() => {
    return Number(searchParams.get("cart"));
  }, [searchParams]);

  const addItemToCart = async (cartItem: CartItemPost) => {
    await fetch("/shop/cart-items", {
      method: "POST",
      body: JSON.stringify(cartItem),
      headers: {
        "Content-Type": "application/json",
        Credential: searchParams.get("credential") ?? "",
      },
    });
  };

  const onSubmit = (values: FormValues) => {
    if (!cartId) {
      return;
    }
    for (const [key, value] of Object.entries(values)) {
      addItemToCart({
        cart: cartId,
        item: Number(key),
        quantity: value,
      });
    }
    setCartDirty(true);
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {cartId ? (
          <b>Adding to cart for</b>
        ) : (
          <b style={{ color: "red" }}>Select a cart to add items to</b>
        )}
        <CartSelector carts={carts} />
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
    </>
  );
};
