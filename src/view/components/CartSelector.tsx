import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

type Option = {
  value: string;
  label: string;
};

interface CartSelectorProps {
  label?: string;
}

export const CartSelector: React.FC<CartSelectorProps> = ({
  label = "Select a cart",
}) => {
  const [carts, setCarts] = useState<Option[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [cartSelected, setCartSelected] = useState<string | null>(
    searchParams.get("cart")
  );

  useEffect(() => {
    const fetchCarts = async () => {
      const data = await fetch("/shop/carts?buyer=1").then((data) =>
        data.json()
      );
      const carts: Option[] = data.map((cart) => ({
        value: cart.id.toString(),
        label: cart.name,
      }));
      setCarts(carts);
      setLoading(false);
    };
    fetchCarts();
  }, []);

  useEffect(() => {
    setCartSelected(searchParams.get("cart"));
  }, [searchParams]);

  const handleCartChange = (value: string) => {
    searchParams.set("cart", value);
    setSearchParams(searchParams);
  };

  console.log("CARTS", carts);

  return (
    <Select
      loading={loading}
      options={carts}
      value={cartSelected}
      placeholder={label}
      onChange={handleCartChange}
      style={{ width: 150, marginLeft: "auto" }}
    />
  );
};
