import { Button, Divider, Input, Select, Space } from "antd";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CartPost } from "../../types";
import { PlusOutlined } from "@ant-design/icons";
import { CartProps } from "./App";

export const CartSelector: React.FC<CartProps> = ({
  carts,
  cartSelected,
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
    handleCartChange(data.id.toString());
  };

  const addCart = (e) => {
    e.preventDefault();
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    postCart({ name: name });
    setCartDirty(true);
    setName("");
  };

  const NewCartForm = (
    <Space
      style={{
        padding: "0 8px 4px",
      }}
    >
      <Input
        placeholder={
          carts.length ? "New cart for..." : "Start first order for..."
        }
        value={name}
        onChange={onNameChange}
        onPressEnter={addCart}
      />
      <Button icon={<PlusOutlined />} onClick={addCart} />
    </Space>
  );

  return carts.length ? (
    <Select
      options={carts.map((cart) => ({
        value: cart.id.toString(),
        label: cart.name,
      }))}
      value={cartSelected}
      placeholder="Select a cart"
      onChange={handleCartChange}
      style={{ width: 180 }}
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
