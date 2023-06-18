import { Button, Empty } from "antd";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { CartProps } from "./App";
import { CartTable } from "./CartTable";

const GAP = 20;

export const Orders: React.FC<CartProps> = ({
  carts,
  cartSelected,
  setCartDirty,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleViewAll = () => {
    searchParams.delete("cart");
    setSearchParams(searchParams);
    window.scrollTo(0, 0);
  };

  return (
    <div style={{ margin: GAP, textAlign: "center" }}>
      {carts.map((cart) => {
        if (!cartSelected || cartSelected === cart.id.toString()) {
          return (
            <div key={cart.id} style={{ marginBottom: GAP }}>
              <CartTable cart={cart} setCartDirty={setCartDirty}></CartTable>
            </div>
          );
        }
      })}
      {cartSelected && carts.length > 1 && (
        <Button size="large" onClick={handleViewAll}>
          <b>Show all orders</b>
        </Button>
      )}
      {carts.length === 0 && (
        <Empty
          description={
            "No orders. Create a new cart and add items from the shop!"
          }
        />
      )}
    </div>
  );
};
