import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { CLOSED } from "../../constants";

export const SignUpButton: React.FC = () => {
  return (
    <Button style={{ width: "fit-content" }} disabled={CLOSED}>
      {CLOSED ? (
        "This fundraiser has ended."
      ) : (
        <Link to="/account">Sign up to order!</Link>
      )}
    </Button>
  );
};
