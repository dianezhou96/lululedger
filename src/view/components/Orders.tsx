import { Button, Empty } from "antd";
import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { CartProps } from "./App";
import { CartTable } from "./CartTable";
import { Loading } from "./Loading";
import { SignUpButton } from "./SignUpButton";

const GAP = 20;

export const Orders: React.FC<CartProps> = ({
  carts,
  cartSelected,
  cartDirty,
  setCartDirty,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const handleViewAll = () => {
    searchParams.delete("cart");
    setSearchParams(searchParams);
    window.scrollTo(0, 0);
  };

  return cartDirty ? (
    <Loading />
  ) : carts.length > 0 ? (
    <div style={{ textAlign: "center" }}>
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
    </div>
  ) : (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Empty description={"No orders. Start shopping!"} />
          <br />
          {searchParams.get("credential") ? (
            <Button
              onClick={() =>
                navigate({
                  pathname: "/shop",
                  search: location.search,
                })
              }
            >
              <b>Go to shop</b>
            </Button>
          ) : (
            <SignUpButton />
          )}
        </div>
      </div>
    </div>
  );
};
