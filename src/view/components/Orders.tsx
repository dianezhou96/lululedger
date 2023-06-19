import { Button, Empty } from "antd";
import React from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { CartProps } from "./App";
import { CartTable } from "./CartTable";
import { Loading } from "./Loading";

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
  ) : (
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
        <>
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
            <Button>
              <Link to="/account">Sign up to order!</Link>
            </Button>
          )}
        </>
      )}
    </div>
  );
};
