import { Button } from "antd";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { START_DATE } from "../../constants";
import { ShopConfigContext } from "../contexts/ShopConfigContext";

export const SignUpButton: React.FC = () => {
  const shopConfig = useContext(ShopConfigContext);
  return (
    <Button
      style={{ width: "fit-content" }}
      disabled={!(shopConfig?.status === "open")}
    >
      {shopConfig?.status === "preview" ? (
        `Ordering begins on ${START_DATE}`
      ) : shopConfig?.status === "closed" ? (
        "This fundraiser has ended."
      ) : (
        <Link to="/account">Sign up to order!</Link>
      )}
    </Button>
  );
};
