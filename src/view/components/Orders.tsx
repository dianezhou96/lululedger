import { Alert, Button, Empty } from "antd";
import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { CLOSED } from "../../constants";
import { CartProps } from "./App";
import { CartTableWrapper } from "./CartTableWrapper";
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

  const numUnsubmitted = carts.filter((cart) => !cart.submitted).length;
  const numSubmitted = carts.filter((cart) => cart.submitted).length;

  return cartDirty ? (
    <Loading />
  ) : carts.length > 0 ? (
    <div style={{ textAlign: "center", marginBottom: GAP }}>
      {!cartSelected && numUnsubmitted > 0 && !CLOSED && (
        <Alert
          message={
            <span>
              <b>
                You have {numUnsubmitted} unsubmitted cart
                {numUnsubmitted > 1 && "s"}!
              </b>
            </span>
          }
          type="warning"
          showIcon
          closable
          style={{
            width: "fit-content",
            margin: "auto",
            marginTop: 16,
          }}
        />
      )}
      {!cartSelected && numSubmitted > 0 && !CLOSED && (
        <Alert
          message={
            <span>
              You have {numSubmitted} order{numSubmitted > 1 && "s"} submitted.
            </span>
          }
          type="success"
          showIcon
          closable
          style={{
            width: "fit-content",
            margin: "auto",
            marginTop: 16,
          }}
        />
      )}
      {cartSelected && carts.length > 1 && (
        <Alert
          message={
            <span>
              You are viewing 1 cart.{" "}
              <a onClick={handleViewAll}>Show all carts.</a>
            </span>
          }
          type="info"
          showIcon
          closable
          style={{
            width: "fit-content",
            margin: "auto",
            marginTop: 16,
          }}
        />
      )}
      {carts.map((cart) => {
        if (!cartSelected || cartSelected === cart.id.toString()) {
          return (
            <div key={cart.id} style={{ marginBottom: GAP }}>
              <CartTableWrapper
                cart={cart}
                setCartDirty={setCartDirty}
                editable={!CLOSED}
              ></CartTableWrapper>
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
