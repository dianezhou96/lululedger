import { Button, Divider, Input, Select, Space } from "antd";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CartPost } from "../../types";
import { PlusOutlined } from "@ant-design/icons";
import { CartProps } from "./App";
import { CLOSED } from "../../constants";

const WIDTH = 200;

export const CartSelector: React.FC<CartProps> = ({
  carts,
  cartSelected,
  cartDirty,
  setCartDirty,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCartChange = (value: string) => {
    searchParams.set("cart", value);
    setSearchParams(searchParams);
  };

  // Set up for adding new cart
  const [name, setName] = useState("");
  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const postCart = async (cart: CartPost) => {
    const response = await fetch("/shop/carts", {
      method: "POST",
      body: JSON.stringify(cart),
      headers: {
        "Content-Type": "application/json",
        Credential: searchParams.get("credential") ?? "",
      },
    });
    const data = await response.json();
    setCartDirty(true);
    handleCartChange(data.id.toString());
  };

  const addCart = async (e) => {
    if (name.length > 0) {
      e.preventDefault();
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      postCart({ name: name });
      setName("");
    }
  };

  const NewCartForm = CLOSED ? (
    <></>
  ) : (
    <>
      {carts.length > 0 && (
        <div
          style={{
            fontSize: "0.8em",
            margin: "auto",
            padding: "0px 8px 8px 8px ",
          }}
        >
          Use separate carts to order for multiple people
        </div>
      )}
      <Space
        style={{
          padding: "0 8px 4px",
          ...(!carts.length && { width: WIDTH }),
        }}
      >
        <Input
          placeholder={carts.length ? "New cart for..." : "Name new cart!"}
          value={name}
          onChange={onNameChange}
          onPressEnter={addCart}
        />
        <Button icon={<PlusOutlined />} onClick={addCart} />
      </Space>
    </>
  );

  return cartDirty || carts.length ? (
    <Select
      options={carts.map((cart) => ({
        value: cart.id.toString(),
        label: cart.name,
      }))}
      loading={cartDirty}
      disabled={cartDirty}
      value={cartDirty ? null : cartSelected}
      placeholder="Select a cart"
      onChange={handleCartChange}
      style={{ width: WIDTH }}
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider
            style={{
              margin: "8px 0",
            }}
          />
          {NewCartForm}
        </>
      )}
    />
  ) : (
    NewCartForm
  );
};
