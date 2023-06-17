import { Select } from "antd";
import React, { useEffect, useState } from "react";
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
      setCartSelected(carts[0].id);
      setLoading(false);
    };
    fetchCarts();
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
      onChange={setCartSelected}
      style={{ width: 150, marginLeft: "auto" }}
    />
  );
};
