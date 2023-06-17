import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Cart } from "../../types";
import { CartTable } from "./CartTable";

interface OrdersProps {
  carts: Cart[];
}

export const Orders: React.FC<OrdersProps> = ({ carts }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cartSelected, setCartSelected] = useState<string | null>(
    searchParams.get("cart")
  );

  useEffect(() => {
    setCartSelected(searchParams.get("cart"));
  }, [searchParams]);

  const handleViewAll = () => {
    searchParams.delete("cart");
    setSearchParams(searchParams);
    window.scrollTo(0, 0);
  };

  return (
    <div style={{ margin: 20, textAlign: "center" }}>
      {carts.map((cart) => {
        if (!cartSelected || cartSelected === cart.id.toString()) {
          return (
            <div key={cart.id} style={{ paddingBottom: 5 }}>
              <h2>Cart for {cart.name}</h2>
              <CartTable cart={cart}></CartTable>
            </div>
          );
        }
      })}
      {cartSelected && carts.length > 1 && (
        <Button size="large" onClick={handleViewAll} style={{ marginTop: 20 }}>
          <b>Show all carts</b>
        </Button>
      )}
    </div>
  );
};
