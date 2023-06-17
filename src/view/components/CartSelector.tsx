import { Button, Divider, Input, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Cart } from "../../types";
import { PlusOutlined } from "@ant-design/icons";

type Option = {
  value: string;
  label: string;
};

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
      const carts = await fetch("/shop/carts", {
        method: "GET",
        headers: {
          Credential: searchParams.get("credential") ?? "",
        },
      }).then((data) => data.json());
      setCarts(carts);
      setLoading(false);
    };
    fetchCarts();
    console.log("CARTS", carts);
  }, []);

  const [name, setName] = useState("");
  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const addItem = (e) => {
    e.preventDefault();
    console.log("NEW CART NAME", name);
    setName("");
  };

  useEffect(() => {
    setCartSelected(searchParams.get("cart"));
  }, [searchParams]);

  const handleCartChange = (value: string) => {
    searchParams.set("cart", value);
    setSearchParams(searchParams);
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
