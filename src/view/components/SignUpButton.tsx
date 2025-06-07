import { Button } from "antd";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopConfigContext } from "../contexts/ShopConfigContext";

export const SignUpButton: React.FC<{
  buttonText?: string;
}> = ({ buttonText }) => {
  const shopConfig = useContext(ShopConfigContext);
  return (
    <Button
      style={{ width: "fit-content" }}
      disabled={!(shopConfig?.status === "open")}
    >
      {shopConfig?.status === "preview" ? (
        `Ordering starts soon`
      ) : shopConfig?.status === "closed" ? (
        "This fundraiser has ended."
      ) : (
        <Link to="/account">{buttonText ?? "Sign up or log in to order!"}</Link>
      )}
    </Button>
  );
};
