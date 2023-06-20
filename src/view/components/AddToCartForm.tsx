import React, { useMemo } from "react";
import { Button, Form, InputNumber } from "antd";
import { CartItemPost, Product } from "../../types";
import { useSearchParams } from "react-router-dom";
import { CartSelector } from "./CartSelector";
import { CartProps } from "./App";
import { COVER_HEIGHT, COVER_WIDTH } from "./ProductCard";
import { SignUpButton } from "./SignUpButton";
import { defaultItemSort } from "../utils";

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
    <div
      style={{
        width: "max-content",
        maxWidth: COVER_WIDTH * 1.2,
        maxHeight: COVER_HEIGHT * 1.2,
        overflow: "scroll",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 5,
          marginBottom: 5,
        }}
      >
        {searchParams.get("credential") ? (
          <>
            {cartId ? (
              <b>Adding to cart for</b>
            ) : (
              <b style={{ color: "red" }}>Select a cart to add items to</b>
            )}
            <CartSelector {...props} />
          </>
        ) : (
          <SignUpButton />
        )}
      </div>
      <Form
        form={form}
        colon={false}
        labelCol={{
          span: 19,
        }}
        labelWrap
        onFinish={onSubmit}
        autoComplete="off"
        disabled={!cartId}
        style={{ margin: 10 }}
      >
        {defaultItemSort(product.items).map((item, idx) => {
          const colorSizeString =
            item.color && item.size
              ? item.color + " - Size " + item.size
              : item.color
              ? item.color
              : "Size " + item.size
              ? item.size
              : product.name;
          return (
            <Form.Item key={idx} label={colorSizeString} name={item.id}>
              <InputNumber
                placeholder="qty"
                style={{
                  width: "auto",
                }}
              />
            </Form.Item>
          );
        })}
        <Form.Item style={{ width: "fit-content", marginLeft: "auto" }}>
          <Button type="primary" htmlType="submit">
            Add to cart
          </Button>
        </Form.Item>
      </Form>
    </div>
  ) : (
    <>Sorry, this product is unavailable!</>
  );
};
