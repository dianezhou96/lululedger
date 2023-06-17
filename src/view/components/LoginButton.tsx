import { Button, Divider, Input, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Cart, CartPost } from "../../types";
import { PlusOutlined } from "@ant-design/icons";
import { CartSelector } from "./CartSelector";

interface LoginButtonProps {
  credential: string | null;
  carts: Cart[];
}

export const LoginButton: React.FC<LoginButtonProps> = ({
  credential,
  carts,
}) => {
  if (credential) {
    return <CartSelector carts={carts} />;
  }
  return (
    <Button>
      <Link to="/account">Sign up to order!</Link>
    </Button>
  );
};
