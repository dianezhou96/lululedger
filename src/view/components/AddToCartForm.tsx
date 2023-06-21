import React, { useEffect, useMemo, useState } from "react";
import { Button, Form, InputNumber } from "antd";
import { CartItemPost, Product } from "../../types";
import { useSearchParams } from "react-router-dom";
import { CartSelector } from "./CartSelector";
import { CartProps } from "./App";
import { COVER_HEIGHT, COVER_WIDTH } from "./ProductCard";
import { SignUpButton } from "./SignUpButton";
import { defaultItemSort } from "../utils";

export const INIT_LIMIT = 4; // Number of items to show in the form initially

interface FormValues {
  [key: number]: number;
}

interface AddToCartFormProps {
  product: Product;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  showAll: boolean;
  setShowAll: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddToCartForm: React.FC<AddToCartFormProps & CartProps> = (
  props
) => {
  const { product, setOpen, showAll, setShowAll, setCartDirty } = props;
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();

  const cartId = useMemo(() => {
    return Number(searchParams.get("cart"));
  }, [searchParams]);

  const addItemsToCart = async (cartItems: CartItemPost[]) => {
    for (const cartItem of cartItems) {
      await fetch("/shop/cart-items", {
        method: "POST",
        body: JSON.stringify(cartItem),
        headers: {
          "Content-Type": "application/json",
          Credential: searchParams.get("credential") ?? "",
        },
      });
    }
    setCartDirty(true);
  };

  const onSubmit = (values: FormValues) => {
    if (cartId) {
      const cartItems: CartItemPost[] = [];
      for (const [key, value] of Object.entries(values)) {
        if (value > 0)
          cartItems.push({ cart: cartId, item: Number(key), quantity: value });
      }
      addItemsToCart(cartItems);
    }
    form.resetFields();
    setOpen(false);
  };

  const itemsList = defaultItemSort(product.items);

  useEffect(() => {
    if (itemsList.length < INIT_LIMIT) setShowAll(true);
  }, [itemsList]);

  return itemsList.length ? (
    <div
      style={{
        width: COVER_WIDTH,
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
        {itemsList.map((item, idx) => {
          const colorSizeString =
            item.color && item.size
              ? item.color + " - Size " + item.size
              : item.color
              ? item.color
              : "Size " + item.size
              ? item.size
              : product.name;
          return (
            <Form.Item
              key={idx}
              label={colorSizeString}
              name={item.id}
              style={idx >= INIT_LIMIT && !showAll ? { display: "none" } : {}}
            >
              <InputNumber
                placeholder="qty"
                style={{
                  width: "auto",
                }}
              />
            </Form.Item>
          );
        })}
        {itemsList.length > INIT_LIMIT && (
          <div style={{ textAlign: "right", marginBottom: 16 }}>
            {showAll ? (
              <a
                onClick={() => {
                  setShowAll(false);
                }}
              >
                Show fewer options
              </a>
            ) : (
              <a
                onClick={() => {
                  setShowAll(true);
                }}
              >
                Show all options... ({itemsList.length - INIT_LIMIT} more)
              </a>
            )}
          </div>
        )}
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
