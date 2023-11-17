import React, { useCallback, useEffect, useMemo } from "react";
import { Button, Form, InputNumber, message, Popover } from "antd";
import { CartItemPost, Product } from "../../types";
import { useSearchParams } from "react-router-dom";
import { CartSelector } from "./CartSelector";
import { CartProps } from "./App";
import { COVER_HEIGHT, COVER_WIDTH } from "./ProductCard";
import { SignUpButton } from "./SignUpButton";
import { defaultItemSort, isValidQty } from "../utils";
import { InfoCircleFilled } from "@ant-design/icons";
import { CLOSED, DEADLINE, PREVIEW, START_DATE } from "../../constants";

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
  const { product, setOpen, showAll, setShowAll, carts, setCartDirty } = props;
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const cart = useMemo(() => {
    return carts.find(
      (cart) => cart?.id.toString() === searchParams.get("cart")
    );
  }, [carts, searchParams]);
  const [messageApi, contextHolder] = message.useMessage();
  const success = useCallback(() => {
    messageApi.open({
      type: "success",
      content: "Added to cart!",
    });
  }, []);
  const invalidQty = useCallback((value) => {
    messageApi.open({
      type: "error",
      content: `${value} is not a valid quantity.`,
    });
  }, []);

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
    success();
    setCartDirty(true);
  };

  const onSubmit = (values: FormValues) => {
    if (cart) {
      let allValid = true;
      const cartItems: CartItemPost[] = [];
      for (const [key, value] of Object.entries(values)) {
        if (isValidQty(value))
          cartItems.push({ cart: cart.id, item: Number(key), quantity: value });
        // For adding replacement items after shop is closed
        // cartItems.push({
        //   cart: cart.id,
        //   item: Number(key),
        //   quantity: value,
        //   status: "Replacement",
        // });
        else if (value && !isValidQty) {
          invalidQty(value);
          allValid = false;
        }
      }
      if (!allValid || cartItems.length === 0) return;
      addItemsToCart(cartItems);
      form.resetFields();
    }
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
      className="add-to-cart-form"
    >
      {contextHolder}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 5,
          marginBottom: 5,
        }}
      >
        {searchParams.get("credential") && !CLOSED ? (
          <>
            {cart ? (
              <b>Adding to cart for</b>
            ) : (
              <b style={{ color: "red" }}>Select a cart to add items to</b>
            )}
            <span style={{ display: "flex", alignItems: "center" }}>
              <CartSelector {...props} />
            </span>
          </>
        ) : PREVIEW ? (
          <i style={{ color: "red" }}>
            Ordering begins on {START_DATE}. Please check back then!
          </i>
        ) : (
          <SignUpButton />
        )}
      </div>
      <Form
        form={form}
        colon={false}
        labelCol={{
          flex: "1",
        }}
        labelWrap
        wrapperCol={{
          span: 6,
          flex: "none",
        }}
        onFinish={onSubmit}
        autoComplete="off"
        disabled={!cart}
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
                  maxWidth: 60,
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
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {cart && cart.submitted && (
              <Popover
                title="Adding to submitted cart"
                content={`Items added to the order for ${cart.name} will be submitted automatically, but you can still make modifications in the "Orders" page until the deadline (${DEADLINE}).`}
                placement="bottom"
                trigger="hover"
                overlayStyle={{
                  width: 200,
                }}
              >
                <InfoCircleFilled
                  style={{ marginRight: 8, fontSize: 18, color: "#007bff" }}
                />
              </Popover>
            )}
            <Button type="primary" htmlType="submit" disabled={CLOSED}>
              Add to cart
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  ) : (
    <>Sorry, this product is unavailable!</>
  );
};
