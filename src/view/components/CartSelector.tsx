import { Button, Divider, Input, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Cart, CartPost } from "../../types";
import { PlusOutlined } from "@ant-design/icons";

interface CartSelectorProps {
  carts: Cart[];
  setCarts: React.Dispatch<React.SetStateAction<Cart[]>>;
}

export const CartSelector: React.FC<CartSelectorProps> = ({
  carts,
  setCarts,
}) => {
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [cartSelected, setCartSelected] = useState<string | null>(
    searchParams.get("cart")
  );

  useEffect(() => {
    const fetchCarts = async () => {
      const response = await fetch("/shop/carts", {
        method: "GET",
        headers: {
          Credential: searchParams.get("credential") ?? "",
        },
      });
      const carts: Cart[] = response.ok ? await response.json() : [];
      setCarts(carts);
      setLoading(false);
    };
    fetchCarts();
  }, [searchParams]);

  useEffect(() => {
    setCartSelected(searchParams.get("cart"));
  }, [searchParams]);

  const handleCartChange = (value: string) => {
    searchParams.set("cart", value);
    setSearchParams(searchParams);
  };

  // Set up for adding new cart
  const [name, setName] = useState("");
  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addCart = async (cart: CartPost) => {
    const response = await fetch("/shop/carts", {
      method: "POST",
      body: JSON.stringify(cart),
      headers: {
        "Content-Type": "application/json",
        Credential: searchParams.get("credential") ?? "",
      },
    });
    console.log(response);
  };

  const addItem = (e) => {
    e.preventDefault();
    console.log("NEW CART NAME", name);
    addCart({ name: name });
    setName("");
  };

  return (
    <Select
      loading={loading}
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
          <Space
            style={{
              padding: "0 8px 4px",
            }}
          >
            <Input
              placeholder="New cart for..."
              value={name}
              onChange={onNameChange}
            />
            <Button icon={<PlusOutlined />} onClick={addItem} />
          </Space>
        </>
      )}
    />
  );
};
