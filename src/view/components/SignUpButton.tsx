import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export const SignUpButton: React.FC = () => {
  return (
    <Button style={{ width: "fit-content" }}>
      <Link to="/account">Sign up to order!</Link>
    </Button>
  );
};
