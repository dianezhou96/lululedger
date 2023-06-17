import { Select } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Cart } from "../../types";

export const CartSelector: React.FC = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartSelected, setCartSelected] = useState<string>();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchCarts = async () => {
      const carts = await fetch("/shop/carts?buyer=1").then((data) =>
        data.json()
      );
      setCarts(carts);
      setLoading(false);
    };
    fetchCarts();
  }, []);

  const handleCartChange = useCallback((cartId) => {
    setCartSelected(cartId);
    searchParams.set("cart", cartId);
    setSearchParams(searchParams);
  }, []);

  console.log("CARTS", carts);

  return (
    <Select
      loading={loading}
      options={carts.map((cart) => ({
        value: cart.id,
        label: cart.name,
      }))}
      value={cartSelected}
      placeholder={"Select a cart"}
      onChange={handleCartChange}
      style={{ width: 150, marginLeft: "auto" }}
    />
  );
};
